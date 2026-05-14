'use strict';

angular.module('imageFactory', [])
    .factory('imageFactory', function($sce) {
        return {
            getOrientation: function (file, callback) {
              var reader = new FileReader();
              reader.onload = function(e) {
                delete reader.onload;

                var view = new DataView(e.target.result);
                if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
                var length = view.byteLength, offset = 2;
                while (offset < length) {
                  var marker = view.getUint16(offset, false);
                  offset += 2;
                  if (marker == 0xFFE1) {
                    if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
                    var little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;
                    for (var i = 0; i < tags; i++)
                      if (view.getUint16(offset + (i * 12), little) == 0x0112)
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
                  }
                  else if ((marker & 0xFF00) != 0xFF00) break;
                  else offset += view.getUint16(offset, false);
                }
                return callback(-1);
              };
              reader.readAsArrayBuffer(file);
              //reader.readAsDataURL(file);
            },
            resetOrientation: function(srcBase64, srcOrientation, resolutionLimit, callback, sizeLimit = null){
              // if(srcOrientation <= 0 && !resolutionLimit){
              //   callback(srcBase64);
              //   return;
              // }
              var reader = new FileReader();
              reader.onload = function(e) {
                  delete reader.onload;
                  var img = new Image();    

                  img.onload = function() {
                    delete img.onload;
                    var width = img.width,
                        height = img.height,
                        canvas = document.createElement('canvas'),
                        ctx = canvas.getContext("2d");

                    // PTE-9503 Solution A: Dimension-based browser auto-rotation detection
                    // EXIF orientations 5-8 involve 90°/270° rotation (width/height swap)
                    // Raw sensor data from camera is always landscape (width > height)
                    // If after img.onload the image is already portrait (height > width),
                    // it means browser already auto-applied EXIF rotation → skip manual transform
                    var browserAlreadyRotated = false;
                    if (srcOrientation >= 5 && srcOrientation <= 8) {
                      browserAlreadyRotated = (height > width);
                      // console.log('[resetOrientation] srcOrientation:', srcOrientation, 
                      //   'browserAlreadyRotated*',browserAlreadyRotated);

                    }
                    var orientationForTransform = browserAlreadyRotated ? 1 : srcOrientation;
                    // console.log('[resetOrientation] srcOrientation:', srcOrientation, 
                    //   'orientationForTransform:', orientationForTransform, 
                    //   'browserAlreadyRotated:', browserAlreadyRotated, 
                    //   'img.width:', width, 'img.height:', height);

                    // set proper canvas dimensions before transform & export
                    if (4 < orientationForTransform && orientationForTransform < 9) {
                      canvas.width = height;
                      canvas.height = width;
                    } else {
                      canvas.width = width;
                      canvas.height = height;
                    }

                    // transform context before drawing image
                    switch (orientationForTransform) {
                      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
                      case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
                      case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
                      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                      case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
                      case 7: ctx.transform(0, -1, -1, 0, height , width); break;
                      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
                      default: break;
                    }

                    // draw image
                    if (resolutionLimit) {
                      if (width > height){
                        var w = width < resolutionLimit? width: resolutionLimit;
                        var h = w * height / width;
                      } else {
                        var h = height < resolutionLimit? height: resolutionLimit;
                        var w = h * width / height;
                      }
                      canvas.width = w;
                      canvas.height = h;
                      ctx.scale(w/width,h/height);
                    }

                    ctx.drawImage(img, 0, 0);
                    
                    // separate out the mime component
                    var mimeString = img.src && img.src.split(',')[0].split(':')[1].split(';')[0] || 'image/png';
                    function convertImageToBlob() {
                      var dataURI = canvas.toDataURL(mimeString);
                      var byteString;
                      if (dataURI.split(',')[0].indexOf('base64') >= 0)
                        byteString = atob(dataURI.split(',')[1]);
                      else
                        byteString = unescape(dataURI.split(',')[1]);

                      // write the bytes of the string to a typed array
                      var ia = new Uint8Array(byteString.length);
                      for (var i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                      }

                      var blob = new Blob([ia], { type: mimeString });
                      if(sizeLimit && blob.size > sizeLimit) { // resize image size if sizeLimit has value
                        // reduce size by resolution at 90%
                        canvas.width *= 0.9;
                        canvas.height *= 0.9;
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        convertImageToBlob();
                      } else {
                        callback(blob)
                      }
                    }
                    convertImageToBlob();

                  }
                  img.src = e.target.result; 
              }
              reader.readAsDataURL(srcBase64);
            },

            resetDeviceOrientation: function(srcBase64, srcOrientation, localStorage, callback, sizeLimit = null){
              if(srcOrientation <= 0){
                callback(srcBase64);
                return;
              }
              var reader = new FileReader();
              reader.onload = function(e) {
                  delete reader.onload;
                  var img = new Image();    

                  img.onload = function() {
                    delete img.onload;
                    var width = img.width,
                        height = img.height,
                        canvas = document.createElement('canvas'),
                        ctx = canvas.getContext("2d");

                    // set proper canvas dimensions before transform & export
                    if (4 < srcOrientation && srcOrientation < 9) {
                      canvas.width = height;
                      canvas.height = width;
                    } else {
                      canvas.width = width;
                      canvas.height = height;
                    }

                    // transform context before drawing image
                    switch (srcOrientation) {
                      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
                      case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
                      case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
                      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                      case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
                      case 7: ctx.transform(0, -1, -1, 0, height , width); break;
                      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
                      default: break;
                    }

                    // draw image
                    ctx.drawImage(img, 0, 0);
                    try {
                      // separate out the mime component
                      var mimeString = img.src && img.src.split(',')[0].split(':')[1].split(';')[0] || 'image/png';

                      function convertImageToBlob() {
                        var dataURI = canvas.toDataURL(mimeString);
                        var byteString;
                        if (dataURI.split(',')[0].indexOf('base64') >= 0)
                          byteString = atob(dataURI.split(',')[1]);
                        else
                          byteString = unescape(dataURI.split(',')[1]);

                        // write the bytes of the string to a typed array
                        var ia = new Uint8Array(byteString.length);
                        for (var i = 0; i < byteString.length; i++) {
                          ia[i] = byteString.charCodeAt(i);
                        }

                        var blob = new Blob([ia], { type: mimeString });
                        if (sizeLimit && blob.size > sizeLimit) {
                          // reduce size by resolution at 90%
                          canvas.width *= 0.9;
                          canvas.height *= 0.9;
                          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                          convertImageToBlob();
                        } else {
                          callback(blob)
                        }
                      }
                      convertImageToBlob();

                    } catch (exception) {
                      alert(exception);
                      callback(null);
                    }
                    
                }
                img.src = e.target.result;
              }
              reader.readAsDataURL(srcBase64);
            }
    }
  });
////////////////////////////////USAGE///////////////////////////////////////////////////
// imageFactory.getOrientation($scope.dataMedia.selectedImage, function(orientation) {
//   imageFactory.resetOrientation($scope.dataMedia.selectedImage, orientation, function(dataBlob){
//   })
// });