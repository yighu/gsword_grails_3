environments {
	appName="sword"
    development {
        grails.logging.jul.usebridge = true
      docroot="/Users/yiguanghu/backup/yiguanghu/ccim/ccimresourceongoogle/gaelykrelated/githubhome/gswordbootstrap/web-app/pt"
      membibleid="c:/tmp/lastid.txt"
      membiblesch="c:/tmp/membiblesch.txt"
     // docroot="/home/tomcat/apache-tomcat-6.0.20/webapps/gsword"
        keyroot="/Users/yiguanghu/gswordhome/gsword/externalfiles"
        membibleid="/Users/yiguanghu/ccim/gsword/gsword/web-app/memb/lastid.txt"
        membiblesch="/Users/yiguanghu/ccim/gsword/gsword/web-app/memb/membiblesch.txt"
        prayerroot="/Users/yiguanghu/ccim/prayers/prayerministry/daily/tmp"

        inclosetroot="/Users/yiguanghu/ccim/prayers/prayerministry/renewals/biblelists/scriptslists/ChiNCVt"
        transdoc="/Users/yiguanghu/backup/yiguanghu/ccim//prayerministry/daily/tmp"

        twitter_gsword_pwd="xxxxx"
        twitter_membible_pwd="xxxxxxx"

    }
    production {
        grails.logging.jul.usebridge = false

        // TODO: grails.serverURL = "http://www.changeme.com"
        grails.serverURL = "http://www.ccimweb.org/gsword"
        docroot="/home/tomcat/apache-tomcat/webapps/gsword"
        membibleid="/home/tomcat/membible/lastid.txt"
        membiblesch="/home/tomcat/membible/membiblesch.txt"
      keyroot="/home/tomcat/keywords"
        twitter_gsword_pwd="xxxxxx"
        twitter_membible_pwd="xxxxxx"
	//praybible_zh.xml,prayerindex.txt
        prayerroot="/home/tomcat/prayer"
        inclosetroot="/home/tomcat/closet/bible"
        transdoc="/home/tomcat/prayerministry/daily/tmp"

    }
}

grails.mail.host = "localhost.localdomain"
grails.mail.port = 25
grails.mail.props = ["mail.smtp.socketFactory.port": "25",
        "mail.smtp.socketFactory.fallback": "false"]
mailman="yiguang.hu@gmail.com"
