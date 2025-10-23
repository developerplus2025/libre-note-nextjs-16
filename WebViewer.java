import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

public class WebViewer extends Application {
    @Override
    public void start(Stage stage) {
        WebView browser = new WebView();
        browser.getEngine().load("https://Decent-app.vercel.app/");

        Scene scene = new Scene(browser, 1000, 600);
        stage.setScene(scene);
        stage.setTitle("Decent App Viewer");
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
