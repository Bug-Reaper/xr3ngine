/*  
 * Copyright 2008 CoreMedia AG, Hamburg
 *
 * Licensed under the Apache License, Version 2.0 (the License); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at 
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an AS IS BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 * See the License for the specific language governing permissions and 
 * limitations under the License. 
 */

package com.xr3ngine.xr.videocompressor.isoparser.boxes.threegpp.ts26244;

import com.xr3ngine.xr.videocompressor.isoparser.support.AbstractFullBox;
import com.xr3ngine.xr.videocompressor.isoparser.tools.IsoTypeReader;
import com.xr3ngine.xr.videocompressor.isoparser.tools.IsoTypeWriter;
import com.xr3ngine.xr.videocompressor.isoparser.tools.Utf8;

import java.nio.ByteBuffer;

/**
 * <h1>4cc = "{@value #TYPE}"</h1>
 * Gives a language dependent description of the media contained in the ISO file.
 */
public class DescriptionBox extends AbstractFullBox {
    public static final String TYPE = "dscp";

    private String language;
    private String description;

    public DescriptionBox() {
        super(TYPE);
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    protected long getContentSize() {
        return 7 + Utf8.utf8StringLengthInBytes(description);
    }

    @Override
    public void _parseDetails(ByteBuffer content) {
        parseVersionAndFlags(content);
        language = IsoTypeReader.readIso639(content);
        description = IsoTypeReader.readString(content);
    }

    @Override
    protected void getContent(ByteBuffer byteBuffer) {
        writeVersionAndFlags(byteBuffer);
        IsoTypeWriter.writeIso639(byteBuffer, language);
        byteBuffer.put(Utf8.convert(description));
        byteBuffer.put((byte) 0);
    }

    public String toString() {
        return "DescriptionBox[language=" + getLanguage() + ";description=" + getDescription() + "]";
    }
}
