package expo.modules.settings;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.PixelFormat;
import android.media.ImageReader;
import android.media.projection.MediaProjection;
import android.media.projection.MediaProjectionManager;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.Base64;
import android.util.Log;
import android.view.WindowManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

public class ExpoSettingsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private MediaProjectionManager projectionManager;
    private MediaProjection mediaProjection;
    private ImageReader imageReader;
    private Handler backgroundHandler;
    private int resultCode;
    private Intent resultData;

    public ExpoSettingsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ExpoSettings";
    }

    @ReactMethod
    public void startScreenCapture(int resultCode, Intent resultData, String host, int port, Promise promise) {
        this.resultCode = resultCode;
        this.resultData = resultData;
        try {
            Activity currentActivity = getCurrentActivity();
            if (currentActivity == null) {
                promise.reject("NoActivity", "No current activity found");
                return;
            }

            projectionManager = (MediaProjectionManager) currentActivity.getSystemService(Context.MEDIA_PROJECTION_SERVICE);
            mediaProjection = projectionManager.getMediaProjection(resultCode, resultData);
            setupVirtualDisplay();

            new Thread(() -> {
                try {
                    sendScreenCapture(host, port);
                    promise.resolve("Screen capture started");
                } catch (IOException e) {
                    promise.reject("SocketError", "Error sending data via socket", e);
                }
            }).start();

        } catch (Exception e) {
            promise.reject("Error", "Error starting screen capture", e);
        }
    }

    private void setupVirtualDisplay() {
        WindowManager windowManager = (WindowManager) reactContext.getSystemService(Context.WINDOW_SERVICE);
        int width = windowManager.getDefaultDisplay().getWidth();
        int height = windowManager.getDefaultDisplay().getHeight();

        imageReader = ImageReader.newInstance(width, height, PixelFormat.RGBA_8888, 2);
        mediaProjection.createVirtualDisplay(
                "ScreenCapture",
                width,
                height,
                reactContext.getResources().getDisplayMetrics().densityDpi,
                0,
                imageReader.getSurface(),
                null,
                null
        );

        HandlerThread handlerThread = new HandlerThread("ScreenCapture");
        handlerThread.start();
        backgroundHandler = new Handler(handlerThread.getLooper());
    }

    private void sendScreenCapture(String host, int port) throws IOException {
        Socket socket = new Socket(host, port);
        OutputStream outputStream = socket.getOutputStream();

        imageReader.setOnImageAvailableListener(reader -> {
            try (ImageReader.OnImageAvailableListener imageListener = reader.acquireLatestImage()) {
                if (imageListener == null) {
                    return;
                }

                Bitmap bitmap = convertImageToBitmap(imageListener);
                String encodedBitmap = encodeBitmapToBase64(bitmap);

                outputStream.write(encodedBitmap.getBytes());
                outputStream.flush();
            } catch (Exception e) {
                Log.e("ExpoSettings", "Error sending screen capture", e);
            }
        }, backgroundHandler);
    }

    private Bitmap convertImageToBitmap(ImageReader.OnImageAvailableListener imageListener) {
        // Conversion code here (skipped for brevity)
        // Convert the Image to Bitmap and return it
        return bitmap;
    }

    private String encodeBitmapToBase64(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, byteArrayOutputStream);
        return Base64.encodeToString(byteArrayOutputStream.toByteArray(), Base64.DEFAULT);
    }
}
