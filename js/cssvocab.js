$(document).ready(function() {
  var vocab = [
    {
      'tokenName': 'comment',
      'humanName': '注释（Comment）',
      'url': '#cccc'
    },
    {
      'tokenName': 'statement',
      'humanName': '语句（Statement）',
      'url': ''
    },
    {
      'tokenName': 'rule-set',
      'humanName': '规则集（Rule-set）',
      'url': ''
    },
    {
      'tokenName': 'at-rule',
      'humanName': 'At 规则（At-rule）',
      'url': ''
    },
    {
      'tokenName': 'media-query',
      'humanName': '媒体查询（Media query）',
      'url': ''
    },
    {
      'tokenName': 'media-query-list',
      'humanName': '媒体查询列表（Media query list）',
      'url': ''
    },

    {
      'tokenName': 'media-type',
      'humanName': '媒体类型（Media type）',
      'url': ''
    },
    {
      'tokenName': 'expression',
      'humanName': '表达式（Expression）',
      'url': ''
    },
    {
      'tokenName': 'media-feature',
      'humanName': '媒体特性（Media feature）',
      'url': 'http://www.w3.org/html/ig/zh/wiki/Css3-mediaqueries#.E5.AA.92.E4.BD.93.E7.89.B9.E6.80.A7'
    },
    {
      'tokenName': 'block',
      'humanName': '块（Block）',
      'url': ''
    },
    {
      'tokenName': 'declaration-block',
      'humanName': '声明块（Declaration block）',
      'url': ''
    },
    {
      'tokenName': 'selector',
      'humanName': '选择器（Selector）',
      'url': ''
    },
    {
      'tokenName': 'simple-selector',
      'humanName': '简单选择器（Simple selector）',
      'url': ''
    },
    {
      'tokenName': 'universal-selector',
      'humanName': '通用选择器（Universal selector）',
      'url': ''
    },
    {
      'tokenName': 'id-selector',
      'humanName': 'ID 选择器（ID selector）',
      'url': ''
    },
    {
      'tokenName': 'class-selector',
      'humanName': '类选择器（Class selector）',
      'url': ''
    },
    {
      'tokenName': 'attribute-selector',
      'humanName': '属性选择器（Attribute selector）',
      'url': ''
    },
    {
      'tokenName': 'pseudo-class',
      'humanName': '伪类（Pseudo-class）',
      'url': ''
    },
    {
      'tokenName': 'pseudo-element',
      'humanName': '伪元素（Pseudo-element）',
      'url': ''
    },
    {
      'tokenName': 'combinator',
      'humanName': '连接符/结合符（Combinator）',
      'url': ''
    },
    {
      'tokenName': 'descendant-combinator',
      'humanName': '后代选择器（Descendant combinator）',
      'url': ''
    },
    {
      'tokenName': 'child-combinator',
      'humanName': '子选择器（Child combinator）',
      'url': ''
    },
    {
      'tokenName': 'adjacent-sibling-combinator',
      'humanName': '相邻选择器（Adjacent sibling combinator）',
      'url': ''
    },
    {
      'tokenName': 'general-sibling-combinator',
      'humanName': '普通兄弟选择器（General sibling combinator）',
      'url': ''
    },
    {
      'tokenName': 'declaration',
      'humanName': '声明（Declaration）',
      'url': ''
    },
    {
      'tokenName': 'property',
      'humanName': '属性（Property）',
      'url': ''
    },
    {
      'tokenName': 'value',
      'humanName': '值（Value）',
      'url': ''
    },
    {
      'tokenName': 'function',
      'humanName': '函数（Function）',
      'url': ''
    },
    {
      'tokenName': 'keyword',
      'humanName': '关键字（Keyword）',
      'url': ''
    },
    {
      'tokenName': 'identifier',
      'humanName': '标识(biāo zhì)符（Identifier）',
      'url': ''
    },
    {
      'tokenName': 'string',
      'humanName': '字符串（String）',
      'url': ''
    },
    {
      'tokenName': 'url',
      'humanName': 'URL',
      'url': ''
    },
    {
      'tokenName': 'number',
      'humanName': '数值（Number）',
      'url': ''
    },
    {
      'tokenName': 'percentage',
      'humanName': '百分数（Percentage）',
      'url': ''
    },
    {
      'tokenName': 'length',
      'humanName': '长度（Length）',
      'url': ''
    },
    {
      'tokenName': 'unit',
      'humanName': '单位（Unit）',
      'url': ''
    },
    {
      'tokenName': 'color',
      'humanName': '颜色（Color）',
      'url': ''
    },
    {
      'tokenName': 'vendor-prefix',
      'humanName': '前缀（Vendor prefix）',
      'url': ''
    },
  ];

  //Build vocab list in the sidebar
  function buildVocabList (vocab) {
    for (var i = 0; i < vocab.length; i++) {
      text = vocab[i].humanName;
      token = vocab[i].tokenName;
      $('.vocabList').append('<li class="'+token+'" tabindex="0">'+text+'</li>');
    }
  }
  buildVocabList(vocab);

  /*
    build css selectors that select:
    - all tokens in the app
    - tokens in css panel and
    - tokens in vocabList
  */
  function buildSelectors (obj) {
    var all = '';
    var css = '';
    var vocab = '';
    obj.forEach(function (item, i, obj) {
      var name = item.tokenName;
      all = all + '.' + name + ',';
      css = css + '.css .' + name + ',';
      vocab = vocab + '.vocabList .' + name + ',';
    });
    // Remove the trailing comma in each selector string
    all = all.slice(0, -1);
    css = css.slice(0, -1);
    vocab = vocab.slice(0, -1);
    return {'allTokens': all, 'cssTokens': css, 'vocabTokens': vocab};
  }
  var selectors = buildSelectors(vocab);

  $(selectors.cssTokens).on('mouseover', function(event) {
    event.stopPropagation();
    $('.hover').removeClass('hover');
    $(this).addClass('hover');
  });

  $(selectors.cssTokens).on('focus click', function(event) {
    event.stopPropagation();

    $('.content').addClass('focus');
    $('.sidebar').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var pals = whatIsThis.split(' ');
    var $cssPals = $('.css ' + '.' + pals.join('.'));
    var vocabPalsSelector = '.vocabList .' + pals.join(', .vocabList .');
    $vocabPals = $(vocabPalsSelector);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
    $vocabPals.addClass('selected');
  });

  $(selectors.vocabTokens).on('focus click', function(event) {
    event.stopPropagation();

    $('.sidebar').addClass('focus');
    $('.content').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var $cssPals = $('.css .' + whatIsThis);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
  });

  $(selectors.allTokens).attr('tabindex', '0');
  //$('.vocabList .property').focus();

  key('up', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.prev().focus();
    }
  });
  key('down', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.next().focus();
    }
  });

  $('.sidebar-hide-btn').on('click touchstart', function(event) {
    event.preventDefault();
    $('body').addClass('sidebar-hide');
  });
  $('.sidebar-show-btn').on('click touchstart', function(event) {
    event.preventDefault();
    $('body').removeClass('sidebar-hide');
  });

});
