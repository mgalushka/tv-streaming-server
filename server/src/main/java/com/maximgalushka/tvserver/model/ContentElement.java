package com.maximgalushka.tvserver.model;

/**
 * <p></p>
 *
 * @author Maxim Galushka
 * @since 13.12.12
 */
public final class ContentElement implements Comparable<ContentElement>{

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

    @Override
    public int compareTo(ContentElement o) {
        if(this.getType().equals(ContentType.MEDIA) && !o.getType().equals(ContentType.MEDIA)) return 1;
        if(!this.getType().equals(ContentType.MEDIA) && o.getType().equals(ContentType.MEDIA)) return -1;
        return 0;
    }
}
