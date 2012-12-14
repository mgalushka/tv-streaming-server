package com.maximgalushka.tvserver.servlet;

import com.maximgalushka.tvserver.model.Content;
import com.maximgalushka.tvserver.model.MediaContentFilter;
import org.apache.log4j.Logger;
import sun.rmi.runtime.Log;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.LinkedHashMap;

/**
 * <p></p>
 *
 * @author Maxim Galushka
 * @since 12.12.12
 */
public class FileSystemServlet extends HttpServlet {

    private static final Logger log = Logger.getLogger(FileSystemServlet.class);

    @SuppressWarnings("unchecked")
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        log.debug(String.format("Received request [%s]", URLDecoder.decode(request.getQueryString(), "UTF-8")));
        try {
            LinkedHashMap<String, Object[]> properties
                    = new LinkedHashMap<String, Object[]>(request.getParameterMap());

            Object[] pathObj = properties.get("path");

            if(pathObj == null){
                printDefault(response);
            }
            else{
                if(pathObj.length > 0 && pathObj[0] != null && pathObj[0] instanceof String){
                    String path = URLDecoder.decode(((String) pathObj[0]).trim(), "UTF-8");
                    File pathFile = new File(path);
                    if(pathFile.exists()){
                        if(pathFile.isDirectory()){
                            printOutput(pathFile.listFiles(), pathFile.getParent(), response);
                        }
                        else {
                            RequestDispatcher rd = request.getRequestDispatcher("/content");
                            rd.forward(request, response);
                        }
                    } else{
                        printDefault(response);
                    }
                }
                else{
                    printDefault(response);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            printDefault(response);
        }
    }

    protected void printDefault(HttpServletResponse response) throws IOException {
        printOutput(File.listRoots(), null, response);
    }

    protected void printOutput(File[] files, String parent, HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");
        PrintWriter pw = new PrintWriter(response.getWriter());

        Content content = new Content(parent, files);
        pw.println(content.toJson());

        pw.flush();
        pw.close();
    }

//    pw.printf("<html><head><title>LIST</title></head><body>");
//    if(parent != null){
//        pw.printf("<br/>PARENT: <a href=\"structure?path=%s\">%s</a>", parent, parent);
//    }
//    pw.println("<ul>");
//    for(File file : files){
//        String path = file.getPath().replaceAll("\\\\", "/");
//        pw.printf("<li><a href=\"structure?path=%s\">%s</a></li>", path, path);
//    }
//    pw.println("</ul></body></html>");

}
