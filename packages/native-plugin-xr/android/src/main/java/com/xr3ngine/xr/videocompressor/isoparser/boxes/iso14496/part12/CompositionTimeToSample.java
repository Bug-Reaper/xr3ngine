package com.xr3ngine.xr.videocompressor.isoparser.boxes.iso14496.part12;

import com.xr3ngine.xr.videocompressor.isoparser.support.AbstractFullBox;
import com.xr3ngine.xr.videocompressor.isoparser.tools.CastUtils;
import com.xr3ngine.xr.videocompressor.isoparser.tools.IsoTypeReader;
import com.xr3ngine.xr.videocompressor.isoparser.tools.IsoTypeWriter;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * <h1>4cc = "{@value #TYPE}"</h1>
 * <pre>
 * aligned(8) class CompositionOffsetBox extends FullBox(‘ctts’, version = 0, 0) {
 *  unsigned int(32) entry_count;
 *  int i;
 *  if (version==0) {
 *   for (i=0; i &lt; entry_count; i++) {
 *    unsigned int(32) sample_count;
 *    unsigned int(32) sample_offset;
 *   }
 *  }
 *  else if (version == 1) {
 *   for (i=0; i &lt; entry_count; i++) {
 *    unsigned int(32) sample_count;
 *    signed int(32) sample_offset;
 *   }
 *  }
 * }
 * </pre>
 * <p>
 * This box provides the offset between decoding time and composition time.
 * In version 0 of this box the decoding time must be less than the composition time, and
 * the offsets are expressed as unsigned numbers such that</p>
 * <p>CT(n) = DT(n) + CTTS(n) where CTTS(n) is the (uncompressed) table entry for sample n.</p>
 * <p>In version 1 of this box, the composition timeline and the decoding timeline are
 * still derived from each other, but the offsets are signed.
 * It is recommended that for the computed composition timestamps, there is
 * exactly one with the value 0 (zero).</p>
 */
public class CompositionTimeToSample extends AbstractFullBox {
    public static final String TYPE = "ctts";

    List<Entry> entries = Collections.emptyList();

    public CompositionTimeToSample() {
        super(TYPE);
    }

    /**
     * Decompresses the list of entries and returns the list of composition times.
     *
     * @param entries composition time to sample entries in compressed form
     * @return decoding time per sample
     */
    public static int[] blowupCompositionTimes(List<CompositionTimeToSample.Entry> entries) {
        long numOfSamples = 0;
        for (CompositionTimeToSample.Entry entry : entries) {
            numOfSamples += entry.getCount();
        }
        assert numOfSamples <= Integer.MAX_VALUE;
        int[] decodingTime = new int[(int) numOfSamples];

        int current = 0;


        for (CompositionTimeToSample.Entry entry : entries) {
            for (int i = 0; i < entry.getCount(); i++) {
                decodingTime[current++] = entry.getOffset();
            }
        }

        return decodingTime;
    }

    protected long getContentSize() {
        return 8 + 8 * entries.size();
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }

    @Override
    public void _parseDetails(ByteBuffer content) {
        parseVersionAndFlags(content);
        int numberOfEntries = CastUtils.l2i(IsoTypeReader.readUInt32(content));
        entries = new ArrayList<Entry>(numberOfEntries);
        for (int i = 0; i < numberOfEntries; i++) {
            Entry e = new Entry(CastUtils.l2i(IsoTypeReader.readUInt32(content)), content.getInt());
            entries.add(e);
        }
    }

    @Override
    protected void getContent(ByteBuffer byteBuffer) {
        writeVersionAndFlags(byteBuffer);
        IsoTypeWriter.writeUInt32(byteBuffer, entries.size());

        for (Entry entry : entries) {
            IsoTypeWriter.writeUInt32(byteBuffer, entry.getCount());
            byteBuffer.putInt(entry.getOffset());
        }

    }

    public static class Entry {
        int count;
        int offset;

        public Entry(int count, int offset) {
            this.count = count;
            this.offset = offset;
        }

        public int getCount() {
            return count;
        }

        public void setCount(int count) {
            this.count = count;
        }

        public int getOffset() {
            return offset;
        }

        public void setOffset(int offset) {
            this.offset = offset;
        }

        @Override
        public String toString() {
            return "Entry{" +
                    "count=" + count +
                    ", offset=" + offset +
                    '}';
        }
    }

}
