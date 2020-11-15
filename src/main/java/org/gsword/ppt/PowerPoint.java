package org.gsword.ppt;
import java.io.*;

import org.apache.poi.xslf.usermodel.SlideLayout;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xslf.usermodel.XSLFSlideLayout;
import org.apache.poi.xslf.usermodel.XSLFSlideMaster;
import org.apache.poi.xslf.usermodel.XSLFTextShape;

/**
 * create Slide
 *
 */
public class PowerPoint
{
      private XMLSlideShow ppt ;
public PowerPoint(){
      ppt=new XMLSlideShow();	     
}
public void save(String filename) throws Exception{
      File file = new File(filename);
      FileOutputStream out = new FileOutputStream(file);
      ppt.write(out);
      out.close();
}
public void createSlide(String titletxt,String content){
      XSLFSlideMaster slideMaster = ppt.getSlideMasters()[0];
      XSLFSlideLayout slidelayout = slideMaster.getLayout(SlideLayout.TITLE_AND_CONTENT);

      XSLFSlide slide = ppt.createSlide(slidelayout);
      XSLFTextShape title = slide.getPlaceholder(0);
      title.setText(titletxt);
      XSLFTextShape body = slide.getPlaceholder(1);
      body.clearText();
      body.addNewTextParagraph().addNewTextRun().setText(content);

}
public static void main(String[] args){
	PowerPoint me=new PowerPoint();
	try{
	me.createSlide("Hello Title","Content1\nContent2\nContent3");
	me.createSlide("Hello Title2","Content4\nContent5\nContent6");
	me.createSlide("Hello Title3","Contentxi\nContent2x\nContent3x");
	me.createSlide("Hello Title4","Content4x\nContent5x\nContent6x");
	me.save("sample.pptx");
	}catch (Exception e){
	e.printStackTrace();
	}
}
}
