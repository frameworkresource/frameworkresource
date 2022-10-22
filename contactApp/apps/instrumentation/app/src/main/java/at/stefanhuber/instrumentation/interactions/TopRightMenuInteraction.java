package at.stefanhuber.instrumentation.interactions;

public class TopRightMenuInteraction extends Interaction {
    @Override
    public void interact() {
        //changed
        uiDevice.click(calculateRelativeXPosition(0.95), calculateRelativeYPosition(0.08));
    }
}
