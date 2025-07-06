# Subscription Protection System

This document explains how to implement and use the subscription protection system in the Soul app to ensure that only users with active subscriptions can access premium content.

## Overview

The subscription protection system consists of several components:

1. **SubscriptionRouteObserver**: A global navigation observer that checks subscription status for all routes.
2. **SubscriptionCheckMixin**: A mixin that can be added to any screen to enforce subscription checks.
3. **SubscriptionProtectedWidget**: A widget wrapper that only shows its content to subscribed users.
4. **SubscriptionGuard**: A utility class with static methods for subscription-related operations.
5. **SubscriptionUtils**: Helper functions for subscription checks and navigation.

## Implementation

### 1. Global Route Protection

The app has a `SubscriptionRouteObserver` configured in `main.dart`. This observer automatically checks all routes and redirects non-subscribed users to the paywall when they try to access protected screens.

The following screens are exempt from subscription checks:
- OnboardingScreen
- OnboardingQuestionnaireScreen
- PaywallScreen
- SubscriptionVerificationScreen
- SplashScreen
- ErrorScreen
- WelcomeScreen

### 2. Protecting Individual Screens

To protect an individual screen, use the `SubscriptionCheckMixin`:

```dart
class MyProtectedScreen extends StatefulWidget {
  @override
  State<MyProtectedScreen> createState() => _MyProtectedScreenState();
}

class _MyProtectedScreenState extends State<MyProtectedScreen> with SubscriptionCheckMixin {
  // Override if this screen requires subscription (defaults to true)
  @override
  bool get requiresSubscription => true;
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Your screen content
    );
  }
}
```

### 3. Protecting Individual UI Components

To protect specific UI components or features, use the `SubscriptionProtectedWidget`:

```dart
SubscriptionProtectedWidget(
  child: YourPremiumFeatureWidget(),
  // Optional: Provide alternative content for non-subscribers
  alternativeContent: Text('Upgrade to access this feature'),
  // Optional: Customize the paywall button
  paywallButtonText: 'Get Premium',
)
```

### 4. Using the SubscriptionGuard

For programmatic subscription checks, use the `SubscriptionGuard` utility class:

```dart
// Check if user has access and redirect to paywall if not
if (!SubscriptionGuard.enforceSubscription(context)) {
  return; // Stop execution if no subscription
}

// For feature-level checks within a screen
void onPremiumFeaturePressed() {
  if (SubscriptionGuard.checkFeatureAccess(context)) {
    // Execute premium feature code
  }
}

// Check if user has lifetime access
if (SubscriptionGuard.hasLifetimeAccess(context)) {
  // Show lifetime-specific content
}
```

## Best Practices

1. **Multiple Layers of Protection**: Use both the global route observer and the mixin for critical screens to ensure protection even if one mechanism fails.

2. **Graceful Degradation**: When possible, show alternative content rather than blocking access entirely.

3. **Clear Messaging**: Always make it clear to users why they're being redirected to the paywall.

4. **Verification on Navigation**: The app automatically verifies subscription status when navigating between screens to prevent unauthorized access.

5. **Exempt Essential Screens**: Make sure to keep the exempt screens list up to date to prevent redirect loops.

## Troubleshooting

If users report being able to access premium content without a subscription:

1. Check that the screen is properly protected with either the mixin or route observer.
2. Verify that the screen name is not accidentally included in the exempt screens list.
3. Ensure the subscription provider is properly initialized before any navigation occurs.
4. Check for any custom navigation that might bypass the route observer.

For any issues with the subscription protection system, contact the development team. 