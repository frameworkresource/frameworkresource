package com.android.starter.programs;

/* The Computer Language Benchmarks Game
   https://salsa.debian.org/benchmarksgame-team/benchmarksgame/
   contributed by Stefan Krause
   slightly modified by Chad Whipkey
*/

// 28/05/2022
// https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/mandelbrot-java-1.html

import java.io.*;

public class Mandelbrot {


        private static final int BUFFER_SIZE = 8192;
        static int size;
        static byte [] buf = new byte[BUFFER_SIZE];
        static int bufLen = 0;
        static double fac;
        static int shift;

        public void runCode(int N, FileOutputStream writer) throws Exception
        {
            this.size = N;
            fac = 2.0 / size;
            shift = size % 8 == 0 ? 0 : (8- size % 8);
            OutputStream stream = new BufferedOutputStream(writer);
            stream.write(("P4\n"+N+" "+N+"\n").getBytes());
            stream.write(buf);
            for (int y = 0; y<size; y++)
                computeRow(stream, y);
            stream.write( buf, 0, bufLen);
        }

        private static void computeRow(OutputStream stream, int y) throws IOException
        {
            int bits = 0;

            final double Ci = (y*fac - 1.0);
            final byte[] bufLocal = buf;
            for (int x = 0; x<size;x++) {
                double Zr = 0.0;
                double Zi = 0.0;
                double Cr = (x*fac - 1.5);
                int i = 50;
                double ZrN = 0;
                double ZiN = 0;
                do {
                    Zi = 2.0 * Zr * Zi + Ci;
                    Zr = ZrN - ZiN + Cr;
                    ZiN = Zi * Zi;
                    ZrN = Zr * Zr;
                } while (!(ZiN + ZrN > 4.0) && --i > 0);

                bits = bits << 1;
                if (i == 0) bits++;

                if (x%8 == 7) {
                    bufLocal[bufLen++] = (byte) bits;
                    if ( bufLen == BUFFER_SIZE) {
                        stream.write(bufLocal, 0, BUFFER_SIZE);
                        bufLen = 0;
                    }
                    bits = 0;
                }
            }
            if (shift!=0) {
                bits = bits << shift;
                bufLocal[bufLen++] = (byte) bits;
                if ( bufLen == BUFFER_SIZE) {
                    stream.write(bufLocal, 0, BUFFER_SIZE);
                    bufLen = 0;
                }
            }
        }
    }