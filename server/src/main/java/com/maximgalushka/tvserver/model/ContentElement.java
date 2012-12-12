package com.maximgalushka.tvserver.model;

/**
 * <p></p>
 *
 * @author Maxim Galushka
 * @since 13.12.12
 */
public final class ContentElement {

    private String path;
    private ContentType type;

    public ContentElement(String path, ContentType type) {
        this.path = path;
        this.type = type;
    }

    public String getPath() {
        return path;
    }

    public ContentType getType() {
        return type;
    }
}
