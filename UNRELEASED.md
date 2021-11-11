# Unreleased changes

### Breaking changes

### New components

### Enhancements

- Add `SSRProvider` in the `AppProvider` stack to enable stable ID generation in server-
  and client-side renders

### Bug fixes

- Fixed `UnstyledLink` throwing an exception when `window` is not available in server-side
  rendering contexts. Polarwind now provides a mechanism to resolve its own host via the
  `ownHost` prop on `AppProvider`. This is used when deciding if an absolute URL should
  open as a popup.

### Documentation

### Development workflow

### Dependency upgrades

### Code quality

### Deprecations
