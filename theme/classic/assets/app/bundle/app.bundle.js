"use strict";

var KTDemoPanel = function() {
    var demoPanel = KTUtil.getByID('kt_demo_panel');
    var offcanvas;

    var init = function() {
        offcanvas = new KTOffcanvas(demoPanel, {
            overlay: true,  
            baseClass: 'kt-demo-panel',
            closeBy: 'kt_demo_panel_close',
            toggleBy: 'kt_demo_panel_toggle'
        }); 

        var head = KTUtil.find(demoPanel, '.kt-demo-panel__head');
        var body = KTUtil.find(demoPanel, '.kt-demo-panel__body');

        KTUtil.scrollInit(body, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);
               
                if (head) {
                    height = height - parseInt(KTUtil.actualHeight(head));
                    height = height - parseInt(KTUtil.css(head, 'marginBottom'));
                }
        
                height = height - parseInt(KTUtil.css(demoPanel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(demoPanel, 'paddingBottom'));    

                return height;
            }
        });

        if (typeof offcanvas !== 'undefined' && !$.isEmptyObject(offcanvas)) {
            offcanvas.on('hide', function() {
                alert(1);
                var expires = new Date(new Date().getTime() + 60 * 60 * 1000); // expire in 60 minutes from now
                Cookies.set('kt_demo_panel_shown', 1, { expires: expires });
            });
        }
    }

    var remind = function() {
        if (!(encodeURI(window.location.hostname) == 'keenthemes.com' || encodeURI(window.location.hostname) == 'www.keenthemes.com')) {
            return;
        }

        setTimeout(function() {
            if (!Cookies.get('kt_demo_panel_shown')) {
                var expires = new Date(new Date().getTime() + 15 * 60 * 1000); // expire in 15 minutes from now
                Cookies.set('kt_demo_panel_shown', 1, { expires: expires });
                offcanvas.show();
            } 
        }, 4000);
    }

    return {     
        init: function() {  
            init(); 
            remind();
        }
    };
}();

// Init on page load completed
KTUtil.ready(function() {
    KTDemoPanel.init();
});
// Class definition
var KTLib = function() {

    return {
        initMiniChart: function(src, data, color, border, fill, tooltip) {
            if (src.length == 0) {
                return;
            }

            // set default values
            fill = (typeof fill !== 'undefined') ? fill : false;
            tooltip = (typeof tooltip !== 'undefined') ? tooltip : false;

            var config = {
                type: 'line',
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
                    datasets: [{
                        label: "",
                        borderColor: color,
                        borderWidth: border,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 4,
                        pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                        pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                        pointHoverBackgroundColor: KTApp.getStateColor('brand'),
                        pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
                        fill: fill,
                        backgroundColor: color,
                        data: data,
                    }]
                },
                options: {
                    title: {
                        display: false,
                    },
                    tooltips: (tooltip ? {
                        enabled: true,
                        intersect: false,
                        mode: 'nearest',
                        bodySpacing: 5,
                        yPadding: 10,
                        xPadding: 10, 
                        caretPadding: 0,
                        displayColors: false,
                        backgroundColor: KTApp.getStateColor('brand'),
                        titleFontColor: '#ffffff', 
                        cornerRadius: 4,
                        footerSpacing: 0,
                        titleSpacing: 0
                    } : false),
                    legend: {
                        display: false,
                        labels: {
                            usePointStyle: false
                        }
                    },
                    responsive: false,
                    maintainAspectRatio: true,
                    hover: {
                        mode: 'index'
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            gridLines: false,
                            scaleLabel: {
                                display: false,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: false,
                            gridLines: false,
                            scaleLabel: {
                                display: false,
                                labelString: 'Month'
                            }
                        }]
                    },

                    elements: {
                        line: {
                            tension: 0.5
                        },
                        point: {
                            radius: 2,
                            borderWidth: 4
                        },
                    },

                    layout: {
                        padding: {
                            left: 6,
                            right: 0,
                            top: 4,
                            bottom: 0
                        }
                    }
                }
            };

            var chart = new Chart(src, config);
        },

        initMediumChart: function(src, data, max, color, border) {
            if (!document.getElementById(src)) {
                return;
            }

            var border = border ? border : 2;

            // Main chart
            var ctx = document.getElementById(src).getContext("2d");

            var gradient = ctx.createLinearGradient(0, 0, 0, 100);
            gradient.addColorStop(0, Chart.helpers.color(color).alpha(0.3).rgbString());
            gradient.addColorStop(1, Chart.helpers.color(color).alpha(0).rgbString());

            var mainConfig = {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
                    datasets: [{
                        label: 'Orders',
                        borderColor: color,
                        borderWidth: border,
                        backgroundColor: gradient,
                        pointBackgroundColor: KTApp.getStateColor('brand'),
                        data: data,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: false,
                        text: 'Stacked Area'
                    },
                    tooltips: {
                        enabled: true,
                        intersect: false,
                        mode: 'nearest',
                        bodySpacing: 5,
                        yPadding: 10,
                        xPadding: 10, 
                        caretPadding: 0,
                        displayColors: false,
                        backgroundColor: KTApp.getStateColor('brand'),
                        titleFontColor: '#ffffff', 
                        cornerRadius: 4,
                        footerSpacing: 0,
                        titleSpacing: 0
                    },
                    legend: {
                        display: false,
                        labels: {
                            usePointStyle: false
                        }
                    },
                    hover: {
                        mode: 'index'
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            scaleLabel: {
                                display: false,
                                labelString: 'Month'
                            },
                            ticks: {
                                display: false,
                                beginAtZero: true,
                            }
                        }],
                        yAxes: [{
                            display: false,
                            scaleLabel: {
                                display: false,
                                labelString: 'Value'
                            },
                            gridLines: {
                                color: '#eef2f9',
                                drawBorder: false,
                                offsetGridLines: true,
                                drawTicks: false
                            },
                            ticks: {
                                max: max,
                                display: false,
                                beginAtZero: true
                            }
                        }]
                    },
                    elements: {
                        point: {
                            radius: 0,
                            borderWidth: 0,
                            hoverRadius: 0,
                            hoverBorderWidth: 0
                        }
                    },
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }
                    }
                }
            };

            var chart = new Chart(ctx, mainConfig);

            // Update chart on window resize
            KTUtil.addResizeHandler(function() {
                chart.update();
            });
        }
    };
}();
"use strict";

var KTOffcanvasPanel = function() {
    var notificationPanel = KTUtil.get('kt_offcanvas_toolbar_notifications');
    var quickActionsPanel = KTUtil.get('kt_offcanvas_toolbar_quick_actions');
    var profilePanel = KTUtil.get('kt_offcanvas_toolbar_profile');
    var searchPanel = KTUtil.get('kt_offcanvas_toolbar_search');

    var initNotifications = function() {
        var head = KTUtil.find(notificationPanel, '.kt-offcanvas-panel__head');
        var body = KTUtil.find(notificationPanel, '.kt-offcanvas-panel__body');

        var offcanvas = new KTOffcanvas(notificationPanel, {
            overlay: true,  
            baseClass: 'kt-offcanvas-panel',
            closeBy: 'kt_offcanvas_toolbar_notifications_close',
            toggleBy: 'kt_offcanvas_toolbar_notifications_toggler_btn'
        }); 

        KTUtil.scrollInit(body, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);
               
                if (head) {
                    height = height - parseInt(KTUtil.actualHeight(head));
                    height = height - parseInt(KTUtil.css(head, 'marginBottom'));
                }
        
                height = height - parseInt(KTUtil.css(notificationPanel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(notificationPanel, 'paddingBottom'));    

                return height;
            }
        });
    }

    var initQucikActions = function() {
        var head = KTUtil.find(quickActionsPanel, '.kt-offcanvas-panel__head');
        var body = KTUtil.find(quickActionsPanel, '.kt-offcanvas-panel__body');

        var offcanvas = new KTOffcanvas(quickActionsPanel, {
            overlay: true,  
            baseClass: 'kt-offcanvas-panel',
            closeBy: 'kt_offcanvas_toolbar_quick_actions_close',
            toggleBy: 'kt_offcanvas_toolbar_quick_actions_toggler_btn'
        }); 

        KTUtil.scrollInit(body, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);
               
                if (head) {
                    height = height - parseInt(KTUtil.actualHeight(head));
                    height = height - parseInt(KTUtil.css(head, 'marginBottom'));
                }
        
                height = height - parseInt(KTUtil.css(quickActionsPanel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(quickActionsPanel, 'paddingBottom'));    

                return height;
            }
        });
    }

    var initProfile = function() {
        var head = KTUtil.find(profilePanel, '.kt-offcanvas-panel__head');
        var body = KTUtil.find(profilePanel, '.kt-offcanvas-panel__body');

        var offcanvas = new KTOffcanvas(profilePanel, {
            overlay: true,  
            baseClass: 'kt-offcanvas-panel',
            closeBy: 'kt_offcanvas_toolbar_profile_close',
            toggleBy: 'kt_offcanvas_toolbar_profile_toggler_btn'
        }); 

        KTUtil.scrollInit(body, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);
               
                if (head) {
                    height = height - parseInt(KTUtil.actualHeight(head));
                    height = height - parseInt(KTUtil.css(head, 'marginBottom'));
                }
        
                height = height - parseInt(KTUtil.css(profilePanel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(profilePanel, 'paddingBottom'));    

                return height;
            }
        });
    }

    var initSearch = function() {
        var head = KTUtil.find(searchPanel, '.kt-offcanvas-panel__head');
        var body = KTUtil.find(searchPanel, '.kt-offcanvas-panel__body');
        var search = KTUtil.get('kt_quick_search_offcanvas');
        var form = KTUtil.find(search, '.kt-quick-search__form');
        var wrapper = KTUtil.find(search, '.kt-quick-search__wrapper');

        var offcanvas = new KTOffcanvas(searchPanel, {
            overlay: true,  
            baseClass: 'kt-offcanvas-panel',
            closeBy: 'kt_offcanvas_toolbar_search_close',
            toggleBy: 'kt_offcanvas_toolbar_search_toggler_btn'
        }); 

        KTUtil.scrollInit(wrapper, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                var height = parseInt(KTUtil.getViewPort().height);

                height = height - parseInt(KTUtil.actualHeight(form));
                height = height - parseInt(KTUtil.css(form, 'marginBottom'));

                if (head) {
                    height = height - parseInt(KTUtil.actualHeight(head));
                    height = height - parseInt(KTUtil.css(head, 'marginBottom'));
                }
        
                height = height - parseInt(KTUtil.css(searchPanel, 'paddingTop'));
                height = height - parseInt(KTUtil.css(searchPanel, 'paddingBottom'));    

                return height;
            }
        });
    }

    return {     
        init: function() {  
            initNotifications(); 
            initQucikActions();
            initProfile();
            initSearch();
        }
    };
}();

// Init on page load completed
KTUtil.ready(function() {
    KTOffcanvasPanel.init();
});
"use strict";

var KTQuickPanel = function() {
    var panel = KTUtil.get('kt_quick_panel');
    var notificationPanel = KTUtil.get('kt_quick_panel_tab_notifications');
    var actionsPanel = KTUtil.get('kt_quick_panel_tab_actions');
    var settingsPanel = KTUtil.get('kt_quick_panel_tab_settings');

    var getContentHeight = function() {
        var height;
        var nav = KTUtil.find(panel, '.kt-offcanvas-panel__nav');
        var content = KTUtil.find(panel, '.kt-offcanvas-panel__body');

        height = parseInt(KTUtil.getViewPort().height) - 
                 parseInt(KTUtil.actualHeight(nav)) - 
                 parseInt(KTUtil.css(nav, 'margin-bottom')) -
                 (2 * parseInt(KTUtil.css(nav, 'padding-top'))) - 
                 10;

        return height;
    }

    var initOffcanvas = function() {
        var offcanvas = new KTOffcanvas(panel, {
            overlay: true,  
            baseClass: 'kt-offcanvas-panel',
            closeBy: 'kt_quick_panel_close_btn',
            toggleBy: 'kt_quick_panel_toggler_btn'
        });   
    }

    var initNotifications = function() {
        KTUtil.scrollInit(notificationPanel, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                return getContentHeight();
            }
        });
    }

    var initActions = function() {
        KTUtil.scrollInit(actionsPanel, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                return getContentHeight();
            }
        });
    }

    var initSettings = function() {
        KTUtil.scrollInit(settingsPanel, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                return getContentHeight();
            }
        });
    }

    var updatePerfectScrollbars = function() {
        $(panel).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) { 
            KTUtil.scrollUpdate(notificationPanel);
            KTUtil.scrollUpdate(actionsPanel);
            KTUtil.scrollUpdate(settingsPanel);
        });
    }

    return {     
        init: function() {  
            initOffcanvas(); 
            initNotifications();
            initActions();
            initSettings();
            updatePerfectScrollbars();
        }
    };
}();

// Init on page load completed
KTUtil.ready(function() {
    KTQuickPanel.init();
});
"use strict";

var KTQuickSearch = function() {
    var target;
    var form;
    var input;
    var closeIcon;
    var resultWrapper;
    var resultDropdown;
    var resultDropdownToggle;
    var inputGroup;
    var query = '';

    var hasResult = false; 
    var timeout = false; 
    var isProcessing = false;
    var requestTimeout = 200; // ajax request fire timeout in milliseconds 
    var spinnerClass = 'kt-spinner kt-spinner--input kt-spinner--sm kt-spinner--brand kt-spinner--right';
    var resultClass = 'kt-quick-search--has-result';
    var minLength = 2;

    var showProgress = function() {
        isProcessing = true;
        KTUtil.addClass(inputGroup, spinnerClass); 

        if (closeIcon) {
            KTUtil.hide(closeIcon);
        }       
    }

    var hideProgress = function() {
        isProcessing = false;
        KTUtil.removeClass(inputGroup, spinnerClass);

        if (closeIcon) {
            if (input.value.length < minLength) {
                KTUtil.hide(closeIcon);
            } else {
                KTUtil.show(closeIcon, 'flex');
            }            
        }
    }

    var showDropdown = function() {
        if (resultDropdownToggle && !KTUtil.hasClass(resultDropdown, 'show')) {
            $(resultDropdownToggle).dropdown('toggle');
            $(resultDropdownToggle).dropdown('update'); 
        }
    }

    var hideDropdown = function() {
        if (resultDropdownToggle && KTUtil.hasClass(resultDropdown, 'show')) {
            $(resultDropdownToggle).dropdown('toggle');
        }
    }

    var processSearch = function() {
        if (hasResult && query === input.value) {  
            hideProgress();
            KTUtil.addClass(target, resultClass);
            showDropdown();
            KTUtil.scrollUpdate(resultWrapper);

            return;
        }

        query = input.value;

        KTUtil.removeClass(target, resultClass);
        showProgress();
        hideDropdown();
        
        setTimeout(function() {
            $.ajax({
                url: 'https://keenthemes.com/keen/themes/themes/keen/dist/preview/inc/api/quick_search.php',
                data: {
                    query: query
                },
                dataType: 'html',
                success: function(res) {
                    hasResult = true;
                    hideProgress();
                    KTUtil.addClass(target, resultClass);
                    KTUtil.setHTML(resultWrapper, res);
                    showDropdown();
                    KTUtil.scrollUpdate(resultWrapper);
                },
                error: function(res) {
                    hasResult = false;
                    hideProgress();
                    KTUtil.addClass(target, resultClass);
                    KTUtil.setHTML(resultWrapper, '<span class="kt-quick-search__message">Connection error. Pleae try again later.</div>');
                    showDropdown();
                    KTUtil.scrollUpdate(resultWrapper);
                }
            });
        }, 1000);       
    }

    var handleCancel = function(e) {
        input.value = '';
        query = '';
        hasResult = false;
        KTUtil.hide(closeIcon);
        KTUtil.removeClass(target, resultClass);
        hideDropdown();
    }

    var handleSearch = function() {
        if (input.value.length < minLength) {
            hideProgress();
            hideDropdown();

            return;
        }

        if (isProcessing == true) {
            return;
        }

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(function() {
            processSearch();
        }, requestTimeout);     
    }

    return {     
        init: function(element) { 
            // Init
            target = element;
            form = KTUtil.find(target, '.kt-quick-search__form');
            input = KTUtil.find(target, '.kt-quick-search__input');
            closeIcon = KTUtil.find(target, '.kt-quick-search__close');
            resultWrapper = KTUtil.find(target, '.kt-quick-search__wrapper');
            resultDropdown = KTUtil.find(target, '.dropdown-menu'); 
            resultDropdownToggle = KTUtil.find(target, '[data-toggle="dropdown"]');
            inputGroup = KTUtil.find(target, '.input-group');           

            // Attach input keyup handler
            KTUtil.addEvent(input, 'keyup', handleSearch);
            KTUtil.addEvent(input, 'focus', handleSearch);

            // Prevent enter click
            form.onkeypress = function(e) {
                var key = e.charCode || e.keyCode || 0;     
                if (key == 13) {
                    e.preventDefault();
                }
            }
           
            KTUtil.addEvent(closeIcon, 'click', handleCancel);     
        }
    };
};

var KTQuickSearchMobile = KTQuickSearch;

// Init on page load completed
KTUtil.ready(function() {
    if (KTUtil.get('kt_quick_search_dropdown')) {
        KTQuickSearch().init(KTUtil.get('kt_quick_search_dropdown'));
    }

    if (KTUtil.get('kt_quick_search_inline')) {
        KTQuickSearchMobile().init(KTUtil.get('kt_quick_search_inline'));
    }

    if (KTUtil.get('kt_quick_search_offcanvas')) {
        KTQuickSearchMobile().init(KTUtil.get('kt_quick_search_offcanvas'));
    }
});