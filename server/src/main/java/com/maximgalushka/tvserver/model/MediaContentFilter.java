package com.maximgalushka.tvserver.model;

import java.io.File;
import java.io.FilenameFilter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p></p>
 *
 * @author Maxim Galushka
 * @since 14.12.12
 */
public final class MediaContentFilter implements FilenameFilter {

    private Pattern pattern = Pattern.compile("^.+?\\.(avi|mkv|flv|mpeg)$");

    @Override
    public boolean accept(File dir, String name) {
        Matcher matcher = pattern.matcher(name);
        return matcher.matches();
    }
}
