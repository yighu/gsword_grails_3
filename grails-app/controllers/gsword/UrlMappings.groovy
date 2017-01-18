package gsword

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index.gsp")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
