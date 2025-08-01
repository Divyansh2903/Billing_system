import {
  __commonJS,
  require_react
} from "./chunk-Y455YYDO.js";

// node_modules/react-images-uploading/dist/utils.js
var require_utils = __commonJS({
  "node_modules/react-images-uploading/dist/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getListFiles = exports.getImage = exports.getBase64 = exports.getAcceptTypeString = exports.openFileDialog = void 0;
    exports.openFileDialog = function(inputRef) {
      if (inputRef.current)
        inputRef.current.click();
    };
    exports.getAcceptTypeString = function(acceptType, allowNonImageType) {
      if (acceptType === null || acceptType === void 0 ? void 0 : acceptType.length)
        return acceptType.map(function(item) {
          return "." + item;
        }).join(", ");
      if (allowNonImageType)
        return "";
      return "image/*";
    };
    exports.getBase64 = function(file) {
      var reader = new FileReader();
      return new Promise(function(resolve) {
        reader.addEventListener("load", function() {
          return resolve(String(reader.result));
        });
        reader.readAsDataURL(file);
      });
    };
    exports.getImage = function(file) {
      var image = new Image();
      return new Promise(function(resolve) {
        image.addEventListener("load", function() {
          return resolve(image);
        });
        image.src = URL.createObjectURL(file);
      });
    };
    exports.getListFiles = function(files, dataURLKey) {
      var promiseFiles = [];
      for (var i = 0; i < files.length; i += 1) {
        promiseFiles.push(exports.getBase64(files[i]));
      }
      return Promise.all(promiseFiles).then(function(fileListBase64) {
        var fileList = fileListBase64.map(function(base64, index) {
          var _a;
          return _a = {}, _a[dataURLKey] = base64, _a.file = files[index], _a;
        });
        return fileList;
      });
    };
  }
});

// node_modules/react-images-uploading/dist/constants.js
var require_constants = __commonJS({
  "node_modules/react-images-uploading/dist/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_DATA_URL_KEY = exports.INIT_MAX_NUMBER = exports.DEFAULT_NULL_INDEX = void 0;
    exports.DEFAULT_NULL_INDEX = -1;
    exports.INIT_MAX_NUMBER = 1e3;
    exports.DEFAULT_DATA_URL_KEY = "dataURL";
  }
});

// node_modules/react-images-uploading/dist/validation.js
var require_validation = __commonJS({
  "node_modules/react-images-uploading/dist/validation.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getErrorValidation = exports.isMaxNumberValid = exports.isAcceptTypeValid = exports.isMaxFileSizeValid = exports.isImageValid = exports.isResolutionValid = void 0;
    var constants_1 = require_constants();
    var utils_1 = require_utils();
    exports.isResolutionValid = function(image, resolutionType, resolutionWidth, resolutionHeight) {
      if (resolutionWidth === void 0) {
        resolutionWidth = 0;
      }
      if (resolutionHeight === void 0) {
        resolutionHeight = 1;
      }
      if (!resolutionWidth || !resolutionHeight || !image.width || !image.height)
        return true;
      switch (resolutionType) {
        case "absolute": {
          if (image.width === resolutionWidth && image.height === resolutionHeight)
            return true;
          break;
        }
        case "ratio": {
          var ratio = resolutionWidth / resolutionHeight;
          if (image.width / image.height === ratio)
            return true;
          break;
        }
        case "less": {
          if (image.width <= resolutionWidth && image.height <= resolutionHeight)
            return true;
          break;
        }
        case "more": {
          if (image.width >= resolutionWidth && image.height >= resolutionHeight)
            return true;
          break;
        }
        default:
          break;
      }
      return false;
    };
    exports.isImageValid = function(fileType) {
      if (fileType.includes("image")) {
        return true;
      }
      return false;
    };
    exports.isMaxFileSizeValid = function(fileSize, maxFileSize) {
      return maxFileSize ? fileSize <= maxFileSize : true;
    };
    exports.isAcceptTypeValid = function(acceptType, fileName) {
      if (acceptType && acceptType.length > 0) {
        var type_1 = fileName.split(".").pop() || "";
        if (acceptType.findIndex(function(item) {
          return item.toLowerCase() === type_1.toLowerCase();
        }) < 0)
          return false;
      }
      return true;
    };
    exports.isMaxNumberValid = function(totalNumber, maxNumber, keyUpdate) {
      if (maxNumber !== 0 && !maxNumber)
        return true;
      if (keyUpdate === constants_1.DEFAULT_NULL_INDEX) {
        if (totalNumber <= maxNumber)
          return true;
      } else if (totalNumber <= maxNumber + 1)
        return true;
      return false;
    };
    exports.getErrorValidation = function(_a) {
      var fileList = _a.fileList, value = _a.value, maxNumber = _a.maxNumber, keyUpdate = _a.keyUpdate, acceptType = _a.acceptType, maxFileSize = _a.maxFileSize, resolutionType = _a.resolutionType, resolutionWidth = _a.resolutionWidth, resolutionHeight = _a.resolutionHeight, allowNonImageType = _a.allowNonImageType;
      return __awaiter(void 0, void 0, void 0, function() {
        var newErrors, i, file, image, checkRes;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              newErrors = {};
              if (!!exports.isMaxNumberValid(fileList.length + value.length, maxNumber, keyUpdate)) return [3, 1];
              newErrors.maxNumber = true;
              return [3, 5];
            case 1:
              i = 0;
              _b.label = 2;
            case 2:
              if (!(i < fileList.length)) return [3, 5];
              file = fileList[i].file;
              if (!file)
                return [3, 4];
              if (!allowNonImageType && !exports.isImageValid(file.type)) {
                newErrors.acceptType = true;
                return [3, 5];
              }
              if (!exports.isAcceptTypeValid(acceptType, file.name)) {
                newErrors.acceptType = true;
                return [3, 5];
              }
              if (!exports.isMaxFileSizeValid(file.size, maxFileSize)) {
                newErrors.maxFileSize = true;
                return [3, 5];
              }
              if (!resolutionType) return [3, 4];
              return [4, utils_1.getImage(file)];
            case 3:
              image = _b.sent();
              checkRes = exports.isResolutionValid(image, resolutionType, resolutionWidth, resolutionHeight);
              if (!checkRes) {
                newErrors.resolution = true;
                return [3, 5];
              }
              _b.label = 4;
            case 4:
              i += 1;
              return [3, 2];
            case 5:
              if (Object.values(newErrors).find(Boolean))
                return [2, newErrors];
              return [2, null];
          }
        });
      });
    };
  }
});

// node_modules/react-images-uploading/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-images-uploading/dist/index.js"(exports) {
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = __importStar(require_react());
    var utils_1 = require_utils();
    var validation_1 = require_validation();
    var constants_1 = require_constants();
    var ReactImageUploading = function(_a) {
      var _b = _a.value, value = _b === void 0 ? [] : _b, onChange = _a.onChange, onError = _a.onError, children = _a.children, _c = _a.dataURLKey, dataURLKey = _c === void 0 ? constants_1.DEFAULT_DATA_URL_KEY : _c, _d = _a.multiple, multiple = _d === void 0 ? false : _d, _e = _a.maxNumber, maxNumber = _e === void 0 ? constants_1.INIT_MAX_NUMBER : _e, acceptType = _a.acceptType, maxFileSize = _a.maxFileSize, resolutionWidth = _a.resolutionWidth, resolutionHeight = _a.resolutionHeight, resolutionType = _a.resolutionType, _f = _a.inputProps, inputProps = _f === void 0 ? {} : _f, _g = _a.allowNonImageType, allowNonImageType = _g === void 0 ? false : _g;
      var inValue = value || [];
      var inputRef = react_1.useRef(null);
      var _h = react_1.useState(constants_1.DEFAULT_NULL_INDEX), keyUpdate = _h[0], setKeyUpdate = _h[1];
      var _j = react_1.useState(null), errors = _j[0], setErrors = _j[1];
      var _k = react_1.useState(false), isDragging = _k[0], setIsDragging = _k[1];
      var handleClickInput = react_1.useCallback(function() {
        return utils_1.openFileDialog(inputRef);
      }, [
        inputRef
      ]);
      var onImageUpload = react_1.useCallback(function() {
        setKeyUpdate(constants_1.DEFAULT_NULL_INDEX);
        handleClickInput();
      }, [handleClickInput]);
      var onImageRemoveAll = react_1.useCallback(function() {
        onChange === null || onChange === void 0 ? void 0 : onChange([]);
      }, [onChange]);
      var onImageRemove = function(index) {
        var updatedList = __spreadArrays(inValue);
        if (Array.isArray(index)) {
          index.forEach(function(i) {
            updatedList.splice(i, 1);
          });
        } else {
          updatedList.splice(index, 1);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(updatedList);
      };
      var onImageUpdate = function(index) {
        setKeyUpdate(index);
        handleClickInput();
      };
      var validate = function(fileList) {
        return __awaiter(void 0, void 0, void 0, function() {
          var errorsValidation;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                return [4, validation_1.getErrorValidation({
                  fileList,
                  maxFileSize,
                  maxNumber,
                  acceptType,
                  keyUpdate,
                  resolutionType,
                  resolutionWidth,
                  resolutionHeight,
                  value: inValue,
                  allowNonImageType
                })];
              case 1:
                errorsValidation = _a2.sent();
                if (errorsValidation) {
                  setErrors(errorsValidation);
                  onError === null || onError === void 0 ? void 0 : onError(errorsValidation, fileList);
                  return [2, false];
                }
                errors && setErrors(null);
                return [2, true];
            }
          });
        });
      };
      var handleChange = function(files) {
        return __awaiter(void 0, void 0, void 0, function() {
          var fileList, checkValidate, updatedFileList, updatedIndexes, firstFile, i;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                if (!files)
                  return [
                    2
                    /*return*/
                  ];
                return [4, utils_1.getListFiles(files, dataURLKey)];
              case 1:
                fileList = _a2.sent();
                if (!fileList.length)
                  return [
                    2
                    /*return*/
                  ];
                return [4, validate(fileList)];
              case 2:
                checkValidate = _a2.sent();
                if (!checkValidate)
                  return [
                    2
                    /*return*/
                  ];
                updatedIndexes = [];
                if (keyUpdate > constants_1.DEFAULT_NULL_INDEX) {
                  firstFile = fileList[0];
                  updatedFileList = __spreadArrays(inValue);
                  updatedFileList[keyUpdate] = firstFile;
                  updatedIndexes.push(keyUpdate);
                } else if (multiple) {
                  updatedFileList = __spreadArrays(inValue, fileList);
                  for (i = inValue.length; i < updatedFileList.length; i += 1) {
                    updatedIndexes.push(i);
                  }
                } else {
                  updatedFileList = [fileList[0]];
                  updatedIndexes.push(0);
                }
                onChange === null || onChange === void 0 ? void 0 : onChange(updatedFileList, updatedIndexes);
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      var onInputChange = function(e) {
        return __awaiter(void 0, void 0, void 0, function() {
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                return [4, handleChange(e.target.files)];
              case 1:
                _a2.sent();
                keyUpdate > constants_1.DEFAULT_NULL_INDEX && setKeyUpdate(constants_1.DEFAULT_NULL_INDEX);
                if (inputRef.current)
                  inputRef.current.value = "";
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      var acceptTypeString = react_1.useMemo(function() {
        return utils_1.getAcceptTypeString(acceptType, allowNonImageType);
      }, [acceptType, allowNonImageType]);
      var handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
      };
      var handleDragIn = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
          setIsDragging(true);
        }
      };
      var handleDragOut = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      };
      var handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleChange(e.dataTransfer.files);
        }
      };
      var handleDragStart = function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.clearData();
      };
      return react_1.default.createElement(
        react_1.default.Fragment,
        null,
        react_1.default.createElement("input", __assign({ type: "file", accept: acceptTypeString, ref: inputRef, multiple: multiple && keyUpdate === constants_1.DEFAULT_NULL_INDEX, onChange: onInputChange, style: { display: "none" } }, inputProps)),
        children === null || children === void 0 ? void 0 : children({
          imageList: inValue,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          errors,
          dragProps: {
            onDrop: handleDrop,
            onDragEnter: handleDragIn,
            onDragLeave: handleDragOut,
            onDragOver: handleDrag,
            onDragStart: handleDragStart
          },
          isDragging
        })
      );
    };
    exports.default = ReactImageUploading;
  }
});
export default require_dist();
//# sourceMappingURL=react-images-uploading.js.map
