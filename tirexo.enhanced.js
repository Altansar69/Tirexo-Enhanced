// ==UserScript==
// @name         Tirexo Enhanced
// @namespace    Altansar
// @version      0.2
// @description  Enhanced your Tirexo experience
// @author       Altansar
// @match        *://www.tirexo.work/*
// @match        *://www2.tirexo.work/*
// @grant        none
// @homepageURL  https://github.com/SubZeroPL/cs-rin-ru-enhanced-mod
// @updateURL
// @downloadURL
// ==/UserScript==

/*Credits:
Thanks to Royalgamer06 and SubZeroPL for their script for the rin I've been basking in. */

/* Version
0.1 -> Colors for Tag
0.2 -> Size for Tag
0.3 -> Title W.I.P

*/

/* To implement
infinite scrolling

*/


let options = {
    "custom_tags": true,
};

const sizeQualite = 1.2;
const sizeLanguage = 1.0;


tagify();
setupPageTitle();

    function tagify() {
    if (options['custom_tags']) {
        $(".qualite, .langue", ).each(function () {
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
    //Qualite
    if (str=="ULTRA HD (x265)"||str=="Ultra HDLight (x265)"||str=="Blu-Ray 720p"||str=="Blu-Ray 1080p"||str=="Blu-Ray 3D"||str=="HD 720p"||str=="HDLight 720p"||str=="HDLight 1080p"||str=="HD 1080p"||str=="WEB-DL 720p"||str=="WEB-DL 1080p"||str=="REMUX"||str=="HDTV 720p"||str=="HDTV 1080p"||str== "DVDRIP"||str=="BDRIP"||str=="BRRIP"||str=="Webrip"||str=="HDTV"||str=="HDRip"||str=="TVrip"||str=="Web-DL"||str=="DVDRIP MKV"||str=="DVD-R"||str=="Full-DVD"||str == "DVDSCR"||str=="BRRIP LD"||str=="BDRIP LD"||str=="DVDRIP LD"||str == "TS"||str == "CAM"||str == "R5"||str == "R6"||str == "DVDSCR MD"||str == "DVDSCR LD"||str == "R5 MD"||str == "TS MD"||str == "TS LD"||str=="CAM MD"||str=="HDCAM"||str=="TC"||str=="DVDRIP MD"||str=="BDRIP MD"||str=="BRRIP MD"||str=="HDRIP MD"||str== "ARCHIVE"||str=="EXE"||str=="MP3"||str=="FLAC"||str=="M4A"||str=="PDF"||str=="Autre"||str=="CBR"||str=="CBZ"||str=="IPA"||str=="IMG"||str=="ISO"||str=="epub"||str=="PKG") {
        return sizeQualite;
    }
    //Language
    else {
        return sizeLanguage;
    }
}

function colorize(str) {
    //
    // Qualite
    //
    //Very High Quality 4k UHD (purple)
    if (str=="ULTRA HD (x265)"||str=="Ultra HDLight (x265)"){
        return "#5A4BBC";
    }
    //High Quality (green)
    if (str=="Blu-Ray 720p"||str=="Blu-Ray 1080p"||str=="Blu-Ray 3D"||str=="HD 720p"||str=="HDLight 720p"||str=="HDLight 1080p"||str=="HD 1080p"||str=="WEB-DL 720p"||str=="WEB-DL 1080p"||str=="REMUX"||str=="HDTV 720p"||str=="HDTV 1080p") {
        return "#00BF00";
    }
    // Medium Quality (yellow)
    if (str== "DVDRIP"||str=="BDRIP"||str=="BRRIP"||str=="Webrip"||str=="HDTV"||str=="HDRip"||str=="TVrip"||str=="Web-DL"||str=="DVDRIP MKV"||str=="DVD-R"||str=="Full-DVD") {
        return "#BF9F00";
    }
    // Low Quality (orange)
    if (str == "DVDSCR"||str=="BRRIP LD"||str=="BDRIP LD"||str=="DVDRIP LD"){
        return "#BF4600";
    }
    //Very Low Quality (red)
    else if (str == "TS"||str == "CAM"||str == "R5"||str == "R6"||str == "DVDSCR MD"||str == "DVDSCR LD"||str == "R5 MD"||str == "TS MD"||str == "TS LD"||str=="CAM MD"||str=="HDCAM"||str=="TC"||str=="DVDRIP MD"||str=="BDRIP MD"||str=="BRRIP MD"||str=="HDRiP MD") {
        return "#BF0000";
    }
    //Other
    else if (str== "ARCHIVE"||str=="EXE"||str=="MP3"||str=="FLAC"||str=="M4A"||str=="PDF"||str=="Autre"||str=="CBR"||str=="CBZ"||str=="IPA"||str=="IMG"||str=="ISO"||str=="epub"||str=="PKG") {
        return "#582900";
    }
    //
    //Langue
    //
    //Francais
    else if (str== " (French)"||str==" (TrueFrench)"||str==" (VFSTFR)"||str==" (VFQ)") {
        return "#bc39e6";
    }
    //Vo
    else if (str==" (VOSTFR)"||str ==" (VO)") {
        return "#e83e8c";
    }
    //Multi
    else if (str ==" (MULTI)") {
        return "#D66E49";
    }
    //Autre
    else {
        return "#6c757d";
    }
}



function setupPageTitle() {
    if(document.title.indexOf("Télécharger") > -1)
    {
        let title = document.title;
        document.title = title.substring(12, title.length-121);
    }
    else if(document.title.indexOf("Tirexo") > -1) {
        document.title = "Tirexo";
     }
}
