# HexSplash CI/CD Deployment Guide

## Overview

This document describes the optimized pre-bundling CI/CD strategy for the HexSplash Expo React Native application with Detox E2E testing.

## Architecture

### Pre-bundling Strategy

The CI pipeline uses a **pre-bundling approach** rather than Xcode's built-in bundling. This provides:

- **Fast builds**: Target <5 minutes (vs 10+ minutes with Xcode bundling)
- **Clean logs**: Minimal Metro/Xcode output, only errors/warnings shown
- **Reliability**: Consistent bundle generation independent of Xcode environment
- **Cache efficiency**: Native build cache stable, independent of JS changes

### Pipeline Flow

```
1. Checkout & Setup (Node, Ruby, CocoaPods)
   |
2. Generate iOS native code (expo prebuild) + Cache
   |
3. Install CocoaPods dependencies + Cache
   |
4. PRE-BUNDLE JavaScript with react-native bundle
   |   - Creates dist/main.jsbundle
   |   - Creates dist/assets/
   |
5. Configure Xcode to SKIP_BUNDLING=1
   |
6. Build iOS app with xcodebuild (native only) + Cache
   |   - Uses -quiet flag for minimal logging
   |   - Filters output to show only errors/warnings
   |
7. Copy pre-bundled JS into .app directory
   |   - dist/main.jsbundle -> HexSplash.app/main.jsbundle
   |
8. Verify bundle exists and is valid
   |
9. Setup iOS Simulator
   |
10. Run Detox tests (--loglevel info)
```

## Key Implementation Details

### JavaScript Bundling Command

```bash
npx react-native bundle \
  --platform ios \
  --dev true \
  --entry-file node_modules/expo-router/entry \
  --bundle-output dist/main.jsbundle \
  --assets-dest dist/assets \
  --reset-cache
```

**Why this command?**
- `react-native bundle`: Works reliably with Expo apps (expo-router uses React Native CLI under the hood)
- `--dev true`: Debug build for Detox testing (matches Debug configuration)
- `--entry-file node_modules/expo-router/entry`: Expo Router's entry point
- `--reset-cache`: Ensures fresh bundle, no stale cache issues

### Xcode Bundling Skip

```bash
# .xcode.env.local
export SKIP_BUNDLING=1
export CI=true
```

This environment variable is read by the React Native/Expo bundling script phase in Xcode. When set, the script exits early without running Metro.

### Xcode Build Optimizations

```bash
xcodebuild \
  -quiet \  # Minimal logging
  SKIP_BUNDLING=1 \  # Skip bundling script
  COMPILER_INDEX_STORE_ENABLE=NO \  # Faster builds
  build-for-testing  # Build without running
```

Output is filtered to show only errors, warnings, and final status.

### Cache Strategy

**Prebuild Cache**: `ios/` and `android/` directories
- Key: `package-lock.json`, `app.json`
- Invalidates when: Dependencies or Expo config changes
- Savings: ~2-3 minutes

**CocoaPods Cache**: `ios/Pods/`
- Key: `ios/Podfile.lock`
- Invalidates when: Native dependencies change
- Savings: ~1-2 minutes

**iOS Build Cache**: `ios/build/`, `DerivedData/`
- Key: Native code files (`*.swift`, `*.h`, `*.m`), `Podfile.lock`
- **Does NOT include JS source** (bundled separately)
- Invalidates when: Native code changes
- Savings: ~3-5 minutes

### Bundle Verification

Three-stage verification ensures bundle integrity:

1. **Post-bundle**: Verify `dist/main.jsbundle` exists
2. **Post-copy**: Verify bundle copied to `.app/main.jsbundle`
3. **Size check**: Ensure bundle >1KB (catches empty/corrupt bundles)

## Local Development

### Testing the Bundle Pipeline Locally

```bash
# 1. Generate iOS native code
npx expo prebuild --clean

# 2. Install pods
cd ios && pod install && cd ..

# 3. Bundle JavaScript
npm run bundle:ios

# 4. Build iOS app (with pre-bundle)
export SKIP_BUNDLING=1
npx detox build --configuration ios.sim.debug

# 5. Manually copy bundle (CI does this automatically)
cp dist/main.jsbundle ios/build/Build/Products/Debug-iphonesimulator/HexSplash.app/

# 6. Run Detox tests
npm run detox:test
```

### Quick Detox Testing

```bash
# Uses Detox's built-in build (slower, includes bundling)
npx detox build --configuration ios.sim.debug
npx detox test --configuration ios.sim.debug
```

## Troubleshooting

### "No bundle URL present" Error

**Cause**: JavaScript bundle missing from .app directory

**Solutions**:
1. Check CI logs for "Pre-bundle JavaScript" step - did it succeed?
2. Check "Copy pre-bundled JS" step - verify no errors
3. Check "Verify final app bundle" - bundle size should be >100KB
4. Ensure `SKIP_BUNDLING=1` is set (prevents Xcode from trying to bundle)

### Bundling Fails with "Module not found"

**Cause**: Metro cache corruption or missing dependency

**Solutions**:
1. Check that `--reset-cache` flag is present in bundle command
2. Verify `npm ci` completed successfully
3. Check that `node_modules/expo-router/entry` exists

### Build Takes >10 Minutes

**Cause**: Cache miss or cache disabled

**Solutions**:
1. Check GitHub Actions cache hit/miss in logs
2. Verify cache keys haven't changed unexpectedly
3. For native code changes, cache miss is expected
4. For JS-only changes, all caches should hit

### Xcode Build Fails Silently

**Cause**: `-quiet` flag hides errors

**Solutions**:
1. Check "Build iOS app for testing" step - "Build failed" message?
2. Temporarily remove `-quiet` flag to see full Xcode output
3. Check for common issues: missing pods, code signing, provisioning

## Performance Targets

| Phase | Target Time | Notes |
|-------|-------------|-------|
| Checkout & Setup | <1 min | Node, Ruby setup |
| Prebuild (cache hit) | <10 sec | Just verification |
| Prebuild (cache miss) | ~2 min | Full expo prebuild |
| CocoaPods (cache hit) | <10 sec | Just verification |
| CocoaPods (cache miss) | ~1.5 min | Full pod install |
| JS Bundling | ~30 sec | react-native bundle |
| Xcode Build (cache hit) | ~1 min | Incremental build |
| Xcode Build (cache miss) | ~3 min | Full native compile |
| Simulator Setup | ~15 sec | Boot simulator |
| Detox Tests | ~1-2 min | Depends on test suite |
| **Total (optimal)** | **~4-5 min** | All caches hit |
| **Total (worst case)** | **~8-10 min** | All caches miss |

## Rollback Procedures

### Revert to Xcode Auto-Bundling

If pre-bundling causes issues, revert to Xcode bundling:

1. **Remove pre-bundling step**:
   ```yaml
   # Delete "Pre-bundle JavaScript with Expo" step
   ```

2. **Enable Xcode bundling**:
   ```yaml
   - name: Configure Xcode environment
     run: |
       cat > ios/.xcode.env.local << 'EOF'
       export NODE_BINARY=$(command -v node)
       export CI=true
       EOF
   ```

3. **Remove bundle copy step**:
   ```yaml
   # Delete "Copy pre-bundled JS to .app directory" step
   ```

4. **Update xcodebuild command**:
   ```yaml
   # Remove SKIP_BUNDLING=1 and -quiet flags
   xcodebuild ... build-for-testing
   ```

### Emergency Fixes

**Disable Detox tests entirely**:
```yaml
# Comment out "Run Detox iOS tests" step
# - name: Run Detox iOS tests
#   run: npx detox test ...
```

**Skip pre-bundling verification**:
```yaml
# In "Copy pre-bundled JS" step, make verification non-fatal:
if [ ! -f "$BUNDLE_SOURCE" ]; then
  echo "WARNING: Bundle not found, but continuing..."
fi
```

## Monitoring

### Key Metrics to Track

1. **Build Duration**: Should be <5 min for JS changes, <10 min for native
2. **Cache Hit Rate**: Should be >80% for typical development
3. **Test Pass Rate**: Track flakiness over time
4. **Bundle Size**: Monitor for unexpected increases (indicates dependency bloat)

### GitHub Actions Logs

Key log sections to review:
- "Pre-bundle JavaScript" - Bundle generation success
- "Build iOS app for testing" - Native compilation
- "Copy pre-bundled JS" - Bundle integration
- "Verify final app bundle" - Final validation
- "Run Detox iOS tests" - Test execution

## Security Considerations

- **No secrets in bundle**: JavaScript bundle is readable, never include API keys
- **Use environment variables**: Configure via GitHub Secrets for sensitive config
- **Code signing disabled**: `CODE_SIGNING_ALLOWED=NO` for simulator builds
- **Dependency security**: Regularly update dependencies, run `npm audit`

## Future Improvements

1. **Android Support**: Extend pre-bundling strategy to Android
2. **Release Builds**: Add production build configuration (minification, etc.)
3. **Bundle Analysis**: Add bundle size reporting and tracking
4. **Parallel Jobs**: Run unit tests in parallel with E2E tests
5. **Smart Caching**: Implement content-addressable caching for finer granularity

## References

- [Expo CLI Documentation](https://docs.expo.dev/workflow/expo-cli/)
- [React Native Bundling](https://reactnative.dev/docs/publishing-to-app-store)
- [Detox Documentation](https://wix.github.io/Detox/)
- [GitHub Actions Caching](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
