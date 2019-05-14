var $$ = Dom7;

var MapTrack = null;
window.PosMarker = {};
var App = new Framework7({
    swipeBackPage: false,
    material: true,
    allowDuplicateUrls: true,
    sortable: false,
    precompileTemplates: true,
    template7Pages: true,
    tapHold: false, //enable tap hold events
    root: '#app',
    name: 'DashCam',
    id: 'com.myapp.test',
    panel: {
        swipe: 'left',
        leftBreakpoint: 768,
    },
    routes: routes,
    on: {
        init: function() {
            // console.log('App initialized');

        },
        pageInit: function() {
            // console.log('Page initialized');
        },
    },


});

var mainView = App.views.create('.view-main');


let wifiManager = window.cordova.plugins.WifiManagerPlugin;
wifiManager.startWifiScan(
    function success() {
        console.log('Successs', result);
        App.dialog.alert('Successs', result);
    },
    function error() {
        console.log('Error' + result);
        App.dialog.alert('Error' + result);
    }
);





$$('#mainMenu li').on('click', menuList)

function menuList() {
    let listId = $$(this).attr('id');
    let activePage = mainView.activePage;
    console.log(activePage);

    if (listId) {
        switch (listId) {
            case 'carcam':
                mainView.router.back({
                    pageName: 'home',
                    force: true
                });
                App.panel.close($$('.panel-left'), true);
                break;
            case 'delete.cam':
                if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "delete.cam")) {
                    loadDeleteCamPage();
                    console.log('open del');
                    App.panel.close($$('.panel-left'), true);
                }
                break;
            case 'gallery.photo':
                if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "gallery.photo")) {
                    loadGalleryPhotoPage();
                    App.panel.close($$('.panel-left'), true);
                }
                break;
            case 'info':
                if (typeof(activePage) == 'undefined' || (activePage && activePage.name != "info")) {
                    loadInfoPage();
                    App.panel.close($$('.panel-left'), true);
                }
                break;
            default:
                console.log('No Found list menu');
        }
    }
}



$$('#connectCam').on('click', function() {
    console.log('click connect');
});





$$(document).on('page:init', '.page[data-name="gallery.photo"]', function(e) {
    let toolbarLinks = $$('.tab-link');
    toolbarLinks.on('click', function() {
        let dataId = $$(this).attr('data-id');
        if (dataId == 'gallery.video') {
            loadGalleryVideoPage();
        }
    });
});

function loadGalleryPhotoPage() {
    mainView.router.load({
        url: 'resources/templates/gallery.photo.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}



$$(document).on('page:init', '.page[data-name="gallery.video"]', function(e) {
    let toolbarLinks = $$('.tab-link');
    toolbarLinks.on('click', function() {
        let dataId = $$(this).attr('data-id');
        if (dataId == 'gallery.photo') {
            loadGalleryPhotoPage();
        }
    });
});

function loadGalleryVideoPage() {
    mainView.router.load({
        url: 'resources/templates/gallery.video.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}




function loadInfoPage() {
    mainView.router.load({
        url: 'resources/templates/info.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}

function loadCarcamPage() {
    console.log('Carcam page');
}


$$(document).on('page:init', '.page[data-name="delete.cam"]', function(e) {

    var items = [];
    for (var i = 1; i <= 8; i++) {
        items.push({
            title: 'Item ' + i,
            value: i,
        });
    }

    var deletecamList = App.virtualList.create({
        // List Element
        el: '.delete-cam-list',
        // Pass array with items
        items: items,
        // Custom search function for searchbar
        searchAll: function(query, items) {
            var found = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
            }
            return found; //return array with mathced indexes
        },
        // List item Template7 template
        itemTemplate: '<li>' +
            '<label class="item-checkbox item-content">' +
            '<input type="checkbox" name="demo-checkbox" value="{{value}}"/>' +
            '<div class="item-media">' +
            '<div class="item-media-inner">' +
            '<p>DC</p>' +
            '</div>' +
            '</div>' +
            '<div class="item-inner">' +
            '<div class="item-title">{{title}}</div>' +
            '</div>' +
            '<i class="icon icon-checkbox"></i>' +
            '</label>' +
            '</li>',
        // Item height
        height: app.theme === 'ios' ? 73 : (app.theme === 'md' ? 73 : 73),
    });
});


function loadDeleteCamPage() {
    mainView.router.load({
        url: 'resources/templates/delete.cam.html',
        context: {
            // FirstName: userInfo.FirstName,
        }
    });
}