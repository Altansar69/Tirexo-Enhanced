// ==UserScript==
// @license GNU GPLv3
// @name         Tirexo Enhanced
// @namespace    Altansar
// @version      0.9
// @description  Enhanced your Tirexo experience
// @author       Altansar
// @match        *://www.tirexo.work/*
// @match        *://www2.tirexo.work/*
// @match        *://www.tirexo.al/*
// @grant        none
// @homepageURL  https://github.com/Altansar69/Tirexo-Enhanced
// ==/UserScript==

/*Credits:
Thanks to Royalgamer06 and SubZeroPL for their script for the rin in which i based myself */

/* Version
0.1 -> Colors for Tag
0.2 -> Size for Tag
0.3 -> Title W.I.P
0.4 -> Add Season to Tag
0.5 -> Title Improve
0.6 -> Hide Bad Quality
0.7 -> You can easily change options of this script
0.8 -> Hide Info Box
0.9 -> Title Improve + redirection fake website to the real */

/* To add
-> add search for vfq
-> delete the 90 days message (private message)
-> comments
-> redirect fake site to the real
-> options configurable from a button on the site
-> infinite scrolling
*/


let options = {
    "custom_tags": true,
    "custom_titles": true,
    "hide_bad_quality": true,
    "hide_info_box": true,
    "redirect_fake_site" : true,
};

//hexcodes: https://htmlcolorcodes.com/
let color ={
    //Quality
    "other_quality": "#582900",
    "very_low_quality": "#BF0000",
    "low_quality": "#BF4600",
    "medium_quality" : "#BF9F00",
    "high_quality" : "#00BF00",
    "very_high_quality" : "#5A4BBC",
    //Language
    "french_language" : "#bc39e6",
    "vo_language" : "#e83e8c",
    "multi_language" : "#D66E49",
    "other_language" : "#6c757d",
};

let size ={
  "quality" : "1.1",
  "language" : "1.0",
  "season" : "1.0",
};

let hide = {
    //Quality
    "other_quality": false,
    "very_low_quality": true,
    "low_quality": true,
    "medium_quality": false,
    "high_quality": false,
    "very_high_quality": false,
    //Language
    "vo_language":false, //Vo is VO + VOSTFR
    "french_language":false, //French is French + Truefrench + VFSTFR + vfq
    "multi_language":false,
    "other_language":false,
};

redirectFakeSite();
hideInfoBox();
hideBadQuality();
tagify();
setupPageTitle();

    function tagify() {
    if (options.custom_tags) {
        $(".qualite, .langue, .saison").each(function () {
            const titleElem = this;
             const tags = $(titleElem).text().match(/(.)+/g);
            if (tags) {
                tags.forEach(function (tag) {
                    const color = colorize(tag);
                    const size = sizeTag(tag);
                    titleElem.innerHTML = titleElem.innerHTML.replace(tag, "<span style='color:" + color + ";'></span><span style='color:" + color + ";font-size: " + size + "em;'>" + tag.replace(/\[|\]/g, "") + "</span><span style='color:" + color + ";'></span>");
                });
            }
        });
    }
}

function sizeTag(str) {
    //Quality
    if (str=="ULTRA HD (x265)"||str=="Ultra HDLight (x265)"||str=="Blu-Ray 720p"||str=="Blu-Ray 1080p"||str=="Blu-Ray 3D"||str=="HD 720p"||str=="HDLight 720p"||str=="HDLight 1080p"||str=="HD 1080p"||str=="WEB-DL 720p"||str=="WEB-DL 1080p"||str=="REMUX"||str=="HDTV 720p"||str=="HDTV 1080p"||str== "DVDRIP"||str=="BDRIP"||str=="BRRIP"||str=="Webrip"||str=="HDTV"||str=="HDRip"||str=="TVrip"||str=="Web-DL"||str=="DVDRIP MKV"||str=="DVD-R"||str=="Full-DVD"||str == "DVDSCR"||str=="BRRIP LD"||str=="BDRIP LD"||str=="DVDRIP LD"||str == "TS"||str == "CAM"||str == "R5"||str == "R6"||str == "DVDSCR MD"||str == "DVDSCR LD"||str == "R5 MD"||str == "TS MD"||str == "TS LD"||str=="CAM MD"||str=="HDCAM"||str=="TC"||str=="DVDRIP MD"||str=="BDRIP MD"||str=="BRRIP MD"||str=="HDRIP MD"||str== "ARCHIVE"||str=="EXE"||str=="MP3"||str=="FLAC"||str=="M4A"||str=="PDF"||str=="Autre"||str=="CBR"||str=="CBZ"||str=="IPA"||str=="IMG"||str=="ISO"||str=="epub"||str=="PKG") {
        return size.quality;
    }
    //Language
    else if (str== " (French)"||str==" (TrueFrench)"||str==" (VFSTFR)"||str==" (VFQ)"||str==" (VOSTFR)"||str ==" (VO)"||str ==" (MULTI)"||str ==" (inconnue)"){
        return size.language;
    }
    //Season
    else if (str.match(/Saison (.)+/g)){
        return size.eason;
    }
}

function colorize(str) {
    //
    // Quality
    //
    //Very High Quality 4k UHD (purple)
    if (str=="ULTRA HD (x265)"||str=="Ultra HDLight (x265)"){
        return color.very_high_quality;
    }
    //High Quality (green)
    if (str=="Blu-Ray 720p"||str=="Blu-Ray 1080p"||str=="Blu-Ray 3D"||str=="HD 720p"||str=="HDLight 720p"||str=="HDLight 1080p"||str=="HD 1080p"||str=="WEB-DL 720p"||str=="WEB-DL 1080p"||str=="REMUX"||str=="HDTV 720p"||str=="HDTV 1080p") {
        return color.high_quality;
    }
    // Medium Quality (yellow)
    if (str== "DVDRIP"||str=="BDRIP"||str=="BRRIP"||str=="Webrip"||str=="HDTV"||str=="HDRip"||str=="TVrip"||str=="Web-DL"||str=="DVDRIP MKV"||str=="DVD-R"||str=="Full-DVD") {
        return color.medium_quality;
    }
    // Low Quality (orange)
    if (str == "DVDSCR"||str=="BRRIP LD"||str=="BDRIP LD"||str=="DVDRIP LD"){
        return color.low_quality;
    }
    //Very Low Quality (red)
    else if (str == "TS"||str == "CAM"||str == "R5"||str == "R6"||str == "DVDSCR MD"||str == "DVDSCR LD"||str == "R5 MD"||str == "TS MD"||str == "TS LD"||str=="CAM MD"||str=="HDCAM"||str=="TC"||str=="DVDRIP MD"||str=="BDRIP MD"||str=="BRRIP MD"||str=="HDRiP MD") {
        return color.very_low_quality;
    }
    //Other
    else if (str== "ARCHIVE"||str=="EXE"||str=="MP3"||str=="FLAC"||str=="M4A"||str=="PDF"||str=="Autre"||str=="CBR"||str=="CBZ"||str=="IPA"||str=="IMG"||str=="ISO"||str=="epub"||str=="PKG") {
        return color.other_quality;
    }
    //
    //Language
    //
    //French
    else if (str== " (French)"||str==" (TrueFrench)"||str==" (VFSTFR)"||str==" (VFQ)") {
        return color.french_language;
    }
    //Vo
    else if (str==" (VOSTFR)"||str ==" (VO)") {
        return color.vo_language;
    }
    //Multi
    else if (str ==" (MULTI)") {
        return color.multi_language;
    }
    //Other
    else if (str ==" (inconnue)"){
        return color.other_language;
    }
}


function setupPageTitle() {
    if (options.custom_titles){
        let title=document.title;
        let url=window.location.pathname;
        if(url.match(/\/(.)+\/(\d)+/g)&&window.location.pathname.search("/coll")!=0) { //if you are in article
            document.title = $("h3.p-2").text();

        }
        else if (window.location.href==window.location.protocol+"//"+ window.location.hostname+"/") { //if you are in home
            document.title = "Tirexo";

        }
        else if(window.location.pathname=="/calendrier"||window.location.search=="?do=req_listes"||window.location.search=="?do=index_alpha"||window.location.pathname.search("exclus")) {
            document.title = document.getElementsByClassName("widget-heading")[0].innerText;

        }
        else if(window.location.search=="?do=alpha_collections"||window.location.pathname.search("/coll")==0) {
            document.title = document.getElementsByClassName("pt-3")[0].innerText;

        }
        else {
            document.title = document.getElementsByClassName("widget-heading")[1].innerText;

        }
    }
}


function hideBadQuality() {
    if (options.hide_bad_quality) {
    $(".qualite, .langue").each(function () {
        //Quality
        if(colorize($(this).text().match(/(.)+/g))==color.other_quality&&sizeTag($(this).text().match(/(.)+/g))==size.quality&&hide.other_quality) {
            this.parentElement.style.display = "none";
        }
        else if (colorize($(this).text().match(/(.)+/g))==color.very_low_quality&&sizeTag($(this).text().match(/(.)+/g))==size.quality&&hide.very_low_quality) {
            this.parentElement.style.display = "none";
        }
        else if(colorize($(this).text().match(/(.)+/g))==color.low_quality&&sizeTag($(this).text().match(/(.)+/g))==size.quality&&hide.low_quality) {
            this.parentElement.style.display = "none";
        }
        else if(colorize($(this).text().match(/(.)+/g))==color.medium_quality&&sizeTag($(this).text().match(/(.)+/g))==size.quality&&hide.medium_quality) {
            this.parentElement.style.display = "none";
        }
        else if(colorize($(this).text().match(/(.)+/g))==color.high_quality&&sizeTag($(this).text().match(/(.)+/g))==size.quality&&hide.high_quality) {
            this.parentElement.style.display = "none";
        }
        else if(colorize($(this).text().match(/(.)+/g))==color.very_high_quality&&sizeTag($(this).text().match(/(.)+/g))==size.quality&&hide.very_high_quality) {
            this.parentElement.style.display = "none";
        }
        // Language
        else if(colorize($(this).text().match(/(.)+/g))==color.french_language&&sizeTag($(this).text().match(/(.)+/g))==size.language&&hide.french_language) {
            this.parentElement.style.display = "none";
        }
        else if(colorize($(this).text().match(/(.)+/g))==color.vo_language&&sizeTag($(this).text().match(/(.)+/g))==size.language&&hide.vo_language) {
            this.parentElement.style.display = "none";
        }
        else if(colorize($(this).text().match(/(.)+/g))==color.multi_language&&sizeTag($(this).text().match(/(.)+/g))==size.language&&hide.multi_language) {
            this.parentElement.style.display = "none";
        }
        else if(colorize($(this).text().match(/(.)+/g))==color.other_language&&sizeTag($(this).text().match(/(.)+/g))==size.language&&hide.other_language) {
            this.parentElement.style.display = "none";
        }
    });
    }
}


function hideInfoBox() {
    if (options.hide_info_box) {
        document.getElementsByClassName('infobox-2 mt-2 text-center')[0].remove();
    }
}


function redirectFakeSite(){
    if (options.redirect_fake_site) {
        if(document.location.hostname=="www.tirexo.al") { //fake site
            document.location.hostname="www2.tirexo.work";
        }
    }
}
