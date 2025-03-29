import jQuery from "jquery";

export function trimBoth(str: string) {
  return jQuery.trim(str);
}

export function setAllDependancyFieldsMapping() {
  var mapDependancyLabels = getMapDependenySelectValues(
    jQuery("[id='property(module)']").val(),
    "JSON_MAP_DEP_LABELS"
  );
  if (mapDependancyLabels) {
    for (var i = 0; i < mapDependancyLabels.length; i++) {
      var label = mapDependancyLabels[i];
      var obj = document.forms["zsWebToCase_740111000002566679" as any][label];
      if (obj) {
        setDependent(obj, true);
      }
    }
  }
}

export function setDependent(obj: any, isload: any) {
  if (!obj.id) return;
  var name = obj.id || (obj[0] && obj[0].id) || "";
  var module = jQuery("[id='property(module)']").val();
  var val = "";
  var myObject = getMapDependenySelectValues(module, "JSON_VALUES");
  if (myObject != undefined) {
    val = myObject[name];
  }
  var mySelObject = getMapDependenySelectValues(module, "JSON_SELECT_VALUES");
  if (val != null && val != "" && val != "null" && mySelObject) {
    var fields = val;
    for (var i in fields as any) {
      if (fields.hasOwnProperty(i)) {
        var isDependent = false;
        var label = i;
        var values = fields[i as keyof typeof fields];
        if (label.indexOf(")") > -1) {
          label = label.replace(/\)/g, "_____");
        }
        if (label.indexOf("(") > -1) {
          label = label.replace(/\(/g, "____");
        }
        if (label.indexOf(".") > -1) {
          label = label.replace(/\./g, "___");
        }
        var depObj =
          document.forms["zsWebToCase_740111000002566679" as any][label];
        if (depObj && depObj.options) {
          var mapValues = "";
          var selected_val = depObj.value;
          var depLen = depObj.options.length - 1;
          for (var n = depLen; n >= 0; n--) {
            if (depObj.options[n].selected) {
              if (mapValues == "") {
                mapValues = depObj.options[n].value;
              } else {
                mapValues = mapValues + ";;;" + depObj.options[n].value;
              }
            }
          }
          depObj.value = "";
          var selectValues = mySelObject[label];
          for (var k in values as any) {
            var rat = k;
            if (rat == "-None-") {
              rat = "";
            }
            var parentValues = mySelObject[name];
            if (rat == trimBoth(obj.value)) {
              isDependent = true;
              depObj.length = 0;
              var depvalues: any = values[k as keyof typeof values];
              var depLen = depvalues.length - 1;
              for (var j = 0; j <= depLen; j++) {
                var optionElement: any = document.createElement("OPTION");
                var displayValue = depvalues[j];
                var actualValue = displayValue;
                if (actualValue == "-None-") {
                  optionElement.value = "";
                  displayValue = "-None-";
                } else {
                  optionElement.value = actualValue;
                }
                optionElement.text = displayValue;
                if (mapValues != undefined) {
                  var mapValue = mapValues.split(";;;");
                  var len = mapValue.length;
                  for (var p = 0; p < len; p++) {
                    if (actualValue == mapValue[p]) {
                      optionElement.selected = true;
                    }
                  }
                }
                depObj.options.add(optionElement);
              }
            }
          }
          if (!isDependent) {
            depObj.length = 0;
            var len: number = selectValues.length;
            for (var j = 0; j < len; j++) {
              var actualValue = selectValues[j];
              var optionElement: any = document.createElement("OPTION");
              if (actualValue == "-None-") {
                optionElement.value = "";
              } else {
                optionElement.value = selectValues[j];
              }
              optionElement.text = selectValues[j];
              depObj.options.add(optionElement);
            }
            depObj.value = selected_val;
          }
          if (!isload) {
            setDependent(depObj, false);
          }
          var jdepObj = jQuery(depObj) as any;
          if (jdepObj.hasClass("select2-offscreen")) {
            jdepObj.select2("val", jdepObj.val());
          }
        }
      }
    }
  }
}

export function getMapDependenySelectValues(module: any, key: any) {
  var dependencyObj = jQuery.parseJSON(
    jQuery("[id='dependent_field_values_" + module + "']").val() as any
  );
  if (dependencyObj == undefined) {
    return dependencyObj;
  }
  return dependencyObj[key];
}

export function isFormDisabled(): boolean {
  // @ts-ignore
  const form = document.forms[
    "zsWebToCase_740111000002566679"
  ] as HTMLFormElement;
  if (!form) return true; // If form is not found, return disabled
  //if input of type checkbox with name Terms_And_Conditions is not checked, return true
  if (!form["Terms_And_Conditions"].checked) return true;
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i] as HTMLInputElement;
    if (
      element.type !== "hidden" &&
      element.type !== "button" &&
      element.type !== "submit" &&
      !element.value
    ) {
      return true; // If any non-hidden and non-button field is empty, return disabled
    }
  }
  return false; // If all fields have values, return not disabled
}

export function zsRegenerateCaptcha() {
  var webFormxhr: any = {};
  webFormxhr = new XMLHttpRequest();
  webFormxhr.open(
    "GET",
    "https://desk.zoho.com/support/GenerateCaptcha?action=getNewCaptcha&_=" +
      new Date().getTime(),
    true
  );
  webFormxhr.onreadystatechange = function () {
    if (webFormxhr.readyState === 4 && webFormxhr.status === 200) {
      try {
        var response =
          webFormxhr.responseText != null
            ? JSON.parse(webFormxhr.responseText)
            : "";
        const getCaptchaURL: any = document.getElementById("zsCaptchaUrl");
        const getCaptchaByName: any = document.getElementById("xJdfEaS");
        if (response.captchaDigest && response.captchaUrl) {
          getCaptchaByName.value = response.captchaDigest;
          getCaptchaURL!.src = response.captchaUrl;
        }
      } catch (e) {
        console.log("Breaks", e);
      }
    }
  };
  webFormxhr.send();
}
function zsResetWebForm(webFormId: any) {
  document.forms[("zsWebToCase_" + webFormId) as any].reset();
  document
    .getElementById("zsSubmitButton_740111000002566679")!
    .removeAttribute("disabled");
  setAllDependancyFieldsMapping();
}
