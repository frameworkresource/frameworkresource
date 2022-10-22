package at.stefanhuber.instrumentation.interactions;

public class BackMenuInteraction extends Interaction {
    @Override
    public void interact() {
        uiDevice.click(calculateRelativeXPosition(0.05), calculateRelativeYPosition(0.08));
    }
}
