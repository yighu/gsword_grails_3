package gsword
import twitter4j.internal.http.HttpResponse;
import javax.crypto.spec.SecretKeySpec;
import twitter4j.http.*;
import twitter4j.*;
import org.springframework.beans.factory.InitializingBean
import grails.web.JSONBuilder

class TwitterService implements InitializingBean {
  def jswordService
   def grailsApplication
  //def bayeux
  def client
  def quotes = []
  boolean transactional = false

  def update() {
        AccessToken atk=new AccessToken("33532940-nGxF0r1V30V017XQ2ML19MDkIcLP3RI6xT2oVbePL","d0uSDWzMgkx6GYU5I1zCfJvhxObBjSdl4CS3OMfP4E");
        Twitter twitter=new TwitterFactory().getOAuthAuthorizedInstance("S59vTBukcU1K5LhsCJe0LQ", "FHEqcCcw6S1uXwO0cqv53BL3Nil5QAbVt6Uol50uuQA",atk);
    def verse = jswordService.randomVerse()
    def data = jswordService.getPlainText("KJV", verse)
   try {
   update(twitter,verse + " " + data);
    data = jswordService.getPlainText("ChiUn", verse)
    update( twitter,verse + " " + data?.replaceAll(" ", ""));
        } catch (InterruptedException ex) {
            ex.printStackTrace()
        }finally{
     twitter=null
   }

  }

  def segment(String s,List rst){
          if (s.size()<=140){
            rst.add(s)
          }else{
           rst.add(s.substring(0,140))
           segment(s.substring(140),rst)
          }
          return rst
  }

    def update(Twitter twitter, String data){
           segment(data,new ArrayList()).each{
            twitter.updateStatus(it);
           }
           }

    def twist(String data){
	if (data?.size()>140)data=data.substring(0,140)
	data
	}
    def membible() {
        AccessToken atk=new AccessToken("80463491-ZmWMuVYjKU5CLSYZOqNagiSnchyb8J9u8CFoCYgt6","osgqhBhpOpynF5HF8krrxy6mm5VJUaU0gpy2FQqFnes")
        Twitter twitter=new TwitterFactory().getOAuthAuthorizedInstance("qoWOoasLCzcmN3p8XsWQ", "1uHHYgsX1qGMJaoNHkVMgbXwjqi7acjnqtwSIoW4xFk",atk);
      def verse = jswordService.memVerse()
      def data = jswordService.getPlainText("KJV", verse)
      try {
      update(twitter,verse + " " + data);
      data = jswordService.getPlainText("ChiUn", verse)

      update(twitter,verse + " " + data.replaceAll(" ", ""));
        } catch (InterruptedException ex) {
        ex.printStackTrace()
        }
    }

  def timeline=""
  def ACCEPTEDTWITTER = ['RickWarren','MaxLucado', 'johncmaxwell', 'JohnPiper', 'gsword','membible','c3i_Leadership'] as Set
  def fetchTimeline() {
  //  println "do it here..."
    def timelines=new StringBuffer("On Twitter <a href=\"http://twitter.com/gsword\">gsword</a><br/>")
    ACCEPTEDTWITTER.each{user->

        try {
            def url = "http://twitter.com/$user"
            def data = url.toURL().text
            def line= data.split("\"timeline\">")[1].split("\"entry-content\">")[1].split("</span>")[0]
         // println line
            timelines.append("<a href=\"http://twitter.com/$user\">$user</a>: $line<br/>")
        } catch (Exception e) {
             //e.printStackTrace()
        }
    }
  timeline=timelines.toString()
  }
  def fetchTimelinex() {
   // println " Fetching timeline "+Calendar.getInstance().getTime();
    def rest = new StringBuffer("")
    try {
        AccessToken atk=new AccessToken("33532940-nGxF0r1V30V017XQ2ML19MDkIcLP3RI6xT2oVbePL","d0uSDWzMgkx6GYU5I1zCfJvhxObBjSdl4CS3OMfP4E");
        Twitter twitter=new TwitterFactory().getOAuthAuthorizedInstance("S59vTBukcU1K5LhsCJe0LQ", "FHEqcCcw6S1uXwO0cqv53BL3Nil5QAbVt6Uol50uuQA",atk);
      List<Status> statuses = twitter.getFriendsTimeline()
      for (Status status: statuses) {
        def nm = status.getUser().getScreenName()
        if (ACCEPTEDTWITTER.contains(nm)) {
          rest.append("<a href='http://www.twitter.com/" + nm + "'>" + nm + "</a>" + " " +
                  status.getText() + "<br/>");
        }
      }
      timeline = rest.toString()
         timeline = "<a href='http://www.twitter.com/gsword'>News On Twitter</a><br/>" + timeline
 
      timeline = "<p>" + timeline + "</p>"
    } catch (Exception e) {
     // e.printStackTrace()
    }
    // println retn
    timeline
  }

  def getTimeline() {
    if (!timeline) {
      timeline = fetchTimeline()
    }
    timeline
  }

  void afterPropertiesSet() {
  }
}
