package com.eatitright;

import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.wix.interactable.Interactable;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  @Override
  public boolean isDebug() {
      return BuildConfig.DEBUG;
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return Arrays.<ReactPackage>asList(
          new Interactable()
      );
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
