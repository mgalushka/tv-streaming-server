package com.maximgalushka.tvserver.servlet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;

/**
 * <p></p>
 *
 * @author Maxim Galushka
 * @since 12.12.12
 */
public class FileSystemServlet extends HttpServlet {

    @SuppressWarnings("unchecked")
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {
            LinkedHashMap<String, Object[]> properties
                    = new LinkedHashMap<String, Object[]>(request.getParameterMap());

            Object[] pathObj = properties.get("path");

            if(pathObj == null){
                printDefault(response);
            }
            else{
                if(pathObj.length > 0 && pathObj[0] != null && pathObj[0] instanceof String){
                    String path = ((String) pathObj[0]).trim();
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
        PrintWriter pw = new PrintWriter(response.getWriter());
        pw.printf("<html><head><title>LIST</title></head><body>");
        if(parent != null){
            pw.printf("<br/>PARENT: <a href=\"structure?path=%s\">%s</a>", parent, parent);
        }
        pw.println("<ul>");
        for(File file : files){
            pw.printf("<li><a href=\"structure?path=%s\">%s</a></li>", file.toString(), file.toString());
        }
        pw.println("</ul></body></html>");

        pw.flush();
        pw.close();
    }

}
