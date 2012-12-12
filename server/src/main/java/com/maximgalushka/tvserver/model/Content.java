package com.maximgalushka.tvserver.model;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import net.jcip.annotations.Immutable;

import java.io.File;
import java.util.*;

/**
 * <p></p>
 *
 * @author Maxim Galushka
 * @since 12.12.12
 */
@Immutable
public final class Content {

    private String parent;
    private Map<String, ContentType> paths;
    private Gson json;

    public Content(String parent, File[] files) {
        Map<String, ContentType> inner = new HashMap<String, ContentType>(files.length);
        for(File file : files){
            ContentType c = null;
            if(file.isDirectory()) c = ContentType.DIRECTORY;
            else{
                if(file.getName().endsWith("mp3")) c = ContentType.MEDIA;
                else c = ContentType.OTHER;
            }
            inner.put(file.getPath().replaceAll("\\\\", "/"), c);
        }
        this.paths = Collections.unmodifiableMap(inner);
        this.parent = parent.replaceAll("\\\\", "/");
        this.json = new Gson();
    }

    public String getParent() {
        return parent;
    }

    public Map<String, ContentType> getPaths() {
        return paths;
    }

    public String toJson(){
        JsonObject root = new JsonObject();
        root.addProperty("parent", parent);
        root.add("paths", this.json.toJsonTree(paths));

        return this.json.toJson(root);
    }
}
