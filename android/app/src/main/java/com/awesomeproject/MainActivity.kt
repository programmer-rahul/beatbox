package com.beatbox

import android.os.Build
import android.os.Bundle
import android.view.View
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "BeatBox"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(null)

      // Ensure content goes below navigation buttons
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
          window.setDecorFitsSystemWindows(false)
      } else {
          window.decorView.systemUiVisibility =
              View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or
              View.SYSTEM_UI_FLAG_LAYOUT_STABLE
      }
  }
}
