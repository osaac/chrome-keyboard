"use strict"

;(function keyboard(window, document){
  var FOCUS_DELAY = 10
  var userIsAble = false

  // Should be read in as JSON file, along with custom HTML and CSS
  var settings = {
    layouts: {
      alphabet: [
        [
          {name: "a", num: 20}
        , {name: "b", num: 15}
        , {name: "c", num:  6}
        , {name: "d", num: 10}
        , {name: "#edit", num: 31}
        , {name: "#space", num: 0}
        , {name: "#tab", num: 25} // **..*•
        ]
      , [
          {name: "e", num: 16}
        , {name: "f", num: 14}
        , {name: "g", num: 13}
        , {name: "h", num: 12}
        , {name: "#numbers", num: 26}
        , {name: "#punctuation", num: 27}
        , {name: "#more", num: 28}
        ]
      , [
          {name: "i", num: 17}
        , {name: "j", num: 29}
        , {name: "k", num:  7}
        , {name: "l", num:  9}
        , {name: "m", num:  5}
        , {name: "n", num:  4}
        ]
      , [
          {name: "o", num: 18}
        , {name: "p", num: 11}
        , {name: "qu",num: 30}
        , {name: "r", num:  1}
        , {name: "s", num:  2}
        , {name: "t", num:  8}
        ]
      , [
          {name: "u", num: 22}
        , {name: "v", num: 23}
        , {name: "w", num: 21}
        , {name: "x", num:  3}
        , {name: "y", num: 24}
        , {name: "z", num: 19}
        ]
      ]
    , punctuation: [
         // ,^()
         // .¶[]
         // !{}«»*
         // ?-\/&@
         // :;_"'—
        [
          {name: ".", num: 20}
        , {name: "#upperCase", num: 15}
        , {name: "(", num:  6}
        , {name: ")", num: 10}
        , {name: "#edit", num: 31}
        , {name: "#space", num: 0}
        , {name: "#tab", num: 25} // **..*•
        ]
      , [
          {name: ",", num: 16}
        , {name: "¶", num: 14}
        , {name: "[", num: 13}
        , {name: "]", num: 12}
        , {name: "#numbers", num: 26}
        , {name: "#punctuation", num: 27}
        , {name: "#more", num: 28}
        ]
      , [
          {name: "!", num: 17}
        , {name: "{", num: 29}
        , {name: "}", num:  7}
        , {name: "«&nbsp", num:  9}
        , {name: "&nbsp»", num:  5}
        , {name: "#", num:  4}
        ]
      , [
          {name: "?", num: 18}
        , {name: "-", num: 11}
        , {name: "\\",num: 30}
        , {name: "/", num:  1}
        , {name: "&", num:  2}
        , {name: "@", num:  8}
        ]
      , [
          {name: ";", num: 22}
        , {name: ":", num: 23}
        , {name: "_", num: 21}
        , {name: '"', num:  3}
        , {name: "'", num: 24}
        , {name: "—", num: 19}
        ]
      ]
    , numbers: [
        [
          {name: "+", num: 20}
        , {name: "-", num: 15}
        , {name: "×", num:  6}
        , {name: "/", num: 10}
        , {name: "#edit", num: 31}
        , {name: "#space", num: 0}
        , {name: "#tab", num: 25} // **..*•
        ]
      , [
          {name: "=", num: 16}
        , {name: "%", num: 14}
        , {name: "<", num: 13}
        , {name: ">", num: 12}
        , {name: "#numbers", num: 26}
        , {name: "#punctuation", num: 27}
        , {name: "#more", num: 28}
        ]
      , [
          {name: "1", num: 17}
        , {name: "2", num: 29}
        , {name: "3", num:  7}
        , {name: "4", num:  9}
        , {name: "5", num:  5}
        , {name: ".", num:  4}
        ]
      , [
          {name: "6", num: 18}
        , {name: "7", num: 11}
        , {name: "8",num: 30}
        , {name: "9", num:  1}
        , {name: "0", num:  2}
        , {name: ",", num:  8}
        ]
      , [
          {name: "*", num: 22}
        , {name: "|", num: 23}
        , {name: "&", num: 21}
        , {name: '~', num:  3}
        , {name: "$", num: 24}
        , {name: "¢", num: 19}
        ]
      ]
   , more: [
        [
          {name: "à", num: 20}
        , {name: "â", num: 15}
        , {name: "ç", num:  6}
        , {name: "æ", num: 10}
        , {name: "#edit", num: 31}
        , {name: "#space", num: 0}
        , {name: "#tab", num: 25} // **..*•
        ]
      , [
          {name: "é", num: 16}
        , {name: "è", num: 14}
        , {name: "ê", num: 13}
        , {name: "ë", num: 12}
        , {name: "#numbers", num: 26}
        , {name: "#punctuation", num: 27}
        , {name: "#more", num: 28}
        ]
      , [
          {name: "î", num: 17}
        , {name: "ï", num: 29}
        , {name: "¡", num:  7}
        , {name: "¿", num:  9}
        , {name: "°", num:  5}
        , {name: "•", num:  4}
        ]
      , [
          {name: "ô", num: 18}
        , {name: "œ", num: 11}
        , {name: "£",num: 30}
        , {name: "€", num:  1}
        , {name: "¥", num:  2}
        , {name: "¢", num:  8}
        ]
      , [
          {name: "ù", num: 22}
        , {name: "û", num: 23}
        , {name: "ü", num: 21}
        , {name: '`', num:  3}
        , {name: "ÿ", num: 24}
        , {name: "√", num: 19}
        ]
      ]
    }
  , icons: {
      alphabet: "ABC"
    , edit: "Edit"
    , space: "&nbsp"
    , tab: "TAB"
    , numbers: "123"
    , punctuation: ",.?!"
    , more: "éèêë"
    , upperCase: "Aa"
    }
  , bits: 5
  , initial: "alphabet"
  , delay: 1000
  , actionRatio: 1.1 // 1100 - 1210 - 1331 - 1464 - ...
  , maxDelay: 2000
  , autoCapitalize: true
  }

  var View = (function () {
    var preview = document.querySelector(".k-preview span")
    var textArea = document.querySelector(".k-container textarea")
    var layoutManager
    var dotManager

    function View(settings) {
      layoutManager = new LayoutManager(settings)
      dotManager = new DotManager()
    }

    View.prototype.reset = function reset() {
      layoutManager.resetKeys()
      dotManager.resetDots()
    }

    View.prototype.setKeyLayout = function setKeyLayout(layoutName) {
      layoutManager.setKeyLayout(layoutName)
    }

    View.prototype.scanKeys = function scanKeys() {
      layoutManager.scanKeys()
    }

    View.prototype.getInput = function getInput() {
      return layoutManager.getInput()
    }

    View.prototype.getElement = function getElement() {
      return layoutManager.getElement()
    }

    View.prototype.updateDot = function updateDot(bitIndex) {
      dotManager.updateDot(bitIndex)
    }

    View.prototype.resetDots = function resetDots(bitIndex) {
      dotManager.resetDots()
    }

    View.prototype.setDotClass = function setDotClass(bitIndex) {
      dotManager.setDotClass(bitIndex)
    }

    View.prototype.showInput = function showInput(chosen) {
      var element
      input ? null : input = this.getInput()
      specialAction = (input.length > 1 && input.charAt(0) === "#")

      if (specialAction) {
        prepareSpecialAction()
      } else {
        // Remove all special settings
        preview.className = ""
        preview.innerHTML = input
      }

      if (chosen) {
        element = this.getElement()
        element.classList.add("chosen")
      }

      function prepareSpecialAction() {
        switch (input) {
          case "#space":
          default:
            preview.classList.add("special")
            preview.innerHTML = input.substring(1)
          break
        }
      }
    }

    View.prototype.toggleAbleFocus = function toggleAbleFocus(on) {
      if (on) {
        textArea.classList.add("focus")
      } else {
        textArea.classList.remove("focus")
      }
    }

    View.prototype.updateInput = function updateInput(input) {
      input ? null : input = this.getInput()
      textArea.innerHTML += input
    }

    View.prototype.checkNextLayout = function checkNextLayout() {
      layoutManager.checkNext()
    }

    return View
  })()

  /** The LayoutManager deals with the (32) keys of the virtual
   *  keyboard. It allows you to switch between keyboard layouts,
   *  to highlight and disable keys as they are scanned, and to
   *  get the current input and its associated <span> element.
   */
  var LayoutManager = (function () {   
    var selector = ".k-keyboard p"
    var keyLUT = []      // [<num>: <keyName>, ...]
    var elementLUT = []  // [<num>: <span element>, ...]
    var scannedKeys = [] // [[<span element>, ...], <row>, ...]
    var layout = []
    var capsLock = false
    var upperCase
    var layouts
    var icons

    function LayoutManager(settings) {   
      layouts = settings.layouts
      upperCase = settings.autoCapitalize
      icons = settings.icons

      // Create an array of arrays of <span> elements, which should
      // have the same structure as each layout
      scannedKeys = [].slice.call(document.querySelectorAll(selector))
      scannedKeys.forEach(function(row, index) {
        scannedKeys[index] = [].slice.call(row.children)
      })
    }

    LayoutManager.prototype.setKeyLayout = function (layoutName) {
      if (layoutName) {
        if (layoutName.charAt(0) === "#") {
          layoutName = layoutName.substring(1)
        }

        layout = layouts[layoutName]
      }

      if (!layout.length) {
        return
      }

      keyLUT.length = 0
      elementLUT.length = 0
      var keys
        , keyObject
        , name
        , num
        , element

      scannedKeys.forEach(function (row, rowIndex) {
        keys = layout[rowIndex]
        row.forEach(function (element, keyIndex) {
          keyObject = keys[keyIndex]
          name = keyObject.name
          num = keyObject.num
          keyLUT[num] = getKeyName(name, true) // may be "#iconName"
          elementLUT[num] = element
          element.innerHTML = getKeyName(name, false)
        })
      })

      function getKeyName(name, respectHash) {
        if (name.length > 1 && name.charAt(0) === "#") {
          name = icons[name.substring(1)]
          if (respectHash) {
            // Leave name as it is
            name = "#" + name
          } //else {
          //   name = "#" + icons[name.substring(1)]
          // }
        } else if (upperCase) {
          name = name.charAt(0).toUpperCase() + name.slice(1)
        }

        return name
      }
    }

    LayoutManager.prototype.getInput = function () {
      return keyLUT[binary]
    }

    LayoutManager.prototype.getElement = function () {
      return elementLUT[binary]
    }

    LayoutManager.prototype.scanKeys = function scanKeys() {
      var keyObject
        , num
        , maskedNum
        , check
        , className

      scannedKeys.forEach(function (row, rowIndex) {
        row.forEach(function (element, keyIndex) {
          keyObject = layout[rowIndex][keyIndex]
          num = keyObject.num         // e.g. 20 for "a" *.*..
          maskedNum = num & maskValue // e.g. 16 for "a" at 2nd bit
          check = (num & bitValue) !== 0 // true if char uses this bit

          if (!pass) {
            className = firstPassClassName()
          } else {
            className = subsequentPassClassName()
          }

          element.classList.remove("chosen")
          element.classList.remove("highlight")
          element.classList.remove("disable")
          if (className) {
            element.classList.add(className)
          }
        })
      })

      function firstPassClassName() {
        if (maskedNum === binary) {
           if (check) {
            return "highlight"
          } else {
            return undefined
          }
        } else {
          return "disable"
        }
      }

      function subsequentPassClassName() {
        var used
          , active

        if (bitValue) {
          used = (binary & bitValue) !== 0
          active = pass > 1 || maskedNum === (binary & maskValue)
          if (active) {
            if (check !== used) {
              return "highlight"
            }
          } else {
            return "disable"
          }
        }

        return undefined
      }
    }

    LayoutManager.prototype.resetKeys = function resetKeys() {
      scannedKeys.forEach(function (row, rowIndex) {
        row.forEach(function (element, keyIndex) {
          element.classList.remove("chosen")
          element.classList.remove("highlight")
          element.classList.remove("disable")
        })
      })
    }

    LayoutManager.prototype.checkNext = function checkNext() {
      if (upperCase && !capsLock) {
        upperCase = false
        this.setKeyLayout()
      }
    }

    return LayoutManager
  })()

  var DotManager = (function () {
    var dotArray
    var dot

    function DotManager () {
      dotArray = document.querySelectorAll(".k-binary span")
      dotArray = [].slice.call(dotArray)
    }
  
    DotManager.prototype.updateDot = function updateDot(bitIndex) {
      var dot = dotArray[bitIndex - 1]

      if (switchValue > 0) {    
        dot.classList.remove("off")
        dot.classList.add("on")
      } else {
        dot.classList.remove("on")
        dot.classList.add("off")
      }
    }

    DotManager.prototype.resetDots = function resetDots() {
      dotArray.forEach(function (dot) {
        dot.classList.remove("on")
        dot.classList.remove("off")
        dot.classList.remove("active")
      })

      dot = dotArray[dotArray.length - 1]
      var a = 0
    }

    DotManager.prototype.setDotClass = function setDotClass(bitIndex){
      // Show last dot as off if touch not activated on first pass
      dot.classList.remove("active")
      if (!pass && off) {
        dot.classList.add("off") // does not affect green "go" dot
      }

      // Indicate that the next dot is active
      dot = dotArray[bitIndex]
      if (dot) {
        dot.classList.add("active")
      }
    }
  
    return DotManager
  })()

  var InputManager = (function () {
    var clickStamp
      , clickElement
      , focusElement
      , focusTimeout

    function InputManager() {
      document.addEventListener("keydown", treatKeyDown, false)
      document.addEventListener("mousedown", treatMouseDown, false)
      document.addEventListener("focus", updateFocus, true)
    }

    function treatKeyDown(event) {
      if (focusElement || event.ctrlKey || event.metaKey) {
        // An able user is typing in an input field or using a 
        // keyboard shortcut
        return
      }

      event.preventDefault()
      scanManager.toggleBit()
    }

    function treatMouseDown(event) {
      clickStamp = + new Date()
      clickElement = event.target
      // Assume that an able user is clicking outside a focusable
      // element to give control back to a disabled user
      userIsAble = (clickElement === focusElement)
      if (!userIsAble) {
        focusElement = null
        view.toggleAbleFocus(false)
        if (!scanTimeout) {
          focusTimeout = window.setTimeout(
            scanManager.startLoop
          , FOCUS_DELAY
          )
        }
      }
    }

    function updateFocus(event) {  
      userIsAble = new Date() - clickStamp < FOCUS_DELAY
      if (userIsAble) {
        userIsAble = (event.target === clickElement)
      }

      if (userIsAble) {
        // Focus was moved to a new element by a click: an able user
        // is active     
        view.toggleAbleFocus(true)
        focusElement = clickElement
        window.clearTimeout(scanTimeout)
        window.clearTimeout(focusTimeout)
        scanTimeout = 0
        view.resetDots()
      }
      
    }

    //InputManager.prototype.method = function () {}
    
    return InputManager
  })()

  var ScanManager = (function () {
    var bits
    var actionRatio
    var maxDelay
    var scanDelay
    var actionDelay
    var touched

    function ScanManager(settings) {
      bits = settings.bits
      actionRatio = settings.actionRatio
      maxDelay = settings.maxDelay
      scanDelay = settings.delay
      actionDelay = scanDelay
    }

    ScanManager.prototype.startLoop = function startLoop() {
      var keyObject
        , num
        , maskedNum
        , check
        , className

      actionDelay = scanDelay
      binary = 0
      confirmed = false
      pass = 0

      view.reset()
      initializeLoop()

      function initializeLoop() {
        bitValue = 1 << bits // if bits = 5, bitValue will be 32
        bitIndex = 0
        maskValue = 0

        scanSwitch()
      }

      function scanSwitch(){
        view.setDotClass(bitIndex)
        bitValue >>= 1 // 32 - 16 - 8 - 4 - 2 - 1 - 0
        // If binary contains bitValue, switchValue should be negative
        switchValue = (binary & bitValue) ? -bitValue : bitValue
        bitIndex += 1
        off = true
        touched = false

        view.scanKeys()

        if (bitValue) {
          maskValue += bitValue
          scanTimeout = window.setTimeout(scanSwitch, actionDelay)

        } else {
          input = view.showInput(true)
          scanTimeout = window.setTimeout(checkIfConfirmed, actionDelay)
        }
        
        function checkIfConfirmed() {
          if (confirmed) {
            view.reset()
            scanManager.startLoop()
          } else {
            actionDelay = Math.min(actionDelay * actionRatio, maxDelay)
            pass += 1
            initializeLoop()     
          }
        }
      }
    }

    ScanManager.prototype.toggleBit = function toggleBit() {
      if (touched) {
        return
      }

      touched = true

      if (bitIndex > bits) { 
        actOnInput()
      } else {
        binary += switchValue
        input = view.showInput()
        view.updateDot(bitIndex)
      }

      off = false

      function actOnInput() {
        if (specialAction) {
          doSpecialAction()
        } else {
          view.updateInput()
        }

        input = ""
        confirmed = true

        view.checkNextLayout()
      }

      function doSpecialAction() {
        switch (input) {
          case "#space":
            view.updateInput(" ")
          break
          case "#punctuation":
          case "#numbers":
          case "#more":
            view.setKeyLayout(input)
          break
        }
      }
    }

    return ScanManager
  })()

  var view = new View(settings)
  var inputManager = new InputManager()
  var scanManager = new ScanManager(settings)

  var binary = 0
  var bitValue = 0
  var switchValue = 0
  var maskValue = 0
  var bitIndex = 0
  var off = true // no input for this bit
  var specialAction = false

  var scanTimeout
    , pass
    , confirmed
    , input

  view.setKeyLayout(settings.initial)
  scanManager.startLoop()
})(window, document)