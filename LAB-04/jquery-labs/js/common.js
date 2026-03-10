/**
 * common.js — Shared jQuery Utilities
 * jQuery Labs — Abdul Basit (232001)
 */

$(function () {
  'use strict';

  /* ── Active nav link highlighting ── */
  const currentFile = window.location.pathname.split('/').pop();
  $('a[href="' + currentFile + '"]').addClass('active');

  /* ── Animate any .fade-in-up elements on load ── */
  $('.fade-in-up').css('opacity', 0).each(function (i) {
    const $el = $(this);
    setTimeout(function () {
      $el.animate({ opacity: 1 }, 450);
    }, i * 80);
  });

  /* ── Utility: show a temporary toast notification ── */
  window.showToast = function (message, type) {
    type = type || 'info';
    const colors = {
      info:    '#6c63ff',
      success: '#43e97b',
      error:   '#ff4d6d',
      warning: '#ffd166'
    };

    const $toast = $('<div class="toast-msg"></div>').text(message).css({
      position:     'fixed',
      bottom:       '1.5rem',
      right:        '1.5rem',
      background:   colors[type],
      color:        type === 'success' || type === 'warning' ? '#0f0f1a' : '#fff',
      padding:      '0.75rem 1.25rem',
      borderRadius: '8px',
      fontWeight:   '600',
      fontSize:     '0.88rem',
      zIndex:       9999,
      boxShadow:    '0 8px 24px rgba(0,0,0,0.35)',
      opacity:      0
    });

    $('body').append($toast);
    $toast.animate({ opacity: 1, bottom: '2rem' }, 300)
      .delay(2400)
      .animate({ opacity: 0 }, 300, function () { $(this).remove(); });
  };
});
