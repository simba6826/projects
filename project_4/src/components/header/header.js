var $ = require('jquery');

module.exports = new Vue({
  el: '#header',
  data: {
    menuOpen: false,
    searchActive: false
  },
  methods: {
    menuListToggle: function(e) {
      e.target.previousElementSibling.classList.toggle('menu__list_open');
    },
    toSubList: function(e) {
      console.log(e)
      $('.mobileMenu__firstLevel').addClass('hidden')
      $(e.toElement).parent().parent().find('.mobileMenu__subList').addClass('subListOpen')
    },
    toFirstLevel: function(e) {
      $('.mobileMenu__subList').removeClass('subListOpen')
      $('.mobileMenu__firstLevel').removeClass('hidden')
    }
  }
})