package com.android.starter.programs;

/*
 * The Computer Language Benchmarks Game
 * https://salsa.debian.org/benchmarksgame-team/benchmarksgame/

 * contributed by Tao Lei
 *
 *
 * https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/revcomp-java-5.html
 */

import java.io.FileOutputStream;
import java.io.InputStream;

public class RevComp {

    static final String transFrom    = "ACGTUMRWSYKVHDBN";
    static final String transTo    = "TGCAAKYWSRMBDHVN";
    static final byte[] transMap = new byte[128];
    static {
        for(int i=0;i<transMap.length;i++) transMap[i] = (byte)i;
        for(int i=0;i<transFrom.length();i++)
        {
            char c = transFrom.charAt(i);
            transMap[c] = transMap[Character.toLowerCase(c)] = (byte)transTo.charAt(i);
        }
    }
    static byte[] buffer = new byte[65536];
    static InputStream in = System.in;
    static int pos,limit;
    static int start,end;
    static int endPos()
    {
        for(int off=pos;off<limit;off++)
        {
            if(buffer[off] == '\n')
                return off;
        }
        return -1;
    }
    static boolean nextLine() throws Exception
    {
        for(;;)
        {
            end = endPos();
            if(end >= 0)
            {
                start = pos;
                pos = end+1;
                if(buffer[end-1]== '\r')
                    end --;
                while(buffer[start]==' ') start++;
                while(end>start && buffer[end-1] == ' ') end--;
                if(end > start)
                    return true;
            }
            else
            {
                if(pos > 0 && limit > pos)
                {
                    limit-=pos;
                    System.arraycopy(buffer,pos,buffer,0,limit);
                    pos = 0;
                }
                else
                {
                    pos=limit=0;
                }
                int r = in.read(buffer, limit, buffer.length-limit);
                if(r<0)
                    return false;
                limit += r;
            }
        }
    }
    static int LINE_WIDTH =0;
    static byte[] data = new byte[1<<20];
    static int size;
    static byte[] outputBuffer = new byte[65536];
    static int outputPos = 0;
    static void flushData(FileOutputStream writer) throws Exception
    {
        writer.write(outputBuffer,0,outputPos);
        outputPos = 0;
    }
    static void prepareWrite(int len, FileOutputStream writer) throws Exception
    {
        if(outputPos + len > outputBuffer.length)
            flushData(writer);
    }
    static void write(int b) throws Exception
    {
        outputBuffer[outputPos++] = (byte)b;
    }
    static void write(byte[] b,int off,int len,FileOutputStream writer) throws Exception
    {
        prepareWrite(len,writer);
        System.arraycopy(b,off,outputBuffer,outputPos,len);
        outputPos += len;
    }
    static void finishData(FileOutputStream writer) throws Exception
    {
        while(size > 0)
        {
            int len = Math.min(LINE_WIDTH,size);
            prepareWrite(len + 1,writer);
            while(len-- != 0)
            {
                write(data[--size]);
            }
            write('\n');
        }
        resetData();
    }
    static void resetData()
    {
        LINE_WIDTH = 0;
        size = 0;
    }
    static void appendLine() throws Exception
    {
        int len = end-start;
        if(LINE_WIDTH==0) LINE_WIDTH = len;
        if(size + len > data.length)
        {
            byte[] data0 = data;
            data = new byte[data.length*2];
            System.arraycopy(data0,0,data,0,size);
        }
        for(int i=start;i<end;i++)
        {
            data[size++] = transMap[buffer[i]];
        }
    }
    static void solve(InputStream ins, FileOutputStream writer) throws Exception
    {
        in = ins;
        pos = limit = 0;
        outputPos = 0;
        resetData();
        while(nextLine())
        {
            if(buffer[start] == '>')
            {
                finishData(writer);
                write(buffer,start,pos-start,writer);
            }
            else
            {
                appendLine();
            }
        }
        finishData(writer);
        if(outputPos > 0) flushData(writer);
        System.out.flush();
    }
    public void runCode(InputStream inputStream, FileOutputStream writer) throws Exception
    {
        solve(inputStream,writer);
    }

}