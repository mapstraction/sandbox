// Anonymous function, keep the global namespace squeeky clean..
(function() {
  if (typeof window.console == 'undefined') {
    window.console = {};
    window.console.log = function(message) {};
  }

  var fileTypes = {
    'js' : 'javascript',
    'html' : 'html',
    'php' : 'php'
  };

  // Todo - move this out to a template - ajturner
  var provider_scripts = {
      "google": '<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key={{ key }}" type="text/javascript"></script>',
      "openlayers": '<script src="http://openlayers.org/api/OpenLayers.js"></script>',
      "microsoft":'<script src="http://dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6"></script>',
      "yahoo":'<script type="text/javascript" src="http://api.maps.yahoo.com/ajaxymap?v=3.0&appid=MapstractionDemo"></script>',
      "multimap":'<script type="text/javascript," src="http://developer.multimap.com/API/maps/1.2/OA070606486554191"></script>',
      "map24":'  <script type="text/javascript" language="javascript" src="http://api.maptp.map24.com/ajax?appkey=FJXe1b9e7b896f8cf70534ee0c69ecbfX16"></script>',
      "mapquest": '<script   src=" http://btilelog.beta.mapquest.com/tilelog/transaction?transaction=script&key=mjtd%7Clu6t210anh%2Crn%3Do5-labwu&itk=true&v=5.3.0_RC5&ipkg=controls1" type="text/javascript"></script>',
      "freeearth":'<script type="text/javascript" src="http://freeearth.poly9.com/api.js"></script>',
      "openspace":'<script src="http://openspace.ordnancesurvey.co.uk/osmapapi/openspace.js?key=533DAFA505CD4AEAE0405F0AF1602D02" type="text/javascript"></script>',
      "viamichelin":'<script src="http://api.viamichelin.com/apijs/js/api.js?VMApiKey=JSGP20080826150159323104007508" type="text/javascript"></script><script type="text/javascript">VMAPI.registerKey("JSGP20080826150159323104007508"),</script>'
    };

    
  function _cel(name) {
    return document.createElement(name);
  }

  var savedByTheGoogAPIKey = "ABQIAAAA1XbMiDxx_BTCY2_FkPh06RRaGTYH6UMl8mADNa0YKuWNNa8VNxQEerTAUcfkyrr6OwBovxn7TDAH5Q";

  function InteractiveSample(){
    this.categories = [];
    this.subCategories = [];
    this.codeTitles = [];
    this.selectCode = null;
    this.codeDiv = null;
    this.codeLIs = [];
    this.currentCode = new Object();
    this.curI = '';
    this.codeEditorDivs;
    this.currentEditor;
    this.temporaryBoilerplate;

    this.uiEffects = new Object();
    this.runBox = new Object();
    this.autoCompleteData = [];
    this.insertJavascriptRegex;
  };

  InteractiveSample.prototype.addDeleteIcon = function(li, id) {
//    var imgTD = _cel('td');
    var deleteCodeImg = _cel('img');
    deleteCodeImg.src = 'images/trash.gif';
    deleteCodeImg.style.cursor = 'pointer';
    deleteCodeImg.style.marginLeft = '6px';
    $(deleteCodeImg).bind('click', this.deleteCustomExample(id));
    li.appendChild(deleteCodeImg);
  };

  InteractiveSample.prototype.addShowHideClicks = function() {
    var i;
    for (i = 0; i < this.categories.length; i++) {
      var cat = this.categories[i];
      var catTitle = cat.childNodes[0];
      $(catTitle).bind('click', this.toggleShowHideSubCategories(cat));
    }

    for (i = 0; i < this.subCategories.length; i++) {
      var subCatTitle = this.subCategories[i].childNodes[0];
      $(subCatTitle).bind('click', this.toggleShowHideLIs(subCatTitle));
    };
  };

  InteractiveSample.prototype.createCategories = function() {
    // codeArray is from ajax_apis_samples.js
    this.selectCode = $('#selectCode').get(0);
    for (var i=0; i < codeArray.length; i++) {
      var category = codeArray[i].category;
      var container = null;
      var subCategory = null;
      var categoryDiv = null;
      var subCategoryDiv = null;
      var img, link;
      if (category.indexOf('-') != -1) {
        // that means that this category is a subcategorys
        var categorySplit = category.split('-');
        category = categorySplit[0];
        subCategory = categorySplit[1];
      }
      categoryDiv = document.getElementById(category);
      if (categoryDiv == null) {
        categoryDiv = _cel('span');
        categoryDiv.className = 'category categoryClosed';
        categoryDiv.id = category;
        var catName = _cel('span');
        catName.className = 'categoryTitle';
        img = _cel('img');
        img.className = 'expand';
        img.src = 'images/cleardot.png';

        catName.appendChild(img);
        catName.innerHTML += category;
        categoryDiv.appendChild(catName);
        this.selectCode.appendChild(categoryDiv);

        this.categories.push(categoryDiv);
      }

      if (subCategory) {
        subCategoryDiv = document.createElement('div');
        var subCatName = _cel('span');
        subCatName.className = 'subCategoryTitle';

        img = _cel('img');
        img.className = 'collapse';
        img.src = 'images/cleardot.png';

        subCatName.appendChild(img);
        subCatName.innerHTML += subCategory;

        subCategoryDiv.appendChild(subCatName);
        categoryDiv.appendChild(subCategoryDiv);
      }

      container = subCategoryDiv || categoryDiv;

      var ul = _cel('ul');
      ul.className = 'categoryItems';

      container.appendChild(ul);

      for (var j=0; j < codeArray[i].samples.length; j++) {
        var item = codeArray[i].samples[j];
        var li = _cel('li');
        var textNode = document.createElement('span');
        textNode.innerHTML = item.sampleName;
        textNode.style.cursor = 'pointer';
        $(textNode).bind('click', this.showSample(item.sampleName));
        li.appendChild(textNode);
        if (category == 'Saved Code') {
          this.addDeleteIcon(li, codeArray[i].samples[j].id);
        }
        var tags = ' <sup>(' + ((category) || '') + ((subCategory) ? ', ' + subCategory : '');
        tags += (item.tags) ? ', ' + item.tags : '';
        tags += ')<\/sup>';
        this.autoCompleteData.push(item.sampleName + tags);
        codeArray[i].samples[j]['li'] = li;

        if (i == 0 && j == 0 && window.location.hash.length <= 1) {
          this.showSample(item.sampleName, true)();
          this.hideAllCategoriesExcept(categoryDiv);          
        }

        if (window.location.hash.length > 0) {
          var hashName = this.nameToHashName(item.sampleName);
          if (window.location.hash.substring(1) == hashName) {
            this.showSample(item.sampleName)();
            this.hideAllCategoriesExcept(categoryDiv);
          }
        }

        if (window.expandedCategory && category.replace(' ', '').toLowerCase().indexOf(window.expandedCategory) != -1 && window.location.hash.length <= 1) {
          this.hideAllCategoriesExcept(categoryDiv);
          if (j == 0) {
            this.showSample(item.sampleName)();            
          }
        }

        this.codeLIs.push(li);
        ul.appendChild(li);
      }

      if (container != categoryDiv) {
        this.subCategories.push(container);
      }
    }
  };

  InteractiveSample.prototype.changeCodeMirror = function(content) {
    try {
      this.currentEditor.setCode(content);
      $(this.currentEditor.frame.contentWindow.window.document.body).scrollTop(10);
      $(this.currentEditor.frame.contentWindow.window.document.body).scrollTop(0);
    } catch (e) {
      window.console.log('changeCodeMirror failed!!');
    }
  };

  InteractiveSample.prototype.changeSamplesBoilerplateTo = function(sampleFileName, newBoilerplate) {
    for (var i=0; i < codeArray.length; i++) {
      for (var j=0; j < codeArray[i].samples.length; j++) {
        var sampleObj = codeArray[i].samples[j];
        for (var k=0; k < sampleObj.files.length; k++) {
          var file = sampleObj.files[k];
          if (sampleFileName == file) {
            this.temporaryBoilerplate = codeArray[i].samples[j].boilerplateLoc;
            codeArray[i].samples[j].boilerplateLoc = newBoilerplate;
          }
        }
      }
    }
  };

  InteractiveSample.prototype.confirmLogin = function(url, opt_mustLogin) {
    var confirmLeave;
    if (opt_mustLogin) {
      confirmLeave = confirm('You must login to save.  Logging in will lose any edited code.');
    } else {
      confirmLeave = confirm('Logging in will lose any edited code.');
    }
    url += "%23" + window.location.hash.substring(1);
    if (confirmLeave) window.location = url;
  };

  InteractiveSample.prototype.deleteCustomExample = function(id) {
    var me = this;
    return function() {
      var confirmDelete = confirm('Are you sure you want to delete this example?');
      if (confirmDelete) {
        var redirect = 'delete?id=' + id;
        var cookie = me.getCookie('dev_appserver_login');
        cookie = (cookie) ? cookie.replace(/\"/g, '') : me.getCookie('ACSID');
        cookie = (cookie) ? cookie.substring(6, 20) : null;
        redirect += ((curAPITypes) ? '&type=' + curAPITypes : '');
        redirect += (cookie) ? '&sc=' + 'safe' + cookie : '';
        window.location = redirect;
      }
    };
  };

  InteractiveSample.prototype.toggleEditHTML = function(data) {
    if (is.currentEditor == window.mixedEditor) {
      if (confirm("This will take you back to the original Javascript.  You will lose any changes.")) {
        var curFilename = is.getCurFilename() || null;
        var sampleObj = is.sampleFileNameToObject(curFilename);
        is.showSample(sampleObj.sampleName)();
      }
      return;
    }

    if (!data) {
      this.getFullSrc(this.toggleEditHTML, savedByTheGoogAPIKey);
      return;
    }
    // if we get to this line, we are in the callback of the above function call
    // our context is window at that point, not InteractiveSample
    var me = window.is;
    me.useMixedEditor();
    me.changeCodeMirror(data);
    var curFilename = me.getCurFilename();
    me.changeSamplesBoilerplateTo(curFilename, '');
  };

  InteractiveSample.prototype.findNumSpacesToIndentCode = function(data) {
    var tryString = this.insertJavascriptRegex.exec(data)[0];
    var i = '';
    while(tryString.indexOf(' ') == 0) {
      i += ' ';
      tryString = tryString.substring(1);
    }

    return i;
  };

  InteractiveSample.prototype.getCode = function() {
    return this.currentEditor.getCode();
  };

  InteractiveSample.prototype.getCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  InteractiveSample.prototype.getCurFilename = function() {
    return this.curI;
  };

  InteractiveSample.prototype.getFullSrc = function(callbackFunc, opt_APIKey, jscode) {
    var curFilename = this.getCurFilename();
    var sampleObj = this.sampleFileNameToObject(curFilename);
    var url = sampleObj.boilerplateLoc;
    var providers_req = sampleObj.providers.split(","); // Providers to include the JS code for
    var me = this;
    var code = jscode || this.getCode();
    if (url == '') {
      callbackFunc(code);
      return;
    }
    
    // Build in the Providers required script headers
    var providers = '';
    for (var i = 0; i < providers_req.length; ++i){
        providers += provider_scripts[providers_req];
    }
    $.get(url, function(data, success) {
      if (success) {
        var indentSpaces = me.findNumSpacesToIndentCode(data);
        code = me.indentCodeWithTheseSpaces(code, indentSpaces);
        data = me.insertJavascript(data, code);

        var key = opt_APIKey || "<<INSERT KEY>>";
        data = data.replace(/[ ]*PROVIDER_SCRIPTS_HERE/, providers);
        data = data.replace(/PROVIDER/, providers_req[0]);
        data = data.replace(/key=.*"/, "key=" + key + "\"");
        // data += '<div id="debugBar" class="debugBarRunning"><div class="debugBarTop"></div><div class="debugBarTile"><div class="debugBarContent"><a href="#" class="debugContinuePaused" onclick="window.setContinue(true);return false;"><img border=0 src="/images/debug-btn-continue.png"></a><img class="debugContinueRunning" src="/images/debug-btn-continue.png"><a href="#" onclick="window.toggleFirebug();return false;"><img border=0 src="/images/debug-btn-firebug-lite.png"></a><span id="debugBarText">Complete.</span></div></div><div class="debugBarBottom"></div></div>';
        callbackFunc(data);
      }
    });
  };

  InteractiveSample.prototype.getSafetyToken = function() {
    var cookie = this.getCookie('dev_appserver_login');
    cookie = (cookie) ? cookie.replace(/\"/g, '') : this.getCookie('ACSID');
    cookie = (cookie) ? cookie.substring(6, 20) : null;
    return 'safe' + cookie;
  };

  InteractiveSample.prototype.hideAllCategoriesExcept = function(category) {
    for (var i=0; i < this.categories.length; i++) {
      var curCategory = this.categories[i];
      var collapseImg = curCategory.childNodes[0].childNodes[0];
      if (curCategory != category) {
        curCategory.className = 'category categoryClosed';
        collapseImg.className = 'expand';
      } else {
        curCategory.className = 'category categoryOpen';
        collapseImg.className = 'collapse';
      }
    };
  };

  InteractiveSample.prototype.indentCodeWithTheseSpaces = function(code, indentSpaces) {
    code = indentSpaces.concat(code);
    var newLine = code.indexOf('\n');
    while (newLine != -1) {
      var start = code.slice(0, newLine);
      var end = code.slice(newLine+1);
      end = ('\n' + indentSpaces).concat(end);
      code = start.concat(end);
      newLine = code.indexOf('\n', newLine + 1);
    }

    return code;
  };

  InteractiveSample.prototype.init = function(codeDiv) {
    this.currentEditor = window.jsEditor;
    this.codeEditorFrames = {
      'editJS':document.getElementById('editJS'),
      'editMixed':document.getElementById('editMixed')
    };
    this.insertJavascriptRegex = /[ ]*INSERT_JAVASCRIPT_HERE/;
    this.ie = ($.browser.msie);
    this.ie6 = (this.ie && $.browser.version < 7);
    this.runBox = new RunBox();
    this.runBox.init(this, !$.browser.msie);
    this.codeDiv = codeDiv;
    this.createCategories();
    this.addShowHideClicks();
    this.uiEffects = new UIEffects();
    this.uiEffects.init(this);
    if (window.logoutUrl) {
      this.putSafetyCookieInForms();
    }
  };

  InteractiveSample.prototype.insertJavascript = function(data, code) {
    data = data.replace(this.insertJavascriptRegex, code);
    return data;
  };

  InteractiveSample.prototype.linkCode = function() {
    var apiKey = savedByTheGoogAPIKey;
    this.getFullSrc(this.sendCodeToServer, apiKey);
  };

  InteractiveSample.prototype.loadCode = function(filename, opt_changeCodeMirror) {
    // If the code is in the currentCode buffer, then grab it there
    // otherwise, load it via XHR
    // If opt_changeCodeMirror is specified, load it into the window
    // Get filetype
    var filenameSplit = filename.split('.');
    var extension = filenameSplit[filenameSplit.length - 1];
    var fileType = fileTypes[extension.toLowerCase()];
    this.loadRemotely(filename, fileType, opt_changeCodeMirror);
  };

  InteractiveSample.prototype.loadRemotely = function(filename, fileType, opt_changeCodeMirror) {
    var me = this;
    if (filename.indexOf('?id=') != -1) {
      filename += '&sc=' + this.getSafetyToken();
    }
    $.get(filename, function(data) {
      if (opt_changeCodeMirror) {
        me.changeCodeMirror(data);
      }
    });
  };

  InteractiveSample.prototype.nameToHashName = function(name) {
    var hashName = name.toLowerCase();
    hashName = hashName.replace(/ /g, '_');
    return hashName;
  };

  InteractiveSample.prototype.putSafetyCookieInForms = function() {
    var safetyToken = this.getSafetyToken();
    if (safetyToken) {
      $('#safetyCookie').attr('value', safetyToken);
    }
  };

  InteractiveSample.prototype.sampleFileNameToObject = function(sampleFileName) {
    for (var i=0; i < codeArray.length; i++) {
      for (var j=0; j < codeArray[i].samples.length; j++) {
        var sampleObj = codeArray[i].samples[j];
        for (var k=0; k < sampleObj.files.length; k++) {
          var file = sampleObj.files[k];
          if (sampleFileName == file) {
            sampleObj['category'] = codeArray[i].category;
            sampleObj['categoryDocsUrl'] = codeArray[i].docsUrl || null;
            return sampleObj;
          }
        }
      }
    }
  };

  InteractiveSample.prototype.sampleNameToObject = function(sampleName) {
    for (var i=0; i < codeArray.length; i++) {
      for (var j=0; j < codeArray[i].samples.length; j++) {
        var sampleObj = codeArray[i].samples[j];
        if (sampleObj.sampleName == sampleName) {
          sampleObj['category'] = codeArray[i].category;
          sampleObj['categoryDocsUrl'] = codeArray[i].docsUrl || null;
          return sampleObj;
        }
      }
    }
  };

  InteractiveSample.prototype.saveCode = function() {
    var curFilename = this.getCurFilename();
    var sampleObj = this.sampleFileNameToObject(curFilename);
    this.putSafetyCookieInForms();
    if (sampleObj.category == 'Saved Code') {
      var confirmOverwrite = confirm('Are you sure you want to overwrite this code?');
      if (confirmOverwrite) {
        // HUGE HACK.  In IE, an input element can't store a newline character,
        // or at least I can't find out how.  So they all get lost during the send
        // so on the server side i will parse out NEWLINE!!! and add in the correct
        // code :)
        var code = this.getCode();
        code = code.replace(/\n/g, 'NEWLINE!!!');
        $('#jscodeSaveForm').attr('value', code);
        $('#boilerplateLoc').attr('value', sampleObj.boilerplateLoc);
        $('#idSaveForm').attr('value', sampleObj.id);
        $('#saveForm').submit();
      }
    } else {
     this.uiEffects.showSaveForm();
    }
  };

  InteractiveSample.prototype.sendCodeToServer = function(code) {
    code = code.replace(/\n/g, 'NEWLINE!!!');
    $('#codeHolder').attr('value', code);
    $('#linkCodeForm').get(0).submit();
  };

  InteractiveSample.prototype.setDemoTitle = function(sampleObj) {
    var sampleName = sampleObj.sampleName;
    var catSplit = sampleObj.category.split('-');
    var title = $('<div>' + (catSplit[1] ? catSplit[1] : catSplit[0]) + ' > ' + sampleName + '</div>');
    if (sampleObj.docsUrl || sampleObj.categoryDocsUrl) {
      $('#docsLink').attr('href', (sampleObj.docsUrl || sampleObj.categoryDocsUrl)).css('display', 'block');
      // 
      // var docLink = $('&nbsp;<a href="' +
      //                 (sampleObj.docsUrl || sampleObj.categoryDocsUrl) +
      //                 '" target="_blank" class="docsLink">docs</a>');
      // title.append(docLink);
    } else {
      $('#docsLink').css('display', 'none');
    }

    $('#demoTitle').html(title);
    $('#saveSampleName').attr('value', 'Custom ' + sampleName);
    $('#tagsSaveForm').attr('value', sampleObj.tags);
  };

  InteractiveSample.prototype.showSample = function(sampleName, def) {
    me = this;
    return function() {
      var curFilename = me.getCurFilename() || null;
      if (curFilename) {
        me.changeSamplesBoilerplateTo(curFilename, me.temporaryBoilerplate);
      }
      var sampleObj = me.sampleNameToObject(sampleName);
      var files = sampleObj.files;
      var thisLI = sampleObj.li;
      var catSplit = sampleObj.category.split('-');
      var categoryName = catSplit[0];

      var codeLIs = me.codeLIs;
      var setAsJSEditor = true;
      me.temporaryBoilerplate = sampleObj.boilerplateLoc;
      if (sampleObj.boilerplateLoc != '') {
        me.useJsEditor();
      } else {
        me.useMixedEditor();
      }
      me.currentEditor.clearBreakPoints();
      me.runBox.iFrameLoaded = false;
      me.setDemoTitle(sampleObj);
      var i;
      for (i = 0; i < codeLIs.length; i++) {
        codeLIs[i].className = '';
      }

      // For linking purposes
      if (!def) {
        window.location.hash = me.nameToHashName(sampleName);
      }

      // Make code selected designate this as selected
      thisLI.className = 'selected';

      me.currentCode = new Object();


      // add file names at top
      // var tab_bar = $('#tab_bar');
      // tab_bar.innerHTML = '';
      for (i = 0; i < files.length; i++) {
        var file = files[i];

        var tabClass = 'lb';
        if (i == 0) {
          tabClass = 'db';
          me.loadCode(file, true);
        } else {
          me.loadCode(file, false);
        }


        // var containerDiv = _cel('div');
        // containerDiv.className = 'roundedcornr_box';
        // $(containerDiv).bind('click', me.changeTab(file));
        //
        // var html = '<div class="' + tabClass + '_top" ><div><\/div><\/div>';
        // html += '<div class="' + tabClass + '_roundedcornr_content" >';
        // html += file;
        // html += '<\/div>';
        //
        // containerDiv.innerHTML = html;

      // tab_bar.appendChild(containerDiv);
      }

    // me.loadCode(files[0], textArea);
      me.hideAllCategoriesExcept(document.getElementById(categoryName));
      me.curI = files[0];
      try {
        if (window.pageTracker) {
          window.pageTracker._trackPageview();
        }
      } catch(e) {}
    };
  };

  InteractiveSample.prototype.toggleShowHideLIs = function(category) {
    return function() {
      var ul = category.nextSibling;
      // if the sibling is an anchor, that means it's the docsLink anchor, so grab the one after.
      if (ul.nodeName.toLowerCase() == 'a') ul = ul.nextSibling;
      var el = category.childNodes[0];
      if (el.className == 'expand')
        el.className = 'collapse';
      else
        el.className = 'expand';

      if (ul.style.display == 'none') {
        ul.style.display = 'block';
      } else {
        ul.style.display = 'none';
      }
    };
  };

  InteractiveSample.prototype.toggleShowHideSubCategories = function(category) {
    return function() {
      // Change the collapse img to a + or a -
      var collapseImg = category.childNodes[0].childNodes[0];
      if (collapseImg.className == 'expand') {
        collapseImg.className = 'collapse';
        category.className = 'category categoryOpen';
      } else {
        collapseImg.className = 'expand';
        category.className = 'category categoryClosed';
      }
    };
  };

  InteractiveSample.prototype.useJsEditor = function() {
    this.codeEditorFrames.editJS.style.display = 'inline';
    // this.codeEditorFrames.editMixed.style.display = 'none';
    this.currentEditor = window.jsEditor;
  };

  InteractiveSample.prototype.useMixedEditor = function() {
  // this.codeEditorFrames.editMixed.style.display = 'inline';
    this.codeEditorFrames.editJS.style.display = 'none';
    this.currentEditor = window.mixedEditor;
  };


  /*
   * UIEffects sets up all of the jQuery UI stuff for draggable etc.
  */
  function UIEffects() {
    this.is = new Object();
    this.numHTMLEditors;
    this.uiEls;
    this.dropdownTimer;
    this.draggingMid;
  }

  UIEffects.prototype.init = function(is) {
    this.is = is;
    this.numHTMLEditors = 0;

    if (this.is.ie6) {
      this.fixPNGs();
    }

    this.initAutoComplete();
    this.setCodeMenuButtonClicks();
    this.setMenuScrollHeight();
    this.initDraggables();
  };

  UIEffects.prototype.fixPNGs = function() {
    $.getScript('js/jquery.pngFix.pack.js', function() {
      $(document).pngFix();
    });
  }

  UIEffects.prototype.setCodeMenuButtonClicks = function() {
    var me = this;
    var codeMenuButtonContainer = $('#codeMenuButtonContainer');
    var codeMenuDropdown = $('#codeMenuDropdown');

    $('#dropdownButton').bind('mousedown', function() {
      me.toggleDropdown('codeMenuDropdown');
      return false;
    });

    codeMenuButtonContainer.bind('mouseout', function() {
      me.dropdownTimer = window.setTimeout("window.is.uiEffects.toggleDropdown('codeMenuDropdown', true);", 100);
    });

    codeMenuButtonContainer.bind('mouseover', function() {
      if (me.dropdownTimer) {
        window.clearTimeout(me.dropdownTimer);
      }
    });

    codeMenuDropdown.bind('mouseout', function() {
      me.dropdownTimer = window.setTimeout("window.is.uiEffects.toggleDropdown('codeMenuDropdown', true);", 100);
    });

    codeMenuDropdown.bind('mouseover', function() {
      if (me.dropdownTimer) {
        window.clearTimeout(me.dropdownTimer);
      }
    });
  };

  UIEffects.prototype.setMenuScrollHeight = function() {
    var selC = $('#selectCode');
    selC.scrollTop(0);
    var thisLI = $('li.selected');
    var sC = ($(thisLI).position().top - selC.position().top) - (selC.height() / 2);
    if (sC > 0) {
      selC.scrollTop(sC);
    }
  }

  UIEffects.prototype.closeSaveForm = function() {
    $('#grayOverlay').css('display', 'none');
    $('#saveDiv').css('display', 'none');
  };

  UIEffects.prototype.createAutoComplete = function() {
    $("#search").autocomplete({
      data: is.autoCompleteData,
      matchContains: true,
      width: 'auto',
      scroll: false,
      scrollHeight: '400px',
      formatResult : function(result) {
        result = result[0].split(' <sup')[0];
        return result;
      },
      formatItem : function() {
        if (arguments.length > 3) {
          if (!$('.ui-autocomplete-results')[0].getAttribute('id')) {
            $('.ui-autocomplete-results')[0].id = 'acDiv';
          }
        }
        return arguments[0][0];
      }
    });
  };

  UIEffects.prototype.setAutoCompleteClicks = function() {
    $("#search").autocomplete('result', function(a, b, sampleName) {
      var sample = sampleName.split(' <sup>')[0];
      // This fixes a CRAZY bug in CodeMirror where in IE, it breaks if you
      // have the focus in another input element
      document.getElementById('edit').focus();
      window.is.showSample(sample)();
      return sample;
    });
  };

  UIEffects.prototype.createAutoCompleteDropShadow = function() {
    $('#search').bind('keyup', function() {
      var acDiv = $('#acDiv');
      try {
        if (acDiv.position() && acDiv.css('display') != 'none' && $('#acShadowDiv').length == 0) {
          $(acDiv).append($('<div id="acShadowDiv" class="">&nbsp<\/div>'));
        } else {}
      } catch(e) {}
    });
  };

  UIEffects.prototype.initAutoComplete = function() {
    $('#searchInputContainer').show();
    this.createAutoComplete();
    this.setAutoCompleteClicks();
    if (!this.is.ie) {
      this.createAutoCompleteDropShadow();
    }
  };

  UIEffects.prototype.resizeAndShowSaveForm = function() {
    var windowWidth = $(document.body).width();
    var windowHeight = $(window).height() + 15;
    var newSaveDivLeft = (windowWidth/2) - 200;
    var newSaveDivTop = (windowHeight/2) - 150;
    $('#grayOverlay')
        .css('width', windowWidth + 'px')
        .css('height', windowHeight + 'px')
        .css('display', 'inline');
    $('#saveDiv')
        .css('left', newSaveDivLeft + 'px')
        .css('top', newSaveDivTop + 'px')
        .css('display', 'block');
  }

  UIEffects.prototype.showSaveForm = function() {
    this.resizeAndShowSaveForm();
    $(window).resize(window.is.uiEffects.resizeAndShowSaveForm);
    var curSampleObj = this.is.sampleFileNameToObject(this.is.getCurFilename());
    var boilerplateLoc = curSampleObj.boilerplateLoc;
    $('#boilerplateLoc').attr('value', boilerplateLoc);
    // HUGE HACK.  In IE, an input element can't store a newline character,
    // or at least I can't find out how.  So they all get lost during the send
    // so on the server side i will parse out NEWLINE!!! and add in the correct
    // code :)
    var code = this.is.getCode();
    code = code.replace(/\n/g, 'NEWLINE!!!');
    $('#jscodeSaveForm').attr('value', code);
  };

  UIEffects.prototype.toggleDropdown = function(elID, opt_close) {
    var el = $('#' + elID);
    if (opt_close) {
      el.removeClass('expanded');
      return;
    }

    if (el.hasClass('expanded')) {
      el.removeClass('expanded');
    } else {
      el.addClass('expanded');
    }
  };

  UIEffects.prototype.initDraggables = function() {
    var me = this;
    this.draggingMid = false;
    this.editDiv = $('#edit');
    this.editOffset = this.editDiv.position().top + 9;
    this.draggersMid = $('.draggerMid');
    this.dragsafeDiv = $('#dragsafe');
    this.selectCodeDiv = $('#selectCode');

    this.draggerBot = $('.draggerBot');
    this.draggingBot = false;
    this.runFrame = null;
    this.runFrameOffset = null;

    this.draggersMid
      .attr('unselectable', 'on')
      .css('MozUserSelect', 'none')
      .bind('selectstart.ui', function() { return false; })
      .mousedown(function() {
        me.draggingMid = true;
        $().one('mouseup', function() {
          me.draggingMid = false;
          me.dragsafeDiv.css('top', '-800px').css('left', '-800px');
          if (is.currentEditor == window.jsEditor) {
            var newHeight = $(window.jsEditor.frame).css('height');
            $(window.mixedEditor.frame).css('height', newHeight);
          } else {
            var newHeight = $(window.mixedEditor.frame).css('height');
            $(window.jsEditor.frame).css('height', newHeight);
          }
        });
      });

    this.draggerBot
      .attr('unselectable', 'on')
      .css('MozUserSelect', 'none')
      .bind('selectstart.ui', function() { return false; })
      .mousedown(function() {
        me.runFrame = $('#runFrame');
        me.runFrameOffset = me.runFrame.position().top;

        me.draggingBot = true;
        $().one('mouseup', function() {
          me.draggingBot = false;
          me.dragsafeDiv.css('top', '-800px').css('left', '-800px');
        });
      });

    $().mousemove(function(e) {
      if (me.draggingMid) {
        var newTop = e.clientY - 400;
        var newLeft = e.clientX - 400;
        var newHeight = (e.clientY - me.editOffset+ $().scrollTop()) + 'px';
        me.dragsafeDiv.css('top', newTop + 'px').css('left', newLeft + 'px');
        $(is.currentEditor.frame).css('height', newHeight);
        me.editDiv.css('height', newHeight);
        me.selectCodeDiv.css('height', newHeight);
      }
      if (me.draggingBot) {
        var newTop = e.clientY - 400;
        var newLeft = e.clientX - 400;
        var newHeight = (e.clientY - me.runFrameOffset + $().scrollTop()) + 'px';
        me.dragsafeDiv.css('top', newTop + 'px').css('left', newLeft + 'px');
        me.runFrame.css('height', newHeight);        
      }
    });
  };



  function RunBox() {
    this.outputContainer;
    this.runBoxPoppedOut;
    this.popoutWindow;
    this.is;
    this.runBoxDiv;
    this.popoutRunBoxDiv;
    this.resizable;
    this.iFrameLoaded;
  }

  RunBox.prototype.init = function(is, resizable) {
    this.resizable = resizable;
    this.runBoxDiv = document.getElementById('runbox');
    this.runBoxPoppedOut = false;
    this.outputContainer = $("#outputContainer");
    this.is = is;
  };

  RunBox.prototype.insertDebuggingTools = function(code) {
    // The YUI Compressor is going to munge a function named normally, so we
    // have to make an anonymous function that gets called immediately.
    var anony = (function () {
      var debugMenuCSS = document.createElement('link');
      debugMenuCSS.rel = 'stylesheet';
      debugMenuCSS.href = 'http://www.lisbakken.com/debugStyles.css';
      debugMenuCSS.type = 'text/css';
      debugMenuCSS.media = 'screen';
      debugMenuCSS.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(debugMenuCSS);
      window.doContinue = true;
      window.setContinue = function(doContinue) {
        window.doContinue = doContinue;
        var debugBar = document.getElementById('debugBar');
        var debugText = document.getElementById('debugBarText');
        if (debugBar) {

          if (doContinue) {
            debugBar.className = 'debugBarRunning';
            debugText.innerHTML = 'Complete.';
          } else {
            debugBar.className = 'debugBarPaused';
            debugText.innerHTML = 'Paused (Line:' + window.curBreakLineNum + ')';
          }
        } else {
          window.doContinue = false;
        }
      };
      function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
          window.onload = func;
        }
        else {
          window.onload = function() {
            oldonload();
            func();
          }
        }
      }
      window.toggleFirebug = function(options) {
        if (!window.firebug.env.minimized || (options && options.closeIt)) {
          window.firebug.env.minimized=true;
          window.firebug.el.main.environment.addStyle({ "height":"35px" });
          window.firebug.el.mainiframe.environment.addStyle({ "height":"35px" });
          window.firebug.el.button.maximize.environment.addStyle({ "display":"block" });
          window.firebug.el.button.minimize.environment.addStyle({ "display":"none" });
          window.firebug.win.refreshSize();
        } else {
          window.firebug.env.minimized=false;
          window.firebug.el.button.minimize.environment.addStyle({ "display":"block" });
          window.firebug.el.button.maximize.environment.addStyle({ "display":"none" });
          window.firebug.win.setHeight(firebug.env.height);
        }
      }
      addLoadEvent(function() {
        var debugBar = document.createElement('div');
        debugBar.id = 'debugBar';
        debugBar.className = (window.doContinue) ? "debugBarRunning" : "debugBarPaused";
        debugBar.innerHTML = '<div class="debugBarTop">\n</div>\n<div class="debugBarTile">\n<div class="debugBarContent">\n<a href="#" class="debugContinuePaused" onclick="window.setContinue(true);return false;"><img border=0 src="/images/debug-btn-continue.png"></a>\n<img class="debugContinueRunning" src="/images/debug-btn-continue.png">\n<a href="#" onclick="window.toggleFirebug();return false;"><img border=0 src="/images/debug-btn-firebug-lite.png"></a>\n<span id="debugBarText">\n' + ((window.doContinue) ? "Complete.":"Paused (Line:" + window.curBreakLineNum + ")") + '</span>\n</div>\n</div>\n<div class="debugBarBottom">\n</div>\n';
        window.document.body.appendChild(debugBar);
        if (window.firebug.el && window.firebug.el.main && window.firebug.el.main.environment) {
          window.toggleFirebug();
        }
      });
    });
    var firebugScriptString = '<script type="text/javascript" src="http://savedbythegoog.appspot.com/firebug.js"></script>\n<script type="text/javascript">firebug.env.height = 220;\nfirebug.env.liteFilename = \'firebug.js\';\n';
    if (code.indexOf('<head>') == -1) alert('Sample must have <head> element');
    code = code.replace('<head>', '<head>\n' + firebugScriptString + '(' + anony.toString() + ')();</script>');
    return code;
  }

  RunBox.prototype.insertBreakPoints = function(code, breakPoints) {
    var breakPointsArray = [];
    for(i in breakPoints) {
      if (breakPoints[i] == true) {
        breakPointsArray.push(i);
      }
    }
    
    // If we are breaking inside of a function, make sure to only grab the
    // rest of the function for code.
    function findCodeSelection(code, startIndex) {
      var endBracketLoc = code.indexOf('}', startIndex);
      if (endBracketLoc != -1) {
        endBracketLoc += 1;
        var subCode = code.substring(0, endBracketLoc + 1);
        var doneCount = (subCode.split('}').length - 1) - (subCode.split('{').length - 1);
        if (doneCount == 1) {
          var end = endBracketLoc - 1;
          code = code.substring(0, end)
          return code;
        }
        return findCodeSelection(code, endBracketLoc);
      } else {
        return code; 
      }
    }
    
    function addBreakPointCode(codeToGoIn, lineNum) {
      var bpCode = '\nwindow.curBreakLineNum = ' + lineNum + ';\n';
      bpCode += 'window.setContinue(false);\n';
      bpCode += 'function breakpointAtLine'+lineNum+'() {\n';
      bpCode += 'if (!doContinue) {\n';
      bpCode += 'if (window.scheduledConsoleLogs && window.scheduledConsoleLogs.length > 0) {\n';
      bpCode += 'for (var i =0; i < window.scheduledConsoleLogs.length; i++) {\n';
      bpCode += 'console.log(eval(window.scheduledConsoleLogs[i]));\n';
      bpCode += '}\n';
      bpCode += '}\n';
      bpCode += 'window.scheduledConsoleLogs = [];\n';
      bpCode += 'window.setTimeout(breakpointAtLine'+lineNum+', 100);\n';
      bpCode += '} else {\n';
      bpCode += codeToGoIn + '\n';
      bpCode += '}\n';
      bpCode += '}\n';
      bpCode += 'breakpointAtLine'+lineNum+'();\n';
      return bpCode;
    }
    
    for (var i = breakPointsArray.length - 1; i >= 0; i--){
      // for each one of these, we need to go to that line in the string and insert extra code.
      var breakPointLine = breakPointsArray[i];
      var atLine = 0;
      var indexOfNewline = 0;
      while(atLine + 1 != breakPointLine) {
        indexOfNewline = code.indexOf('\n', indexOfNewline + 1);
        if (indexOfNewline == -1) {
          window.console.log('AddBreakPointCode failed.');
          break;
        } else {
          atLine++;
        }
      }
      var firstPartOfCode = code.substring(0, indexOfNewline);
      var secondPartOfCode = code.substring(indexOfNewline);
      var replaceableCode = findCodeSelection(secondPartOfCode, 0);
      secondPartOfCode = secondPartOfCode.replace(replaceableCode, '');
      replaceableCode = addBreakPointCode(replaceableCode, breakPointLine);
      firstPartOfCode = firstPartOfCode.concat(replaceableCode);
      firstPartOfCode = firstPartOfCode.concat(secondPartOfCode);
      code = firstPartOfCode;
    }

    return code;
  }

  RunBox.prototype.hideOnScreenRun = function() {
    // body...
  };

  RunBox.prototype.createIframe = function(boilerplateLoc) {
    // Because safari is CRAZY.  There is a bug in safari.  Without this statement
    // if you refresh the browser and look at a sample, it won't work.  Upon refresh
    // safari will use the EXACT SAME URL for the iFrame as before the refresh,
    // ignoring that i'm passing in a NEW URL for boilerplateLoc.
    // If you load the iFrame first, THEN set the src, Safari likes it.
    // Lame.
    if ($.browser.safari) {
      var iFrame = $('<iframe id="runFrame" style="height: 450px;" onload="is.runBox.iFrameLoaded = true;"><\/iframe>');
      $(this.runBoxDiv).empty().append(iFrame);
      iFrame = iFrame.get(0);
      iFrame.src = boilerplateLoc;
    } else {
      var iFrame = $('<iframe src="'+boilerplateLoc+'" style="height: 450px;" onload="is.runBox.iFrameLoaded = true;" id="runFrame"><\/iframe>');
      $(this.runBoxDiv).empty().append(iFrame);
    }
  };

  RunBox.prototype.createIframeOrPopout = function(response) {
    var url = 'http://savedbythegoog.appspot.com/retrieve_cache?unique_id=' + response;
    if (!is.runBox.runBoxPoppedOut) {
      window.is.runBox.createIframe(url);
    } else {
      // Run code in the popout window
      var runbox = window.is.runBox.popoutWindow.document.getElementById('runbox');
      runbox.innerHTML = '';
      window.is.runBox.popoutWindow.addIframe(url);
    }
  };

  RunBox.prototype.sendCodeToSavedByTheGoog = function(options) {
    var me = this;
    return function(code) {
      var cacheCodeLoc = location.protocol + '//' + location.host + '/apis/ajax/playground/cacheCode';
      var postVars = {};

      if (options && options.debugMode) {
        code = me.insertDebuggingTools(code);
      }

      postVars.code = code;
      $.post(cacheCodeLoc, postVars, window.is.runBox.createIframeOrPopout);      
    }
  }

  RunBox.prototype.runCode = function(options) {
    if (options && options.defaultSample) {
      var curFilename = this.is.getCurFilename();
      var sampleObj = this.is.sampleFileNameToObject(curFilename);
      if (sampleObj.category != 'Saved Code') {
        var baseUrl = location.protocol + '//' + location.host + location.pathname;
        var jsUrl = baseUrl + sampleObj.files[0];
        jsUrl = encodeURIComponent(jsUrl);
        var bpUrl = baseUrl + sampleObj.boilerplateLoc;
        bpUrl = encodeURIComponent(bpUrl);
        uniqueID = bpUrl + '%7C' + jsUrl + "&defaultSample=true";
        this.createIframeOrPopout(uniqueID);
        return;
      }
    }
    var code = this.is.getCode();
    if (this.is.currentEditor == window.mixedEditor) {
      this.sendCodeToSavedByTheGoog(options)(code);
    } else {
      var apiKey = savedByTheGoogAPIKey;

      if (options && options.debugMode) {
        var breakPoints = this.is.currentEditor.getBreakPoints();
        breakPoints = (breakPoints.length == 0) ? null : breakPoints;
        code = this.insertBreakPoints(code, breakPoints);
      }
      this.is.getFullSrc(this.sendCodeToSavedByTheGoog(options), apiKey, code);
    }
  };

  RunBox.prototype.changeToPopout = function() {
    this.runBoxPoppedOut = true;
    $(this.outputContainer).hide();
    this.popoutWindow = window.open('popout.html','popout', 'left=20,top=20,width=600,height=500,toolbar=1,resizable=1');
  };

  RunBox.prototype.changeToInline = function() {
    this.runBoxPoppedOut = false;
    $(this.outputContainer).show();
    this.runCode();
  };


  // Create and export the interactive sample instance to the global.
  window.is = new InteractiveSample();
})();

function setBgColorWhite() {
  this.style.backgroundColor = 'white';
}

function setBgColorBlue() {
  this.style.backgroundColor = '#E5ECF9';
}
