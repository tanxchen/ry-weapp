Component({
  externalClasses: ['custom-class'],
  options: {
    addGlobalClass: true,
  },
  properties: {
    placeholderColorC: {
      type: String
    },
    province: {
      type: String,
      observer (val) {
        this.setData({
          currentProvince: val
        })
      }
    },
    number: {
      type: String,
      observer (val) {
        this.setData({
          currentNumber: val
        })
      }
    }
  },

  data: {
    provinceList: [
      ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑'],
      ['沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫'],
      ['鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵'],
      ['云', '藏', '陕', '甘', '青', '宁', '新', '']
    ],
    keyboardList: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['UP', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
    ],
    isProvince: true,
    isShowProvinceKeyboard: false,
    isShowNumberKeyboard: false,
    currentProvince: '沪',
    currentNumber: '',
    isColseText: true,
    tipText: 'D',
    tipTop: 0,
    tipLeft: 0,
    isShowTipBlock: false
  },

  methods: {
    stopProp () {
      return false
    },
    hideKeyboard () {
      this.cilicMark()
    },
    delCurrentNumber() {
      this.setData({
        currentNumber: this.data.currentNumber.slice(0, 1)
      })
    },

    clickNumber(e) {
      const val = e.target.dataset.val

      if (
        val === 'UP' ||
        (val !== 0 && !val) ||
        (val === 'DEL' && !this.data.currentNumber) ||
        ((val === 'I' || val === 'O') && this.data.currentNumber.length === 1) ||
        (!this.data.currentNumber.length && typeof val === 'number')
      ) return

      if (val !== 'DEL' && val !== 'UP') {
        this.setData({
          tipText: val,
          tipTop: e.detail.y - 56,
          tipLeft: e.target.offsetLeft ? e.target.offsetLeft : e.detail.x - 4,
          isShowTipBlock: true
        })

        setTimeout(() => {
          this.setData({
            isShowTipBlock: false
          })
        }, 250)
      }

      if ((val !== 'DEL' && this.data.currentNumber.length >= 7)) return

      const result = val === 'DEL' ? this.data.currentNumber.slice(0, -1) : this.data.currentNumber + val

      if ((result.length >= 6 && this.data.isColseText) || (result.length < 7 && !this.data.isColseText)) {
        this.setData({
          isColseText: !this.data.isColseText
          // currentNumber: result
        })
      }

      this.$emit('change', { number: result })
    },

    clickProvince(e) {
      const val = e.target.dataset.val
      if (val) {
        this.setData({
          // currentProvince: val,
          isShowProvinceKeyboard: false,
          isShowNumberKeyboard: true
        })
        this.$emit('change', { province: val })
      }
    },

    showNumber(e) {
      this.setData({
        isShowNumberKeyboard: true,
        isShowProvinceKeyboard: false
      })
    },

    showProvince(e) {
      this.setData({
        isShowProvinceKeyboard: true,
        isShowNumberKeyboard: false
      })
    },

    cilicMark(e) {
      if (this.data.isShowProvinceKeyboard || this.data.isShowNumberKeyboard) {
        this.setData({
          isShowProvinceKeyboard: false,
          isShowNumberKeyboard: false
        })
      }
    },
    $emit() {
      this.triggerEvent.apply(this, arguments)
    }
  }
})