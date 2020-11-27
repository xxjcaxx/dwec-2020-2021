export {Router}

const paths = {
    home: {
        path: "/", view: 'viewHome'
    },
    planet: {
        path: "/planet/", view: 'viewDetails'
    }
}

class Router {
    constructor(){
        this.paths = paths;
        this.initRouter();
    }
    initRouter(){
        const { location: {pathname = "/"}} = window; // object destructuring
        const URL = pathname === "/" ? "home" : pathname.replace("/","");
        console.log({pathname,URL});
        this.load(URL);
    }
    load(page = "home"){
        page = page[0]=='/' ? page.replace("/","") : page;
        let pageRest = page.split('/')[0];
        let id = page.split('/')[1];
        console.log({page,pageRest,id});
        if (pageRest == undefined) pageRest = page;
        if (id == undefined) id='';

        const { paths } = this;  
        const { path, view } = paths[pageRest] || paths.error;
        //const $CONTAINER = document.querySelector("#content");
        //$CONTAINER.innerHTML = template;
        app[pageRest](id);

        window.history.pushState({}, "done", pageRest+'/'+id);
    }
}
