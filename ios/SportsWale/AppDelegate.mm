#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RNCConfig.h"
#import <GoogleMaps/GoogleMaps.h>
#import <Firebase.h>

@implementation AppDelegate

// then read individual keys like:
NSString *apiUrl = [RNCConfig envFor:@"API_URL"];

// or just fetch the whole config
NSDictionary *config = [RNCConfig env];

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"SportsWale";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
[FIRApp configure];
  // [GMSServices provideAPIKey:@"AIzaSyBOoDtUIYQCLwexvSt3lB0_9VPdGBMgoUk"];
  [GMSServices provideAPIKey:@"AIzaSyC3kESn1Cc0X7idSUU0i3nw7Gjd2o9zMpE"];

  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
