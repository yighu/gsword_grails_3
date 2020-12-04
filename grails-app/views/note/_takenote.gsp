  <h3><g:message code="notetitle"/></h3>
<br/>
   
   <table>
        <tr>
  <td>Title 

 </td>
            <td>
                <g:textField name="notetitle" value="${note?.title}" onchange="keepnote();"/>
            </td>
        </tr>
       <tr>
           <td>   Email
          </td>
           <td>
               <g:textField name="noteemail" value="${note?.email}" onchange="keepnote();"/>
           </td>
       </tr>
      <tr>
           <td>Notes</td>
           <td>
               <g:textArea name="notetxt" rows="25" cols="50" value="${note?.ref?:''}\n\n${note?.note?:'神圣的阅读\n\n神圣的阅读（译自拉丁文 ”Lectio Divina“） 是教父俄勒根提出的灵修方式。其目标是在经文中与上帝相遇，使脑，心和手经历同样的影响。 这儿介绍”神圣的阅读“的主要步骤，详情请参看附录参考来源文章： \n\nPraeparatio: 准备。准备你的心在他的话中来遇见神 。 \n\nLectio — 阅读。阅读和研究经文。 \n\nMeditatio — 反思。通过有意地深入反思，时空形象化等方式将经文 由思想深入内心。  \n\nOratio — 祷告。将反思过程中得到的心得体会，结合经文，向神祷告回去。  \n\nContemplatio — 安静。 留下一段安静的时间让你经历神的同在，倾听他的话语所要教训你的。 \n\nActio: 行动。写下这个灵修所得可以改变自己生命的内容。  \n\n参考: http://exegeticaltools.com/2018/03/12/meeting-god-in-the-greek-new-testament-the-practice-of-lectio-divina/'}" onblur="keepnote();" onchange="keepnote();"/>
           </td>
       </tr>

    </table>
  <table>

     <tr >
         <td>
 <button type="button" onclick="addreftonote();">Append Bible</button>         
         
 <button type="button" onclick="sendnotemail();">Email Note to the Above address</button>         
          <div id="emailnotestatus"/> 
         </td>
     </tr>
<tr><td>Note: CCIM do not keep your note and do not share it with any one!</td></tr>
  </table>
