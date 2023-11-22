// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE


// SAS mode copyright (c) 2016 Jared Dean, SAS Institute
// Created by Jared Dean

// TODO
// indent and de-indent
// identify macro variables


//Definitions
//  comment -- text within * ; or /* */
//  keyword -- SAS language variable
//  variable -- macro variables starts with '&' or variable formats
//  variable-2 -- DATA Step, proc, or macro names
//  string -- text within ' ' or " "
//  operator -- numeric operator + / - * ** le eq ge ... and so on
//  builtin -- proc %macro data run mend
//  atom
//  def

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineMode("sas", function () {
    var words = {};
    var isDoubleOperatorSym = {
      eq: 'operator',
      lt: 'operator',
      le: 'operator',
      gt: 'operator',
      ge: 'operator',
      "in": 'operator',
      ne: 'operator',
      or: 'operator'
    };
    var isDoubleOperatorChar = /(<=|>=|!=|<>)/;
    var isSingleOperatorChar = /[=\(:\),{}.*<>+\-\/^\[\]]/;

    // Takes a string of words separated by spaces and adds them as
    // keys with the value of the first argument 'style'
    function define(style, string, context) {
      if (context) {
        var split = string.split(' ');
        for (var i = 0; i < split.length; i++) {
          words[split[i]] = {style: style, state: context};
        }
      }
    }
    //datastep
    define('def', 'stack pgm view source debug nesting nolist', ['inDataStep']);
    define('def', 'if while until for do do; end end; then else cancel', ['inDataStep']);
    define('def', 'label format _n_ _error_', ['inDataStep']);
    define('def', 'ALTER BUFNO BUFSIZE CNTLLEV COMPRESS DLDMGACTION ENCRYPT ENCRYPTKEY EXTENDOBSCOUNTER GENMAX GENNUM INDEX LABEL OBSBUF OUTREP PW PWREQ READ REPEMPTY REPLACE REUSE ROLE SORTEDBY SPILL TOBSNO TYPE WRITE FILECLOSE FIRSTOBS IN OBS POINTOBS WHERE WHEREUP IDXNAME IDXWHERE DROP KEEP RENAME', ['inDataStep']);
    define('def', 'filevar finfo finv fipname fipnamel fipstate first firstobs floor', ['inDataStep']);
    define('def', 'varfmt varinfmt varlabel varlen varname varnum varray varrayx vartype verify vformat vformatd vformatdx vformatn vformatnx vformatw vformatwx vformatx vinarray vinarrayx vinformat vinformatd vinformatdx vinformatn vinformatnx vinformatw vinformatwx vinformatx vlabel vlabelx vlength vlengthx vname vnamex vnferr vtype vtypex weekday', ['inDataStep']);
    define('def', 'zipfips zipname zipnamel zipstate', ['inDataStep']);
    define('def', 'put putc putn', ['inDataStep']);
    define('builtin', 'data run', ['inDataStep']);


    //proc
    define('def', 'data', ['inProc']);

    // flow control for macros
    define('def', '%if %end %end; %else %else; %do %do; %then', ['inMacro']);

    //everywhere
    define('builtin', 'proc run; quit; libname filename %macro %mend option options', ['ALL']);

    define('def', 'footnote title libname ods', ['ALL']);
    define('def', '%let %put %global %sysfunc %eval ', ['ALL']);
    // automatic macro variables http://support.sas.com/documentation/cdl/en/mcrolref/61885/HTML/default/viewer.htm#a003167023.htm
    define('variable', '&sysbuffr &syscc &syscharwidth &syscmd &sysdate &sysdate9 &sysday &sysdevic &sysdmg &sysdsn &sysencoding &sysenv &syserr &syserrortext &sysfilrc &syshostname &sysindex &sysinfo &sysjobid &syslast &syslckrc &syslibrc &syslogapplname &sysmacroname &sysmenv &sysmsg &sysncpu &sysodspath &sysparm &syspbuff &sysprocessid &sysprocessname &sysprocname &sysrc &sysscp &sysscpl &sysscpl &syssite &sysstartid &sysstartname &systcpiphostname &systime &sysuserid &sysver &sysvlong &sysvlong4 &syswarningtext', ['ALL']);

    //footnote[1-9]? title[1-9]?

    //options statement
    define('def', 'source2 nosource2 page pageno pagesize', ['ALL']);

    //proc and datastep
    define('def', '_all_ _character_ _cmd_ _freq_ _i_ _infile_ _last_ _msg_ _null_ _numeric_ _temporary_ _type_ abort abs addr adjrsq airy alpha alter altlog altprint and arcos array arsin as atan attrc attrib attrn authserver autoexec awscontrol awsdef awsmenu awsmenumerge awstitle backward band base betainv between blocksize blshift bnot bor brshift bufno bufsize bxor by byerr byline byte calculated call cards cards4 catcache cbufno cdf ceil center cexist change chisq cinv class cleanup close cnonct cntllev coalesce codegen col collate collin column comamid comaux1 comaux2 comdef compbl compound compress config continue convert cos cosh cpuid create cross crosstab css curobs cv daccdb daccdbsl daccsl daccsyd dacctab dairy datalines datalines4 datejul datepart datetime day dbcslang dbcstype dclose ddfm ddm delete delimiter depdb depdbsl depsl depsyd deptab dequote descending descript design= device dflang dhms dif digamma dim dinfo display distinct dkricond dkrocond dlm dnum do dopen doptname doptnum dread drop dropnote dsname dsnferr echo else emaildlg emailid emailpw emailserver emailsys encrypt end endsas engine eof eov erf erfc error errorcheck errors exist exp fappend fclose fcol fdelete feedback fetch fetchobs fexist fget file fileclose fileexist filefmt filename fileref  fmterr fmtsearch fnonct fnote font fontalias  fopen foptname foptnum force formatted formchar formdelim formdlim forward fpoint fpos fput fread frewind frlen from fsep fuzz fwrite gaminv gamma getoption getvarc getvarn go goto group gwindow hbar hbound helpenv helploc hms honorappearance hosthelp hostprint hour hpct html hvar ibessel ibr id if index indexc indexw initcmd initstmt inner input inputc inputn inr insert int intck intnx into intrr invaliddata irr is jbessel join juldate keep kentb kurtosis label lag last lbound leave left length levels lgamma lib  library libref line linesize link list log log10 log2 logpdf logpmf logsdf lostcard lowcase lrecl ls macro macrogen maps mautosource max maxdec maxr mdy mean measures median memtype merge merror min minute missing missover mlogic mod mode model modify month mopen mort mprint mrecall msglevel msymtabmax mvarsize myy n nest netpv new news nmiss no nobatch nobs nocaps nocardimage nocenter nocharcode nocmdmac nocol nocum nodate nodbcs nodetails nodmr nodms nodmsbatch nodup nodupkey noduplicates noechoauto noequals noerrorabend noexitwindows nofullstimer noicon noimplmac noint nolist noloadlist nomiss nomlogic nomprint nomrecall nomsgcase nomstored nomultenvappl nonotes nonumber noobs noovp nopad nopercent noprint noprintinit normal norow norsasuser nosetinit  nosplash nosymbolgen note notes notitle notitles notsorted noverbose noxsync noxwait npv null number numkeys nummousekeys nway obs  on open     order ordinal otherwise out outer outp= output over ovp p(1 5 10 25 50 75 90 95 99) pad pad2  paired parm parmcards path pathdll pathname pdf peek peekc pfkey pmf point poisson poke position printer probbeta probbnml probchi probf probgam probhypr probit probnegb probnorm probsig probt procleave prt ps  pw pwreq qtr quote r ranbin rancau random ranexp rangam range ranks rannor ranpoi rantbl rantri ranuni rcorr read recfm register regr remote remove rename repeat repeated replace resolve retain return reuse reverse rewind right round rsquare rtf rtrace rtraceloc s s2 samploc sasautos sascontrol sasfrscr sasmsg sasmstore sasscript sasuser saving scan sdf second select selection separated seq serror set setcomm setot sign simple sin sinh siteinfo skewness skip sle sls sortedby sortpgm sortseq sortsize soundex  spedis splashlocation split spool sqrt start std stderr stdin stfips stimer stname stnamel stop stopover sub subgroup subpopn substr sum sumwgt symbol symbolgen symget symput sysget sysin sysleave sysmsg sysparm sysprint sysprintfont sysprod sysrc system t table tables tan tanh tapeclose tbufsize terminal test then timepart tinv  tnonct to today tol tooldef totper transformout translate trantab tranwrd trigamma trim trimn trunc truncover type unformatted uniform union until upcase update user usericon uss validate value var  weight when where while wincharset window work workinit workterm write wsum xsync xwait yearcutoff yes yyq  min max', ['inDataStep', 'inProc']);
    define('operator', 'and not ', ['inDataStep', 'inProc']);

    // Main function
    function tokenize(stream, state) {
      // Finally advance the stream
      var ch = stream.next();

      // BLOCKCOMMENT
      if (ch === '/' && stream.eat('*')) {
        state.continueComment = true;
        return "comment";
      } else if (state.continueComment === true) { // in comment block
        //comment ends at the beginning of the line
        if (ch === '*' && stream.peek() === '/') {
          stream.next();
          state.continueComment = false;
        } else if (stream.skipTo('*')) { //comment is potentially later in line
          stream.skipTo('*');
          stream.next();
          if (stream.eat('/'))
            state.continueComment = false;
        } else {
          stream.skipToEnd();
        }
        return "comment";
      }

      if (ch == "*" && stream.column() == stream.indentation()) {
        stream.skipToEnd()
        return "comment"
      }

      // DoubleOperator match
      var doubleOperator = ch + stream.peek();

      if ((ch === '"' || ch === "'") && !state.continueString) {
        state.continueString = ch
        return "string"
      } else if (state.continueString) {
        if (state.continueString == ch) {
          state.continueString = null;
        } else if (stream.skipTo(state.continueString)) {
          // quote found on this line
          stream.next();
          state.continueString = null;
        } else {
          stream.skipToEnd();
        }
        return "string";
      } else if (state.continueString !== null && stream.eol()) {
        stream.skipTo(state.continueString) || stream.skipToEnd();
        return "string";
      } else if (/[\d\.]/.test(ch)) { //find numbers
        if (ch === ".")
          stream.match(/^[0-9]+([eE][\-+]?[0-9]+)?/);
        else if (ch === "0")
          stream.match(/^[xX][0-9a-fA-F]+/) || stream.match(/^0[0-7]+/);
        else
          stream.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/);
        return "number";
      } else if (isDoubleOperatorChar.test(ch + stream.peek())) { // TWO SYMBOL TOKENS
        stream.next();
        return "operator";
      } else if (isDoubleOperatorSym.hasOwnProperty(doubleOperator)) {
        stream.next();
        if (stream.peek() === ' ')
          return isDoubleOperatorSym[doubleOperator.toLowerCase()];
      } else if (isSingleOperatorChar.test(ch)) { // SINGLE SYMBOL TOKENS
        return "operator";
      }

      // Matches one whole word -- even if the word is a character
      var word;
      if (stream.match(/[%&;\w]+/, false) != null) {
        word = ch + stream.match(/[%&;\w]+/, true);
        if (/&/.test(word)) return 'variable'
      } else {
        word = ch;
      }
      // the word after DATA PROC or MACRO
      if (state.nextword) {
        stream.match(/[\w]+/);
        // match memname.libname
        if (stream.peek() === '.') stream.skipTo(' ');
        state.nextword = false;
        return 'variable-2';
      }

      word = word.toLowerCase()
      // Are we in a DATA Step?
      if (state.inDataStep) {
        if (word === 'run;' || stream.match(/run\s;/)) {
          state.inDataStep = false;
          return 'builtin';
        }
        // variable formats
        if ((word) && stream.next() === '.') {
          //either a format or libname.memname
          if (/\w/.test(stream.peek())) return 'variable-2';
          else return 'variable';
        }
        // do we have a DATA Step keyword
        if (word && words.hasOwnProperty(word) &&
            (words[word].state.indexOf("inDataStep") !== -1 ||
             words[word].state.indexOf("ALL") !== -1)) {
          //backup to the start of the word
          if (stream.start < stream.pos)
            stream.backUp(stream.pos - stream.start);
          //advance the length of the word and return
          for (var i = 0; i < word.length; ++i) stream.next();
          return words[word].style;
        }
      }
      // Are we in an Proc statement?
      if (state.inProc) {
        if (word === 'run;' || word === 'quit;') {
          state.inProc = false;
          return 'builtin';
        }
        // do we have a proc keyword
        if (word && words.hasOwnProperty(word) &&
            (words[word].state.indexOf("inProc") !== -1 ||
             words[word].state.indexOf("ALL") !== -1)) {
          stream.match(/[\w]+/);
          return words[word].style;
        }
      }
      // Are we in a Macro statement?
      if (state.inMacro) {
        if (word === '%mend') {
          if (stream.peek() === ';') stream.next();
          state.inMacro = false;
          return 'builtin';
        }
        if (word && words.hasOwnProperty(word) &&
            (words[word].state.indexOf("inMacro") !== -1 ||
             words[word].state.indexOf("ALL") !== -1)) {
          stream.match(/[\w]+/);
          return words[word].style;
        }

        return 'atom';
      }
      // Do we have Keywords specific words?
      if (word && words.hasOwnProperty(word)) {
        // Negates the initial next()
        stream.backUp(1);
        // Actually move the stream
        stream.match(/[\w]+/);
        if (word === 'data' && /=/.test(stream.peek()) === false) {
          state.inDataStep = true;
          state.nextword = true;
          return 'builtin';
        }
        if (word === 'proc') {
          state.inProc = true;
          state.nextword = true;
          return 'builtin';
        }
        if (word === '%macro') {
          state.inMacro = true;
          state.nextword = true;
          return 'builtin';
        }
        if (/title[1-9]/.test(word)) return 'def';

        if (word === 'footnote') {
          stream.eat(/[1-9]/);
          return 'def';
        }

        // Returns their value as state in the prior define methods
        if (state.inDataStep === true && words[word].state.indexOf("inDataStep") !== -1)
          return words[word].style;
        if (state.inProc === true && words[word].state.indexOf("inProc") !== -1)
          return words[word].style;
        if (state.inMacro === true && words[word].state.indexOf("inMacro") !== -1)
          return words[word].style;
        if (words[word].state.indexOf("ALL") !== -1)
          return words[word].style;
        return null;
      }
      // Unrecognized syntax
      return null;
    }

    return {
      startState: function () {
        return {
          inDataStep: false,
          inProc: false,
          inMacro: false,
          nextword: false,
          continueString: null,
          continueComment: false
        };
      },
      token: function (stream, state) {
        // Strip the spaces, but regex will account for them either way
        if (stream.eatSpace()) return null;
        // Go through the main process
        return tokenize(stream, state);
      },

      blockCommentStart: "/*",
      blockCommentEnd: "*/"
    };

  });

  CodeMirror.defineMIME("text/x-sas", "sas");
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                // CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// Yacas mode copyright (c) 2015 by Grzegorz Mazur
// Loosely based on mathematica mode by Calin Barbat

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode('yacas', function(_config, _parserConfig) {

  function words(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }

  var bodiedOps = words("Assert BackQuote D Defun Deriv For ForEach FromFile " +
                        "FromString Function Integrate InverseTaylor Limit " +
                        "LocalSymbols Macro MacroRule MacroRulePattern " +
                        "NIntegrate Rule RulePattern Subst TD TExplicitSum " +
                        "TSum Taylor Taylor1 Taylor2 Taylor3 ToFile " +
                        "ToStdout ToString TraceRule Until While");

  // patterns
  var pFloatForm  = "(?:(?:\\.\\d+|\\d+\\.\\d*|\\d+)(?:[eE][+-]?\\d+)?)";
  var pIdentifier = "(?:[a-zA-Z\\$'][a-zA-Z0-9\\$']*)";

  // regular expressions
  var reFloatForm    = new RegExp(pFloatForm);
  var reIdentifier   = new RegExp(pIdentifier);
  var rePattern      = new RegExp(pIdentifier + "?_" + pIdentifier);
  var reFunctionLike = new RegExp(pIdentifier + "\\s*\\(");

  function tokenBase(stream, state) {
    var ch;

    // get next character
    ch = stream.next();

    // string
    if (ch === '"') {
      state.tokenize = tokenString;
      return state.tokenize(stream, state);
    }

    // comment
    if (ch === '/') {
      if (stream.eat('*')) {
        state.tokenize = tokenComment;
        return state.tokenize(stream, state);
      }
      if (stream.eat("/")) {
        stream.skipToEnd();
        return "comment";
      }
    }

    // go back one character
    stream.backUp(1);

    // update scope info
    var m = stream.match(/^(\w+)\s*\(/, false);
    if (m !== null && bodiedOps.hasOwnProperty(m[1]))
      state.scopes.push('bodied');

    var scope = currentScope(state);

    if (scope === 'bodied' && ch === '[')
      state.scopes.pop();

    if (ch === '[' || ch === '{' || ch === '(')
      state.scopes.push(ch);

    scope = currentScope(state);

    if (scope === '[' && ch === ']' ||
        scope === '{' && ch === '}' ||
        scope === '(' && ch === ')')
      state.scopes.pop();

    if (ch === ';') {
      while (scope === 'bodied') {
        state.scopes.pop();
        scope = currentScope(state);
      }
    }

    // look for ordered rules
    if (stream.match(/\d+ *#/, true, false)) {
      return 'qualifier';
    }

    // look for numbers
    if (stream.match(reFloatForm, true, false)) {
      return 'number';
    }

    // look for placeholders
    if (stream.match(rePattern, true, false)) {
      return 'variable-3';
    }

    // match all braces separately
    if (stream.match(/(?:\[|\]|{|}|\(|\))/, true, false)) {
      return 'bracket';
    }

    // literals looking like function calls
    if (stream.match(reFunctionLike, true, false)) {
      stream.backUp(1);
      return 'variable';
    }

    // all other identifiers
    if (stream.match(reIdentifier, true, false)) {
      return 'variable-2';
    }

    // operators; note that operators like @@ or /; are matched separately for each symbol.
    if (stream.match(/(?:\\|\+|\-|\*|\/|,|;|\.|:|@|~|=|>|<|&|\||_|`|'|\^|\?|!|%|#)/, true, false)) {
      return 'operator';
    }

    // everything else is an error
    return 'error';
  }

  function tokenString(stream, state) {
    var next, end = false, escaped = false;
    while ((next = stream.next()) != null) {
      if (next === '"' && !escaped) {
        end = true;
        break;
      }
      escaped = !escaped && next === '\\';
    }
    if (end && !escaped) {
      state.tokenize = tokenBase;
    }
    return 'string';
  };

  function tokenComment(stream, state) {
    var prev, next;
    while((next = stream.next()) != null) {
      if (prev === '*' && next === '/') {
        state.tokenize = tokenBase;
        break;
      }
      prev = next;
    }
    return 'comment';
  }

  function currentScope(state) {
    var scope = null;
    if (state.scopes.length > 0)
      scope = state.scopes[state.scopes.length - 1];
    return scope;
  }

  return {
    startState: function() {
      return {
        tokenize: tokenBase,
        scopes: []
      };
    },
    token: function(stream, state) {
      if (stream.eatSpace()) return null;
      return state.tokenize(stream, state);
    },
    indent: function(state, textAfter) {
      if (state.tokenize !== tokenBase && state.tokenize !== null)
        return CodeMirror.Pass;

      var delta = 0;
      if (textAfter === ']' || textAfter === '];' ||
          textAfter === '}' || textAfter === '};' ||
          textAfter === ');')
        delta = -1;

      return (state.scopes.length + delta) * _config.indentUnit;
    },
    electricChars: "{}[]();",
    blockCommentStart: "/*",
    blockCommentEnd: "*/",
    lineComment: "//"
  };
});

CodeMirror.defineMIME('text/x-yacas', {
  name: 'yacas'
});

});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             /*
  MDN-LIKE Theme - Mozilla
  Ported to CodeMirror by Peter Kroon <plakroon@gmail.com>
  Report bugs/issues here: https://github.com/codemirror/CodeMirror/issues
  GitHub: @peterkroon

  The mdn-like theme is inspired on the displayed code examples at: https://developer.mozilla.org/en-US/docs/Web/CSS/animation

*/
.cm-s-mdn-like.CodeMirror { color: #999; background-color: #fff; }
.cm-s-mdn-like div.CodeMirror-selected { background: #cfc; }
.cm-s-mdn-like .CodeMirror-line::selection, .cm-s-mdn-like .CodeMirror-line > span::selection, .cm-s-mdn-like .CodeMirror-line > span > span::selection { background: #cfc; }
.cm-s-mdn-like .CodeMirror-line::-moz-selection, .cm-s-mdn-like .CodeMirror-line > span::-moz-selection, .cm-s-mdn-like .CodeMirror-line > span > span::-moz-selection { background: #cfc; }

.cm-s-mdn-like .CodeMirror-gutters { background: #f8f8f8; border-left: 6px solid rgba(0,83,159,0.65); color: #333; }
.cm-s-mdn-like .CodeMirror-linenumber { color: #aaa; padding-left: 8px; }
.cm-s-mdn-like .CodeMirror-cursor { border-left: 2px solid #222; }

.cm-s-mdn-like .cm-keyword { color: #6262FF; }
.cm-s-mdn-like .cm-atom { color: #F90; }
.cm-s-mdn-like .cm-number { color:  #ca7841; }
.cm-s-mdn-like .cm-def { color: #8DA6CE; }
.cm-s-mdn-like span.cm-variable-2, .cm-s-mdn-like span.cm-tag { color: #690; }
.cm-s-mdn-like span.cm-variable-3, .cm-s-mdn-like span.cm-def, .cm-s-mdn-like span.cm-type { color: #07a; }

.cm-s-mdn-like .cm-variable { color: #07a; }
.cm-s-mdn-like .cm-property { color: #905; }
.cm-s-mdn-like .cm-qualifier { color: #690; }

.cm-s-mdn-like .cm-operator { color: #cda869; }
.cm-s-mdn-like .cm-comment { color:#777; font-weight:normal; }
.cm-s-mdn-like .cm-string { color:#07a; font-style:italic; }
.cm-s-mdn-like .cm-string-2 { color:#bd6b18; } /*?*/
.cm-s-mdn-like .cm-meta { color: #000; } /*?*/
.cm-s-mdn-like .cm-builtin { color: #9B7536; } /*?*/
.cm-s-mdn-like .cm-tag { color: #997643; }
.cm-s-mdn-like .cm-attribute { color: #d6bb6d; } /*?*/
.cm-s-mdn-like .cm-header { color: #FF6400; }
.cm-s-mdn-like .cm-hr { color: #AEAEAE; }
.cm-s-mdn-like .cm-link { color:#ad9361; font-style:italic; text-decoration:none; }
.cm-s-mdn-like .cm-error { border-bottom: 1px solid red; }

div.cm-s-mdn-like .CodeMirror-activeline-background { background: #efefff; }
div.cm-s-mdn-like span.CodeMirror-matchingbracket { outline:1px solid grey; color: inherit; }

.cm-s-mdn-like.CodeMirror { background-image: url(data:image/png;base64,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); }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    /*!
 DataTables Bootstrap 4 integration
 ©2011-2017 SpryMedia Ltd - datatables.net/license
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var e=a.length,d=0;d<e;d++){var f=a[d];if(b.call(c,f,d,a))return{i:d,v:f}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};
$jscomp.polyfill=function(a,b,c,e){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,e):$jscomp.polyfillUnisolated(a,b,c,e))};$jscomp.polyfillUnisolated=function(a,b,c,e){c=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var d=a[e];if(!(d in c))return;c=c[d]}a=a[a.length-1];e=c[a];b=b(e);b!=e&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,e){var d=a.split(".");a=1===d.length;e=d[0];e=!a&&e in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<d.length-1;f++){var l=d[f];if(!(l in e))return;e=e[l]}d=d[d.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?e[d]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,d,{configurable:!0,writable:!0,value:b}):b!==c&&($jscomp.propertyToPolyfillSymbol[d]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(d):$jscomp.POLYFILL_PREFIX+d,d=
$jscomp.propertyToPolyfillSymbol[d],$jscomp.defineProperty(e,d,{configurable:!0,writable:!0,value:b})))};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(b,c){return $jscomp.findInternal(this,b,c).v}},"es6","es3");
(function(a){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(b){return a(b,window,document)}):"object"===typeof exports?module.exports=function(b,c){b||(b=window);c&&c.fn.dataTable||(c=require("datatables.net")(b,c).$);return a(c,b,b.document)}:a(jQuery,window,document)})(function(a,b,c,e){var d=a.fn.dataTable;a.extend(!0,d.defaults,{dom:"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
renderer:"bootstrap"});a.extend(d.ext.classes,{sWrapper:"dataTables_wrapper dt-bootstrap4",sFilterInput:"form-control form-control-sm",sLengthSelect:"custom-select custom-select-sm form-control form-control-sm",sProcessing:"dataTables_processing card",sPageButton:"paginate_button page-item"});d.ext.renderer.pageButton.bootstrap=function(f,l,A,B,m,t){var u=new d.Api(f),C=f.oClasses,n=f.oLanguage.oPaginate,D=f.oLanguage.oAria.paginate||{},h,k,v=0,y=function(q,w){var x,E=function(p){p.preventDefault();
a(p.currentTarget).hasClass("disabled")||u.page()==p.data.action||u.page(p.data.action).draw("page")};var r=0;for(x=w.length;r<x;r++){var g=w[r];if(Array.isArray(g))y(q,g);else{k=h="";switch(g){case "ellipsis":h="&#x2026;";k="disabled";break;case "first":h=n.sFirst;k=g+(0<m?"":" disabled");break;case "previous":h=n.sPrevious;k=g+(0<m?"":" disabled");break;case "next":h=n.sNext;k=g+(m<t-1?"":" disabled");break;case "last":h=n.sLast;k=g+(m<t-1?"":" disabled");break;default:h=g+1,k=m===g?"active":""}if(h){var F=
a("<li>",{"class":C.sPageButton+" "+k,id:0===A&&"string"===typeof g?f.sTableId+"_"+g:null}).append(a("<a>",{href:"#","aria-controls":f.sTableId,"aria-label":D[g],"data-dt-idx":v,tabindex:f.iTabIndex,"class":"page-link"}).html(h)).appendTo(q);f.oApi._fnBindAction(F,{action:g},E);v++}}}};try{var z=a(l).find(c.activeElement).data("dt-idx")}catch(q){}y(a(l).empty().html('<ul class="pagination"/>').children("ul"),B);z!==e&&a(l).find("[data-dt-idx="+z+"]").trigger("focus")};return d});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        /*!
 RowGroup 1.1.3
 ©2017-2021 SpryMedia Ltd - datatables.net/license
*/
(function(c){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(f){return c(f,window,document)}):"object"===typeof exports?module.exports=function(f,i){f||(f=window);if(!i||!i.fn.dataTable)i=require("datatables.net")(f,i).$;return c(i,f,f.document)}:c(jQuery,window,document)})(function(c,f,i,k){var d=c.fn.dataTable,g=function(a,b){if(!d.versionCheck||!d.versionCheck("1.10.8"))throw"RowGroup requires DataTables 1.10.8 or newer";this.c=c.extend(!0,{},d.defaults.rowGroup,
g.defaults,b);this.s={dt:new d.Api(a)};this.dom={};var m=this.s.dt.settings()[0],e=m.rowGroup;if(e)return e;m.rowGroup=this;this._constructor()};c.extend(g.prototype,{dataSrc:function(a){if(a===k)return this.c.dataSrc;var b=this.s.dt;this.c.dataSrc=a;c(b.table().node()).triggerHandler("rowgroup-datasrc.dt",[b,a]);return this},disable:function(){this.c.enable=!1;return this},enable:function(a){if(!1===a)return this.disable();this.c.enable=!0;return this},enabled:function(){return this.c.enable},_constructor:function(){var a=
this,b=this.s.dt,m=b.settings()[0];b.on("draw.dtrg",function(b,c){a.c.enable&&m===c&&a._draw()});b.on("column-visibility.dt.dtrg responsive-resize.dt.dtrg",function(){a._adjustColspan()});b.on("destroy",function(){b.off(".dtrg")})},_adjustColspan:function(){c("tr."+this.c.className,this.s.dt.table().body()).find("td:visible").attr("colspan",this._colspan())},_colspan:function(){return this.s.dt.columns().visible().reduce(function(a,b){return a+b},0)},_draw:function(){var a=this._group(0,this.s.dt.rows({page:"current"}).indexes());
this._groupDisplay(0,a)},_group:function(a,b){for(var c=Array.isArray(this.c.dataSrc)?this.c.dataSrc:[this.c.dataSrc],e=d.ext.oApi._fnGetObjectDataFn(c[a]),f=this.s.dt,j,g,l=[],h=0,i=b.length;h<i;h++){var n=b[h];j=f.row(n).data();j=e(j);if(null===j||j===k)j=this.c.emptyDataGroup;if(g===k||j!==g)l.push({dataPoint:j,rows:[]}),g=j;l[l.length-1].rows.push(n)}if(c[a+1]!==k){h=0;for(i=l.length;h<i;h++)l[h].children=this._group(a+1,l[h].rows)}return l},_groupDisplay:function(a,b){for(var c=this.s.dt,e,g=
0,i=b.length;g<i;g++){var d=b[g],f=d.dataPoint,h=d.rows;this.c.startRender&&(e=this.c.startRender.call(this,c.rows(h),f,a),(e=this._rowWrap(e,this.c.startClassName,a))&&e.insertBefore(c.row(h[0]).node()));this.c.endRender&&(e=this.c.endRender.call(this,c.rows(h),f,a),(e=this._rowWrap(e,this.c.endClassName,a))&&e.insertAfter(c.row(h[h.length-1]).node()));d.children&&this._groupDisplay(a+1,d.children)}},_rowWrap:function(a,b,d){if(null===a||""===a)a=this.c.emptyDataGroup;return a===k||null===a?null:
("object"===typeof a&&a.nodeName&&"tr"===a.nodeName.toLowerCase()?c(a):a instanceof c&&a.length&&"tr"===a[0].nodeName.toLowerCase()?a:c("<tr/>").append(c("<td/>").attr("colspan",this._colspan()).append(a))).addClass(this.c.className).addClass(b).addClass("dtrg-level-"+d)}});g.defaults={className:"dtrg-group",dataSrc:0,emptyDataGroup:"No group",enable:!0,endClassName:"dtrg-end",endRender:null,startClassName:"dtrg-start",startRender:function(a,b){return b}};g.version="1.1.3";c.fn.dataTable.RowGroup=
g;c.fn.DataTable.RowGroup=g;d.Api.register("rowGroup()",function(){return this});d.Api.register("rowGroup().disable()",function(){return this.iterator("table",function(a){a.rowGroup&&a.rowGroup.enable(!1)})});d.Api.register("rowGroup().enable()",function(a){return this.iterator("table",function(b){b.rowGroup&&b.rowGroup.enable(a===k?!0:a)})});d.Api.register("rowGroup().enabled()",function(){var a=this.context;return a.length&&a[0].rowGroup?a[0].rowGroup.enabled():!1});d.Api.register("rowGroup().dataSrc()",
function(a){return a===k?this.context[0].rowGroup.dataSrc():this.iterator("table",function(b){b.rowGroup&&b.rowGroup.dataSrc(a)})});c(i).on("preInit.dt.dtrg",function(a,b){if("dt"===a.namespace){var f=b.oInit.rowGroup,e=d.defaults.rowGroup;if(f||e)e=c.extend({},e,f),!1!==f&&new g(b,e)}});return g});
                                                                                                                              {"version":3,"sources":["../src/dropzone.js"],"names":["Emitter","event","fn","_callbacks","push","callbacks","args","callback","apply","arguments","length","i","splice","Dropzone","prototype","events","defaultOptions","url","method","withCredentials","timeout","parallelUploads","uploadMultiple","chunking","forceChunking","chunkSize","parallelChunkUploads","retryChunks","retryChunksLimit","maxFilesize","paramName","createImageThumbnails","maxThumbnailFilesize","thumbnailWidth","thumbnailHeight","thumbnailMethod","resizeWidth","resizeHeight","resizeMimeType","resizeQuality","resizeMethod","filesizeBase","maxFiles","headers","clickable","ignoreHiddenFiles","acceptedFiles","acceptedMimeTypes","autoProcessQueue","autoQueue","addRemoveLinks","previewsContainer","hiddenInputContainer","capture","renameFilename","renameFile","forceFallback","dictDefaultMessage","dictFallbackMessage","dictFallbackText","dictFileTooBig","dictInvalidFileType","dictResponseError","dictCancelUpload","dictUploadCanceled","dictCancelUploadConfirmation","dictRemoveFile","dictRemoveFileConfirmation","dictMaxFilesExceeded","dictFileSizeUnits","tb","gb","mb","kb","b","init","params","files","xhr","chunk","dzuuid","file","upload","uuid","dzchunkindex","index","dztotalfilesize","size","dzchunksize","options","dztotalchunkcount","totalChunkCount","dzchunkbyteoffset","accept","done","chunksUploaded","fallback","messageElement","element","className","getElementsByTagName","child","test","createElement","appendChild","span","textContent","innerText","getFallbackForm","resize","width","height","info","srcX","srcY","srcWidth","srcHeight","srcRatio","Math","min","trgRatio","Error","trgWidth","trgHeight","transformFile","type","match","resizeImage","previewTemplate","drop","e","classList","remove","dragstart","dragend","dragenter","add","dragover","dragleave","paste","reset","addedfile","previewElement","trim","querySelectorAll","node","name","innerHTML","filesize","_removeLink","removeFileEvent","preventDefault","stopPropagation","status","UPLOADING","confirm","removeFile","removeLink","addEventListener","removedfile","parentNode","removeChild","_updateMaxFilesReachedClass","thumbnail","dataUrl","thumbnailElement","alt","src","setTimeout","error","message","errormultiple","processing","processingmultiple","uploadprogress","progress","bytesSent","nodeName","value","style","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","emit","canceledmultiple","complete","completemultiple","maxfilesexceeded","maxfilesreached","queuecomplete","addedfiles","_thumbnailQueue","_processingThumbnail","target","objects","object","key","val","el","left","version","replace","clickableElements","listeners","document","querySelector","nodeType","dropzone","instances","elementOptions","optionsForElement","extend","isBrowserSupported","call","getAttribute","toUpperCase","getExistingFallback","getElement","getElements","filter","accepted","map","getFilesWithStatus","QUEUED","ADDED","tagName","setAttribute","contains","setupHiddenFileInput","hiddenFileInput","visibility","position","top","addFile","URL","window","webkitURL","eventName","on","updateTotalUploadProgress","getAddedFiles","getUploadingFiles","getQueuedFiles","noPropagation","returnValue","efct","dataTransfer","effectAllowed","dropEffect","forEach","clickableElement","evt","elementInside","click","enable","disable","removeAllFiles","undefined","indexOf","totalUploadProgress","totalBytesSent","totalBytes","activeFiles","getActiveFiles","total","n","existingFallback","form","fieldsString","_getParamName","fields","getFallback","elements","elementListeners","result","listener","removeEventListener","removeEventListeners","disabled","cancelUpload","setupEventListeners","selectedSize","selectedUnit","units","unit","cutoff","pow","round","getAcceptedFiles","items","webkitGetAsEntry","_addFilesFromItems","handleFiles","__guard__","clipboardData","x","item","entry","isFile","getAsFile","isDirectory","_addFilesFromDirectory","kind","directory","path","dirReader","createReader","errorHandler","__guardMethod__","console","o","log","readEntries","entries","substring","fullPath","isValidFile","uuidv4","filename","_renameFile","chunked","ceil","_enqueueThumbnail","_errorProcessing","enqueueFile","processQueue","_processThumbnailQueue","shift","createThumbnail","without","cancelIfNecessary","slice","canvas","resizedDataURL","toDataURL","ExifRestore","restore","dataURL","dataURItoBlob","fixOrientation","fileReader","FileReader","onload","createThumbnailFromUrl","readAsDataURL","crossOrigin","img","loadExif","EXIF","getData","getTag","orientation","resizeInfo","ctx","getContext","translate","scale","rotate","PI","drawImageIOSFix","trgX","trgY","onerror","processingLength","queuedFiles","processFiles","processFile","uploadFiles","groupedFiles","_getFilesWithXhr","groupedFile","CANCELED","abort","option","_transformFiles","transformedFiles","transformedFile","startedChunkCount","chunks","handleNextChunk","chunkIndex","start","end","dataBlock","data","webkitSlice","retries","_uploadData","finishedChunkUpload","allFinished","SUCCESS","_finished","dataBlocks","XMLHttpRequest","resolveOption","open","_finishedUploading","ontimeout","_handleUploadError","progressObj","onprogress","_updateFilesUploadProgress","headerName","headerValue","setRequestHeader","formData","FormData","additionalParams","_getChunk","append","_addFormElementData","submitRequest","doneCounter","input","inputName","inputType","toLowerCase","hasAttribute","selected","checked","loaded","fileProgress","fileTotal","fileBytesSent","allFilesFinished","response","readyState","responseType","responseText","getResponseHeader","JSON","parse","warn","send","ERROR","c","r","random","v","toString","initClass","camelize","forElement","autoDiscover","discover","dropzones","checkElements","blacklistedBrowsers","capableBrowser","File","FileList","Blob","regex","navigator","userAgent","dataURI","byteString","atob","split","mimeString","ab","ArrayBuffer","ia","Uint8Array","asc","charCodeAt","list","rejectedItem","str","charAt","string","div","childNodes","container","els","Array","question","rejected","mimeType","baseMimeType","validType","jQuery","each","module","exports","ACCEPTED","PROCESSING","detectVerticalSquash","iw","naturalWidth","ih","naturalHeight","drawImage","getImageData","sy","ey","py","alpha","ratio","sx","sw","sh","dx","dy","dw","dh","vertSquashRatio","KEY_STR","output","chr1","chr2","chr3","enc1","enc2","enc3","enc4","isNaN","origFileBase64","resizedFileBase64","rawImage","decode64","segments","slice2Segments","image","exifManipulation","encode64","exifArray","getExifArray","newImageArray","insertExif","aBuffer","seg","imageData","buf","separatePoint","mae","ato","array","concat","rawImageArray","head","endPoint","base64test","exec","contentLoaded","win","doc","root","documentElement","rem","pre","poll","doScroll","createEventObject","frameElement","_autoDiscoverFunction","transform","obj","methodName"],"mappings":"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","sourcesContent":["/*\n *\n * More info at [www.dropzonejs.com](http://www.dropzonejs.com)\n *\n * Copyright (c) 2012, Matias Meno\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the \"Software\"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n *\n */\n\n\n// The Emitter class provides the ability to call `.on()` on Dropzone to listen\n// to events.\n// It is strongly based on component's emitter class, and I removed the\n// functionality because of the dependency hell with different frameworks.\nclass Emitter {\n  // Add an event listener for given event\n  on(event, fn) {\n    this._callbacks = this._callbacks || {};\n    // Create namespace for this event\n    if (!this._callbacks[event]) {\n      this._callbacks[event] = [];\n    }\n    this._callbacks[event].push(fn);\n    return this;\n  }\n\n\n  emit(event, ...args) {\n    this._callbacks = this._callbacks || {};\n    let callbacks = this._callbacks[event];\n\n    if (callbacks) {\n      for (let callback of callbacks) {\n        callback.apply(this, args);\n      }\n    }\n\n    return this;\n  }\n\n  // Remove event listener for given event. If fn is not provided, all event\n  // listeners for that event will be removed. If neither is provided, all\n  // event listeners will be removed.\n  off(event, fn) {\n    if (!this._callbacks || (arguments.length === 0)) {\n      this._callbacks = {};\n      return this;\n    }\n\n    // specific event\n    let callbacks = this._callbacks[event];\n    if (!callbacks) {\n      return this;\n    }\n\n    // remove all handlers\n    if (arguments.length === 1) {\n      delete this._callbacks[event];\n      return this;\n    }\n\n    // remove specific handler\n    for (let i = 0; i < callbacks.length; i++) {\n      let callback = callbacks[i];\n      if (callback === fn) {\n        callbacks.splice(i, 1);\n        break;\n      }\n    }\n\n    return this;\n  }\n}\n\nclass Dropzone extends Emitter {\n  static initClass() {\n\n    // Exposing the emitter class, mainly for tests\n    this.prototype.Emitter = Emitter;\n\n    /*\n     This is a list of all available events you can register on a dropzone object.\n\n     You can register an event handler like this:\n\n     dropzone.on(\"dragEnter\", function() { });\n\n     */\n    this.prototype.events = [\n      \"drop\",\n      \"dragstart\",\n      \"dragend\",\n      \"dragenter\",\n      \"dragover\",\n      \"dragleave\",\n      \"addedfile\",\n      \"addedfiles\",\n      \"removedfile\",\n      \"thumbnail\",\n      \"error\",\n      \"errormultiple\",\n      \"processing\",\n      \"processingmultiple\",\n      \"uploadprogress\",\n      \"totaluploadprogress\",\n      \"sending\",\n      \"sendingmultiple\",\n      \"success\",\n      \"successmultiple\",\n      \"canceled\",\n      \"canceledmultiple\",\n      \"complete\",\n      \"completemultiple\",\n      \"reset\",\n      \"maxfilesexceeded\",\n      \"maxfilesreached\",\n      \"queuecomplete\"\n    ];\n\n\n    this.prototype.defaultOptions = {\n      /**\n       * Has to be specified on elements other than form (or when the form\n       * doesn't have an `action` attribute). You can also\n       * provide a function that will be called with `files` and\n       * must return the url (since `v3.12.0`)\n       */\n      url: null,\n\n      /**\n       * Can be changed to `\"put\"` if necessary. You can also provide a function\n       * that will be called with `files` and must return the method (since `v3.12.0`).\n       */\n      method: \"post\",\n\n      /**\n       * Will be set on the XHRequest.\n       */\n      withCredentials: false,\n\n      /**\n       * The timeout for the XHR requests in milliseconds (since `v4.4.0`).\n       */\n      timeout: 30000,\n\n      /**\n       * How many file uploads to process in parallel (See the\n       * Enqueuing file uploads* documentation section for more info)\n       */\n      parallelUploads: 2,\n\n      /**\n       * Whether to send multiple files in one request. If\n       * this it set to true, then the fallback file input element will\n       * have the `multiple` attribute as well. This option will\n       * also trigger additional events (like `processingmultiple`). See the events\n       * documentation section for more information.\n       */\n      uploadMultiple: false,\n\n      /**\n       * Whether you want files to be uploaded in chunks to your server. This can't be\n       * used in combination with `uploadMultiple`.\n       *\n       * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.\n       */\n      chunking: false,\n\n      /**\n       * If `chunking` is enabled, this defines whether **every** file should be chunked,\n       * even if the file size is below chunkSize. This means, that the additional chunk\n       * form data will be submitted and the `chunksUploaded` callback will be invoked.\n       */\n      forceChunking: false,\n\n      /**\n       * If `chunking` is `true`, then this defines the chunk size in bytes.\n       */\n      chunkSize: 2000000,\n\n      /**\n       * If `true`, the individual chunks of a file are being uploaded simultaneously.\n       */\n      parallelChunkUploads: false,\n\n      /**\n       * Whether a chunk should be retried if it fails.\n       */\n      retryChunks: false,\n\n      /**\n       * If `retryChunks` is true, how many times should it be retried.\n       */\n      retryChunksLimit: 3,\n\n      /**\n       * If not `null` defines how many files this Dropzone handles. If it exceeds,\n       * the event `maxfilesexceeded` will be called. The dropzone element gets the\n       * class `dz-max-files-reached` accordingly so you can provide visual feedback.\n       */\n      maxFilesize: 256,\n\n      /**\n       * The name of the file param that gets transferred.\n       * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then\n       * Dropzone will append `[]` to the name.\n       */\n      paramName: \"file\",\n\n      /**\n       * Whether thumbnails for images should be generated\n       */\n      createImageThumbnails: true,\n\n      /**\n       * In MB. When the filename exceeds this limit, the thumbnail will not be generated.\n       */\n      maxThumbnailFilesize: 10,\n\n      /**\n       * If `null`, the ratio of the image will be used to calculate it.\n       */\n      thumbnailWidth: 120,\n\n      /**\n       * The same as `thumbnailWidth`. If both are null, images will not be resized.\n       */\n      thumbnailHeight: 120,\n\n      /**\n       * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.\n       * Can be either `contain` or `crop`.\n       */\n      thumbnailMethod: 'crop',\n\n      /**\n       * If set, images will be resized to these dimensions before being **uploaded**.\n       * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect\n       * ratio of the file will be preserved.\n       *\n       * The `options.transformFile` function uses these options, so if the `transformFile` function\n       * is overridden, these options don't do anything.\n       */\n      resizeWidth: null,\n\n      /**\n       * See `resizeWidth`.\n       */\n      resizeHeight: null,\n\n      /**\n       * The mime type of the resized image (before it gets uploaded to the server).\n       * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.\n       * See `resizeWidth` for more information.\n       */\n      resizeMimeType: null,\n\n      /**\n       * The quality of the resized images. See `resizeWidth`.\n       */\n      resizeQuality: 0.8,\n\n      /**\n       * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.\n       * Can be either `contain` or `crop`.\n       */\n      resizeMethod: 'contain',\n\n      /**\n       * The base that is used to calculate the filesize. You can change this to\n       * 1024 if you would rather display kibibytes, mebibytes, etc...\n       * 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.\n       * You can change this to `1024` if you don't care about validity.\n       */\n      filesizeBase: 1000,\n\n      /**\n       * Can be used to limit the maximum number of files that will be handled by this Dropzone\n       */\n      maxFiles: null,\n\n      /**\n       * An optional object to send additional headers to the server. Eg:\n       * `{ \"My-Awesome-Header\": \"header value\" }`\n       */\n      headers: null,\n\n      /**\n       * If `true`, the dropzone element itself will be clickable, if `false`\n       * nothing will be clickable.\n       *\n       * You can also pass an HTML element, a CSS selector (for multiple elements)\n       * or an array of those. In that case, all of those elements will trigger an\n       * upload when clicked.\n       */\n      clickable: true,\n\n      /**\n       * Whether hidden files in directories should be ignored.\n       */\n      ignoreHiddenFiles: true,\n\n\n      /**\n       * The default implementation of `accept` checks the file's mime type or\n       * extension against this list. This is a comma separated list of mime\n       * types or file extensions.\n       *\n       * Eg.: `image/*,application/pdf,.psd`\n       *\n       * If the Dropzone is `clickable` this option will also be used as\n       * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)\n       * parameter on the hidden file input as well.\n       */\n      acceptedFiles: null,\n\n      /**\n       * **Deprecated!**\n       * Use acceptedFiles instead.\n       */\n      acceptedMimeTypes: null,\n\n      /**\n       * If false, files will be added to the queue but the queue will not be\n       * processed automatically.\n       * This can be useful if you need some additional user input before sending\n       * files (or if you want want all files sent at once).\n       * If you're ready to send the file simply call `myDropzone.processQueue()`.\n       *\n       * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation\n       * section for more information.\n       */\n      autoProcessQueue: true,\n\n      /**\n       * If false, files added to the dropzone will not be queued by default.\n       * You'll have to call `enqueueFile(file)` manually.\n       */\n      autoQueue: true,\n\n      /**\n       * If `true`, this will add a link to every file preview to remove or cancel (if\n       * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`\n       * and `dictRemoveFile` options are used for the wording.\n       */\n      addRemoveLinks: false,\n\n      /**\n       * Defines where to display the file previews – if `null` the\n       * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS\n       * selector. The element should have the `dropzone-previews` class so\n       * the previews are displayed properly.\n       */\n      previewsContainer: null,\n\n      /**\n       * This is the element the hidden input field (which is used when clicking on the\n       * dropzone to trigger file selection) will be appended to. This might\n       * be important in case you use frameworks to switch the content of your page.\n       *\n       * Can be a selector string, or an element directly.\n       */\n      hiddenInputContainer: \"body\",\n\n      /**\n       * If null, no capture type will be specified\n       * If camera, mobile devices will skip the file selection and choose camera\n       * If microphone, mobile devices will skip the file selection and choose the microphone\n       * If camcorder, mobile devices will skip the file selection and choose the camera in video mode\n       * On apple devices multiple must be set to false.  AcceptedFiles may need to\n       * be set to an appropriate mime type (e.g. \"image/*\", \"audio/*\", or \"video/*\").\n       */\n      capture: null,\n\n      /**\n       * **Deprecated**. Use `renameFile` instead.\n       */\n      renameFilename: null,\n\n      /**\n       * A function that is invoked before the file is uploaded to the server and renames the file.\n       * This function gets the `File` as argument and can use the `file.name`. The actual name of the\n       * file that gets used during the upload can be accessed through `file.upload.filename`.\n       */\n      renameFile: null,\n\n      /**\n       * If `true` the fallback will be forced. This is very useful to test your server\n       * implementations first and make sure that everything works as\n       * expected without dropzone if you experience problems, and to test\n       * how your fallbacks will look.\n       */\n      forceFallback: false,\n\n      /**\n       * The text used before any files are dropped.\n       */\n      dictDefaultMessage: \"Drop files here to upload\",\n\n      /**\n       * The text that replaces the default message text it the browser is not supported.\n       */\n      dictFallbackMessage: \"Your browser does not support drag'n'drop file uploads.\",\n\n      /**\n       * The text that will be added before the fallback form.\n       * If you provide a  fallback element yourself, or if this option is `null` this will\n       * be ignored.\n       */\n      dictFallbackText: \"Please use the fallback form below to upload your files like in the olden days.\",\n\n      /**\n       * If the filesize is too big.\n       * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.\n       */\n      dictFileTooBig: \"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.\",\n\n      /**\n       * If the file doesn't match the file type.\n       */\n      dictInvalidFileType: \"You can't upload files of this type.\",\n\n      /**\n       * If the server response was invalid.\n       * `{{statusCode}}` will be replaced with the servers status code.\n       */\n      dictResponseError: \"Server responded with {{statusCode}} code.\",\n\n      /**\n       * If `addRemoveLinks` is true, the text to be used for the cancel upload link.\n       */\n      dictCancelUpload: \"Cancel upload\",\n\n      /**\n       * The text that is displayed if an upload was manually canceled\n       */\n      dictUploadCanceled: \"Upload canceled.\",\n\n      /**\n       * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.\n       */\n      dictCancelUploadConfirmation: \"Are you sure you want to cancel this upload?\",\n\n      /**\n       * If `addRemoveLinks` is true, the text to be used to remove a file.\n       */\n      dictRemoveFile: \"Remove file\",\n\n      /**\n       * If this is not null, then the user will be prompted before removing a file.\n       */\n      dictRemoveFileConfirmation: null,\n\n      /**\n       * Displayed if `maxFiles` is st and exceeded.\n       * The string `{{maxFiles}}` will be replaced by the configuration value.\n       */\n      dictMaxFilesExceeded: \"You can not upload any more files.\",\n\n      /**\n       * Allows you to translate the different units. Starting with `tb` for terabytes and going down to\n       * `b` for bytes.\n       */\n      dictFileSizeUnits: {tb: \"TB\", gb: \"GB\", mb: \"MB\", kb: \"KB\", b: \"b\"},\n      /**\n       * Called when dropzone initialized\n       * You can add event listeners here\n       */\n      init() {},\n\n      /**\n       * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`\n       * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case\n       * of a function, this needs to return a map.\n       *\n       * The default implementation does nothing for normal uploads, but adds relevant information for\n       * chunked uploads.\n       *\n       * This is the same as adding hidden input fields in the form element.\n       */\n      params(files, xhr, chunk) {\n        if (chunk) {\n          return {\n            dzuuid: chunk.file.upload.uuid,\n            dzchunkindex: chunk.index,\n            dztotalfilesize: chunk.file.size,\n            dzchunksize: this.options.chunkSize,\n            dztotalchunkcount: chunk.file.upload.totalChunkCount,\n            dzchunkbyteoffset: chunk.index * this.options.chunkSize\n          };\n        }\n      },\n\n      /**\n       * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)\n       * and a `done` function as parameters.\n       *\n       * If the done function is invoked without arguments, the file is \"accepted\" and will\n       * be processed. If you pass an error message, the file is rejected, and the error\n       * message will be displayed.\n       * This function will not be called if the file is too big or doesn't match the mime types.\n       */\n      accept(file, done) {\n        return done();\n      },\n\n      /**\n       * The callback that will be invoked when all chunks have been uploaded for a file.\n       * It gets the file for which the chunks have been uploaded as the first parameter,\n       * and the `done` function as second. `done()` needs to be invoked when everything\n       * needed to finish the upload process is done.\n       */\n      chunksUploaded: function(file, done) { done(); },\n\n      /**\n       * Gets called when the browser is not supported.\n       * The default implementation shows the fallback input field and adds\n       * a text.\n       */\n      fallback() {\n        // This code should pass in IE7... :(\n        let messageElement;\n        this.element.className = `${this.element.className} dz-browser-not-supported`;\n\n        for (let child of this.element.getElementsByTagName(\"div\")) {\n          if (/(^| )dz-message($| )/.test(child.className)) {\n            messageElement = child;\n            child.className = \"dz-message\"; // Removes the 'dz-default' class\n            break;\n          }\n        }\n        if (!messageElement) {\n          messageElement = Dropzone.createElement(\"<div class=\\\"dz-message\\\"><span></span></div>\");\n          this.element.appendChild(messageElement);\n        }\n\n        let span = messageElement.getElementsByTagName(\"span\")[0];\n        if (span) {\n          if (span.textContent != null) {\n            span.textContent = this.options.dictFallbackMessage;\n          } else if (span.innerText != null) {\n            span.innerText = this.options.dictFallbackMessage;\n          }\n        }\n\n        return this.element.appendChild(this.getFallbackForm());\n      },\n\n\n      /**\n       * Gets called to calculate the thumbnail dimensions.\n       *\n       * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:\n       *\n       *  - `srcWidth` & `srcHeight` (required)\n       *  - `trgWidth` & `trgHeight` (required)\n       *  - `srcX` & `srcY` (optional, default `0`)\n       *  - `trgX` & `trgY` (optional, default `0`)\n       *\n       * Those values are going to be used by `ctx.drawImage()`.\n       */\n      resize(file, width, height, resizeMethod) {\n        let info = {\n          srcX: 0,\n          srcY: 0,\n          srcWidth: file.width,\n          srcHeight: file.height\n        };\n\n        let srcRatio = file.width / file.height;\n\n        // Automatically calculate dimensions if not specified\n        if ((width == null) && (height == null)) {\n          width = info.srcWidth;\n          height = info.srcHeight;\n        } else if ((width == null)) {\n          width = height * srcRatio;\n        } else if ((height == null)) {\n          height = width / srcRatio;\n        }\n\n        // Make sure images aren't upscaled\n        width = Math.min(width, info.srcWidth);\n        height = Math.min(height, info.srcHeight);\n\n        let trgRatio = width / height;\n\n        if ((info.srcWidth > width) || (info.srcHeight > height)) {\n          // Image is bigger and needs rescaling\n          if (resizeMethod === 'crop') {\n            if (srcRatio > trgRatio) {\n              info.srcHeight = file.height;\n              info.srcWidth = info.srcHeight * trgRatio;\n            } else {\n              info.srcWidth = file.width;\n              info.srcHeight = info.srcWidth / trgRatio;\n            }\n          } else if (resizeMethod === 'contain') {\n            // Method 'contain'\n            if (srcRatio > trgRatio) {\n              height = width / srcRatio;\n            } else {\n              width = height * srcRatio;\n            }\n          } else {\n            throw new Error(`Unknown resizeMethod '${resizeMethod}'`);\n          }\n        }\n\n        info.srcX = (file.width - info.srcWidth) / 2;\n        info.srcY = (file.height - info.srcHeight) / 2;\n\n        info.trgWidth = width;\n        info.trgHeight = height;\n\n        return info;\n      },\n\n      /**\n       * Can be used to transform the file (for example, resize an image if necessary).\n       *\n       * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes\n       * images according to those dimensions.\n       *\n       * Gets the `file` as the first parameter, and a `done()` function as the second, that needs\n       * to be invoked with the file when the transformation is done.\n       */\n      transformFile(file, done) {\n        if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) {\n          return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);\n        } else {\n          return done(file);\n        }\n      },\n\n\n      /**\n       * A string that contains the template used for each dropped\n       * file. Change it to fulfill your needs but make sure to properly\n       * provide all elements.\n       *\n       * If you want to use an actual HTML element instead of providing a String\n       * as a config option, you could create a div with the id `tpl`,\n       * put the template inside it and provide the element like this:\n       *\n       *     document\n       *       .querySelector('#tpl')\n       *       .innerHTML\n       *\n       */\n      previewTemplate: `\\\n<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>\\\n`,\n\n      // END OPTIONS\n      // (Required by the dropzone documentation parser)\n\n\n      /*\n       Those functions register themselves to the events on init and handle all\n       the user interface specific stuff. Overwriting them won't break the upload\n       but can break the way it's displayed.\n       You can overwrite them if you don't like the default behavior. If you just\n       want to add an additional event handler, register it on the dropzone object\n       and don't overwrite those options.\n       */\n\n\n\n\n      // Those are self explanatory and simply concern the DragnDrop.\n      drop(e) {\n        return this.element.classList.remove(\"dz-drag-hover\");\n      },\n      dragstart(e) {\n      },\n      dragend(e) {\n        return this.element.classList.remove(\"dz-drag-hover\");\n      },\n      dragenter(e) {\n        return this.element.classList.add(\"dz-drag-hover\");\n      },\n      dragover(e) {\n        return this.element.classList.add(\"dz-drag-hover\");\n      },\n      dragleave(e) {\n        return this.element.classList.remove(\"dz-drag-hover\");\n      },\n\n      paste(e) {\n      },\n\n      // Called whenever there are no files left in the dropzone anymore, and the\n      // dropzone should be displayed as if in the initial state.\n      reset() {\n        return this.element.classList.remove(\"dz-started\");\n      },\n\n      // Called when a file is added to the queue\n      // Receives `file`\n      addedfile(file) {\n        if (this.element === this.previewsContainer) {\n          this.element.classList.add(\"dz-started\");\n        }\n\n        if (this.previewsContainer) {\n          file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());\n          file.previewTemplate = file.previewElement; // Backwards compatibility\n\n          this.previewsContainer.appendChild(file.previewElement);\n          for (var node of file.previewElement.querySelectorAll(\"[data-dz-name]\")) {\n            node.textContent = file.name;\n          }\n          for (node of file.previewElement.querySelectorAll(\"[data-dz-size]\")) {\n            node.innerHTML = this.filesize(file.size);\n          }\n\n          if (this.options.addRemoveLinks) {\n            file._removeLink = Dropzone.createElement(`<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>${this.options.dictRemoveFile}</a>`);\n            file.previewElement.appendChild(file._removeLink);\n          }\n\n          let removeFileEvent = e => {\n            e.preventDefault();\n            e.stopPropagation();\n            if (file.status === Dropzone.UPLOADING) {\n              return Dropzone.confirm(this.options.dictCancelUploadConfirmation, () => this.removeFile(file));\n            } else {\n              if (this.options.dictRemoveFileConfirmation) {\n                return Dropzone.confirm(this.options.dictRemoveFileConfirmation, () => this.removeFile(file));\n              } else {\n                return this.removeFile(file);\n              }\n            }\n          };\n\n          for (let removeLink of file.previewElement.querySelectorAll(\"[data-dz-remove]\")) {\n             removeLink.addEventListener(\"click\", removeFileEvent);\n          }\n        }\n      },\n\n\n      // Called whenever a file is removed.\n      removedfile(file) {\n        if (file.previewElement != null && file.previewElement.parentNode != null) {\n          file.previewElement.parentNode.removeChild(file.previewElement);\n        }\n        return this._updateMaxFilesReachedClass();\n      },\n\n      // Called when a thumbnail has been generated\n      // Receives `file` and `dataUrl`\n      thumbnail(file, dataUrl) {\n        if (file.previewElement) {\n          file.previewElement.classList.remove(\"dz-file-preview\");\n          for (let thumbnailElement of file.previewElement.querySelectorAll(\"[data-dz-thumbnail]\")) {\n            thumbnailElement.alt = file.name;\n            thumbnailElement.src = dataUrl;\n          }\n\n          return setTimeout((() => file.previewElement.classList.add(\"dz-image-preview\")), 1);\n        }\n      },\n\n      // Called whenever an error occurs\n      // Receives `file` and `message`\n      error(file, message) {\n        if (file.previewElement) {\n          file.previewElement.classList.add(\"dz-error\");\n          if ((typeof message !== \"String\") && message.error) {\n            message = message.error;\n          }\n          for (let node of file.previewElement.querySelectorAll(\"[data-dz-errormessage]\")) {\n            node.textContent = message;\n          }\n        }\n      },\n\n      errormultiple() {\n      },\n\n      // Called when a file gets processed. Since there is a cue, not all added\n      // files are processed immediately.\n      // Receives `file`\n      processing(file) {\n        if (file.previewElement) {\n          file.previewElement.classList.add(\"dz-processing\");\n          if (file._removeLink) {\n            return file._removeLink.innerHTML = this.options.dictCancelUpload;\n          }\n        }\n      },\n\n      processingmultiple() {\n      },\n\n      // Called whenever the upload progress gets updated.\n      // Receives `file`, `progress` (percentage 0-100) and `bytesSent`.\n      // To get the total number of bytes of the file, use `file.size`\n      uploadprogress(file, progress, bytesSent) {\n        if (file.previewElement) {\n          for (let node of file.previewElement.querySelectorAll(\"[data-dz-uploadprogress]\")) {\n              node.nodeName === 'PROGRESS' ?\n                  (node.value = progress)\n                  :\n                  (node.style.width = `${progress}%`)\n          }\n        }\n      },\n\n      // Called whenever the total upload progress gets updated.\n      // Called with totalUploadProgress (0-100), totalBytes and totalBytesSent\n      totaluploadprogress() {\n      },\n\n      // Called just before the file is sent. Gets the `xhr` object as second\n      // parameter, so you can modify it (for example to add a CSRF token) and a\n      // `formData` object to add additional information.\n      sending() {\n      },\n\n      sendingmultiple() {},\n\n      // When the complete upload is finished and successful\n      // Receives `file`\n      success(file) {\n        if (file.previewElement) {\n          return file.previewElement.classList.add(\"dz-success\");\n        }\n      },\n\n      successmultiple() {},\n\n      // When the upload is canceled.\n      canceled(file) {\n        return this.emit(\"error\", file, this.options.dictUploadCanceled);\n      },\n\n      canceledmultiple() {},\n\n      // When the upload is finished, either with success or an error.\n      // Receives `file`\n      complete(file) {\n        if (file._removeLink) {\n          file._removeLink.innerHTML = this.options.dictRemoveFile;\n        }\n        if (file.previewElement) {\n          return file.previewElement.classList.add(\"dz-complete\");\n        }\n      },\n\n      completemultiple() {},\n\n      maxfilesexceeded() {},\n\n      maxfilesreached() {},\n\n      queuecomplete() {},\n\n      addedfiles() {}\n    };\n\n\n    this.prototype._thumbnailQueue = [];\n    this.prototype._processingThumbnail = false;\n  }\n\n  // global utility\n  static extend(target, ...objects) {\n    for (let object of objects) {\n      for (let key in object) {\n        let val = object[key];\n        target[key] = val;\n      }\n    }\n    return target;\n  }\n\n  constructor(el, options) {\n    super();\n    let fallback, left;\n    this.element = el;\n    // For backwards compatibility since the version was in the prototype previously\n    this.version = Dropzone.version;\n\n    this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\\n*/g, \"\");\n\n    this.clickableElements = [];\n    this.listeners = [];\n    this.files = []; // All files\n\n    if (typeof this.element === \"string\") {\n      this.element = document.querySelector(this.element);\n    }\n\n    // Not checking if instance of HTMLElement or Element since IE9 is extremely weird.\n    if (!this.element || (this.element.nodeType == null)) {\n      throw new Error(\"Invalid dropzone element.\");\n    }\n\n    if (this.element.dropzone) {\n      throw new Error(\"Dropzone already attached.\");\n    }\n\n    // Now add this dropzone to the instances.\n    Dropzone.instances.push(this);\n\n    // Put the dropzone inside the element itself.\n    this.element.dropzone = this;\n\n    let elementOptions = (left = Dropzone.optionsForElement(this.element)) != null ? left : {};\n\n    this.options = Dropzone.extend({}, this.defaultOptions, elementOptions, options != null ? options : {});\n\n    // If the browser failed, just call the fallback and leave\n    if (this.options.forceFallback || !Dropzone.isBrowserSupported()) {\n      return this.options.fallback.call(this);\n    }\n\n    // @options.url = @element.getAttribute \"action\" unless @options.url?\n    if (this.options.url == null) {\n      this.options.url = this.element.getAttribute(\"action\");\n    }\n\n    if (!this.options.url) {\n      throw new Error(\"No URL provided.\");\n    }\n\n    if (this.options.acceptedFiles && this.options.acceptedMimeTypes) {\n      throw new Error(\"You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.\");\n    }\n\n    if (this.options.uploadMultiple && this.options.chunking) {\n      throw new Error('You cannot set both: uploadMultiple and chunking.');\n    }\n\n    // Backwards compatibility\n    if (this.options.acceptedMimeTypes) {\n      this.options.acceptedFiles = this.options.acceptedMimeTypes;\n      delete this.options.acceptedMimeTypes;\n    }\n\n    // Backwards compatibility\n    if (this.options.renameFilename != null) {\n      this.options.renameFile = file => this.options.renameFilename.call(this, file.name, file);\n    }\n\n    this.options.method = this.options.method.toUpperCase();\n\n    if ((fallback = this.getExistingFallback()) && fallback.parentNode) {\n      // Remove the fallback\n      fallback.parentNode.removeChild(fallback);\n    }\n\n    // Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false\n    if (this.options.previewsContainer !== false) {\n      if (this.options.previewsContainer) {\n        this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, \"previewsContainer\");\n      } else {\n        this.previewsContainer = this.element;\n      }\n    }\n\n    if (this.options.clickable) {\n      if (this.options.clickable === true) {\n        this.clickableElements = [this.element];\n      } else {\n        this.clickableElements = Dropzone.getElements(this.options.clickable, \"clickable\");\n      }\n    }\n\n\n    this.init();\n  }\n\n\n  // Returns all files that have been accepted\n  getAcceptedFiles() {\n    return this.files.filter((file) => file.accepted).map((file) => file);\n  }\n\n  // Returns all files that have been rejected\n  // Not sure when that's going to be useful, but added for completeness.\n  getRejectedFiles() {\n    return this.files.filter((file) => !file.accepted).map((file) => file);\n  }\n\n  getFilesWithStatus(status) {\n    return this.files.filter((file) => file.status === status).map((file) => file);\n  }\n\n  // Returns all files that are in the queue\n  getQueuedFiles() {\n    return this.getFilesWithStatus(Dropzone.QUEUED);\n  }\n\n  getUploadingFiles() {\n    return this.getFilesWithStatus(Dropzone.UPLOADING);\n  }\n\n  getAddedFiles() {\n    return this.getFilesWithStatus(Dropzone.ADDED);\n  }\n\n  // Files that are either queued or uploading\n  getActiveFiles() {\n    return this.files.filter((file) => (file.status === Dropzone.UPLOADING) || (file.status === Dropzone.QUEUED)).map((file) => file);\n  }\n\n  // The function that gets called when Dropzone is initialized. You\n  // can (and should) setup event listeners inside this function.\n  init() {\n    // In case it isn't set already\n    if (this.element.tagName === \"form\") {\n      this.element.setAttribute(\"enctype\", \"multipart/form-data\");\n    }\n\n    if (this.element.classList.contains(\"dropzone\") && !this.element.querySelector(\".dz-message\")) {\n      this.element.appendChild(Dropzone.createElement(`<div class=\"dz-default dz-message\"><span>${this.options.dictDefaultMessage}</span></div>`));\n    }\n\n    if (this.clickableElements.length) {\n      let setupHiddenFileInput = () => {\n        if (this.hiddenFileInput) {\n          this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);\n        }\n        this.hiddenFileInput = document.createElement(\"input\");\n        this.hiddenFileInput.setAttribute(\"type\", \"file\");\n        if ((this.options.maxFiles === null) || (this.options.maxFiles > 1)) {\n          this.hiddenFileInput.setAttribute(\"multiple\", \"multiple\");\n        }\n        this.hiddenFileInput.className = \"dz-hidden-input\";\n\n        if (this.options.acceptedFiles !== null) {\n          this.hiddenFileInput.setAttribute(\"accept\", this.options.acceptedFiles);\n        }\n        if (this.options.capture !== null) {\n          this.hiddenFileInput.setAttribute(\"capture\", this.options.capture);\n        }\n\n        // Not setting `display=\"none\"` because some browsers don't accept clicks\n        // on elements that aren't displayed.\n        this.hiddenFileInput.style.visibility = \"hidden\";\n        this.hiddenFileInput.style.position = \"absolute\";\n        this.hiddenFileInput.style.top = \"0\";\n        this.hiddenFileInput.style.left = \"0\";\n        this.hiddenFileInput.style.height = \"0\";\n        this.hiddenFileInput.style.width = \"0\";\n        Dropzone.getElement(this.options.hiddenInputContainer, 'hiddenInputContainer').appendChild(this.hiddenFileInput);\n        return this.hiddenFileInput.addEventListener(\"change\", () => {\n          let {files} = this.hiddenFileInput;\n          if (files.length) {\n            for (let file of files) {\n              this.addFile(file);\n            }\n          }\n          this.emit(\"addedfiles\", files);\n          return setupHiddenFileInput();\n        });\n      };\n      setupHiddenFileInput();\n    }\n\n    this.URL = window.URL !== null ? window.URL : window.webkitURL;\n\n\n    // Setup all event listeners on the Dropzone object itself.\n    // They're not in @setupEventListeners() because they shouldn't be removed\n    // again when the dropzone gets disabled.\n    for (let eventName of this.events) {\n      this.on(eventName, this.options[eventName]);\n    }\n\n    this.on(\"uploadprogress\", () => this.updateTotalUploadProgress());\n\n    this.on(\"removedfile\", () => this.updateTotalUploadProgress());\n\n    this.on(\"canceled\", file => this.emit(\"complete\", file));\n\n    // Emit a `queuecomplete` event if all files finished uploading.\n    this.on(\"complete\", file => {\n      if ((this.getAddedFiles().length === 0) && (this.getUploadingFiles().length === 0) && (this.getQueuedFiles().length === 0)) {\n        // This needs to be deferred so that `queuecomplete` really triggers after `complete`\n        return setTimeout((() => this.emit(\"queuecomplete\")), 0);\n      }\n    });\n\n\n    let noPropagation = function (e) {\n      e.stopPropagation();\n      if (e.preventDefault) {\n        return e.preventDefault();\n      } else {\n        return e.returnValue = false;\n      }\n    };\n\n    // Create the listeners\n    this.listeners = [\n      {\n        element: this.element,\n        events: {\n          \"dragstart\": e => {\n            return this.emit(\"dragstart\", e);\n          },\n          \"dragenter\": e => {\n            noPropagation(e);\n            return this.emit(\"dragenter\", e);\n          },\n          \"dragover\": e => {\n            // Makes it possible to drag files from chrome's download bar\n            // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar\n            // Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)\n            let efct;\n            try {\n              efct = e.dataTransfer.effectAllowed;\n            } catch (error) {\n            }\n            e.dataTransfer.dropEffect = ('move' === efct) || ('linkMove' === efct) ? 'move' : 'copy';\n\n            noPropagation(e);\n            return this.emit(\"dragover\", e);\n          },\n          \"dragleave\": e => {\n            return this.emit(\"dragleave\", e);\n          },\n          \"drop\": e => {\n            noPropagation(e);\n            return this.drop(e);\n          },\n          \"dragend\": e => {\n            return this.emit(\"dragend\", e);\n          }\n        }\n\n        // This is disabled right now, because the browsers don't implement it properly.\n        // \"paste\": (e) =>\n        //   noPropagation e\n        //   @paste e\n      }\n    ];\n\n    this.clickableElements.forEach(clickableElement => {\n      return this.listeners.push({\n        element: clickableElement,\n        events: {\n          \"click\": evt => {\n            // Only the actual dropzone or the message element should trigger file selection\n            if ((clickableElement !== this.element) || ((evt.target === this.element) || Dropzone.elementInside(evt.target, this.element.querySelector(\".dz-message\")))) {\n              this.hiddenFileInput.click(); // Forward the click\n            }\n            return true;\n          }\n        }\n      });\n    });\n\n    this.enable();\n\n    return this.options.init.call(this);\n  }\n\n  // Not fully tested yet\n  destroy() {\n    this.disable();\n    this.removeAllFiles(true);\n    if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {\n      this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);\n      this.hiddenFileInput = null;\n    }\n    delete this.element.dropzone;\n    return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);\n  }\n\n\n  updateTotalUploadProgress() {\n    let totalUploadProgress;\n    let totalBytesSent = 0;\n    let totalBytes = 0;\n\n    let activeFiles = this.getActiveFiles();\n\n    if (activeFiles.length) {\n      for (let file of this.getActiveFiles()) {\n        totalBytesSent += file.upload.bytesSent;\n        totalBytes += file.upload.total;\n      }\n      totalUploadProgress = (100 * totalBytesSent) / totalBytes;\n    } else {\n      totalUploadProgress = 100;\n    }\n\n    return this.emit(\"totaluploadprogress\", totalUploadProgress, totalBytes, totalBytesSent);\n  }\n\n  // @options.paramName can be a function taking one parameter rather than a string.\n  // A parameter name for a file is obtained simply by calling this with an index number.\n  _getParamName(n) {\n    if (typeof this.options.paramName === \"function\") {\n      return this.options.paramName(n);\n    } else {\n      return `${this.options.paramName}${this.options.uploadMultiple ? `[${n}]` : \"\"}`;\n    }\n  }\n\n  // If @options.renameFile is a function,\n  // the function will be used to rename the file.name before appending it to the formData\n  _renameFile(file) {\n    if (typeof this.options.renameFile !== \"function\") {\n      return file.name;\n    }\n    return this.options.renameFile(file);\n  }\n\n  // Returns a form that can be used as fallback if the browser does not support DragnDrop\n  //\n  // If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.\n  // This code has to pass in IE7 :(\n  getFallbackForm() {\n    let existingFallback, form;\n    if (existingFallback = this.getExistingFallback()) {\n      return existingFallback;\n    }\n\n    let fieldsString = \"<div class=\\\"dz-fallback\\\">\";\n    if (this.options.dictFallbackText) {\n      fieldsString += `<p>${this.options.dictFallbackText}</p>`;\n    }\n    fieldsString += `<input type=\"file\" name=\"${this._getParamName(0)}\" ${this.options.uploadMultiple ? 'multiple=\"multiple\"' : undefined } /><input type=\"submit\" value=\"Upload!\"></div>`;\n\n    let fields = Dropzone.createElement(fieldsString);\n    if (this.element.tagName !== \"FORM\") {\n      form = Dropzone.createElement(`<form action=\"${this.options.url}\" enctype=\"multipart/form-data\" method=\"${this.options.method}\"></form>`);\n      form.appendChild(fields);\n    } else {\n      // Make sure that the enctype and method attributes are set properly\n      this.element.setAttribute(\"enctype\", \"multipart/form-data\");\n      this.element.setAttribute(\"method\", this.options.method);\n    }\n    return form != null ? form : fields;\n  }\n\n\n  // Returns the fallback elements if they exist already\n  //\n  // This code has to pass in IE7 :(\n  getExistingFallback() {\n    let getFallback = function (elements) {\n      for (let el of elements) {\n        if (/(^| )fallback($| )/.test(el.className)) {\n          return el;\n        }\n      }\n    };\n\n    for (let tagName of [\"div\", \"form\"]) {\n      var fallback;\n      if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {\n        return fallback;\n      }\n    }\n  }\n\n\n  // Activates all listeners stored in @listeners\n  setupEventListeners() {\n    return this.listeners.map((elementListeners) =>\n        (() => {\n          let result = [];\n          for (let event in elementListeners.events) {\n            let listener = elementListeners.events[event];\n            result.push(elementListeners.element.addEventListener(event, listener, false));\n          }\n          return result;\n        })());\n  }\n\n\n  // Deactivates all listeners stored in @listeners\n  removeEventListeners() {\n    return this.listeners.map((elementListeners) =>\n        (() => {\n          let result = [];\n          for (let event in elementListeners.events) {\n            let listener = elementListeners.events[event];\n            result.push(elementListeners.element.removeEventListener(event, listener, false));\n          }\n          return result;\n        })());\n  }\n\n  // Removes all event listeners and cancels all files in the queue or being processed.\n  disable() {\n    this.clickableElements.forEach(element => element.classList.remove(\"dz-clickable\"));\n    this.removeEventListeners();\n    this.disabled = true;\n\n    return this.files.map((file) => this.cancelUpload(file));\n  }\n\n  enable() {\n    delete this.disabled;\n    this.clickableElements.forEach(element => element.classList.add(\"dz-clickable\"));\n    return this.setupEventListeners();\n  }\n\n  // Returns a nicely formatted filesize\n  filesize(size) {\n    let selectedSize = 0;\n    let selectedUnit = \"b\";\n\n    if (size > 0) {\n      let units = ['tb', 'gb', 'mb', 'kb', 'b'];\n\n      for (let i = 0; i < units.length; i++) {\n        let unit = units[i];\n        let cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;\n\n        if (size >= cutoff) {\n          selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);\n          selectedUnit = unit;\n          break;\n        }\n      }\n\n      selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits\n    }\n\n    return `<strong>${selectedSize}</strong> ${this.options.dictFileSizeUnits[selectedUnit]}`;\n  }\n\n\n  // Adds or removes the `dz-max-files-reached` class from the form.\n  _updateMaxFilesReachedClass() {\n    if ((this.options.maxFiles != null) && (this.getAcceptedFiles().length >= this.options.maxFiles)) {\n      if (this.getAcceptedFiles().length === this.options.maxFiles) {\n        this.emit('maxfilesreached', this.files);\n      }\n      return this.element.classList.add(\"dz-max-files-reached\");\n    } else {\n      return this.element.classList.remove(\"dz-max-files-reached\");\n    }\n  }\n\n\n  drop(e) {\n    if (!e.dataTransfer) {\n      return;\n    }\n    this.emit(\"drop\", e);\n\n    // Convert the FileList to an Array\n    // This is necessary for IE11\n    let files = [];\n    for (let i = 0; i < e.dataTransfer.files.length; i++) {\n      files[i] = e.dataTransfer.files[i];\n    }\n\n    this.emit(\"addedfiles\", files);\n\n    // Even if it's a folder, files.length will contain the folders.\n    if (files.length) {\n      let {items} = e.dataTransfer;\n      if (items && items.length && (items[0].webkitGetAsEntry != null)) {\n        // The browser supports dropping of folders, so handle items instead of files\n        this._addFilesFromItems(items);\n      } else {\n        this.handleFiles(files);\n      }\n    }\n  }\n\n  paste(e) {\n    if (__guard__(e != null ? e.clipboardData : undefined, x => x.items) == null) {\n      return;\n    }\n\n    this.emit(\"paste\", e);\n    let {items} = e.clipboardData;\n\n    if (items.length) {\n      return this._addFilesFromItems(items);\n    }\n  }\n\n\n  handleFiles(files) {\n    for(let file of files) {\n      this.addFile(file);\n    }\n  }\n\n  // When a folder is dropped (or files are pasted), items must be handled\n  // instead of files.\n  _addFilesFromItems(items) {\n    return (() => {\n      let result = [];\n      for (let item of items) {\n        var entry;\n        if ((item.webkitGetAsEntry != null) && (entry = item.webkitGetAsEntry())) {\n          if (entry.isFile) {\n            result.push(this.addFile(item.getAsFile()));\n          } else if (entry.isDirectory) {\n            // Append all files from that directory to files\n            result.push(this._addFilesFromDirectory(entry, entry.name));\n          } else {\n            result.push(undefined);\n          }\n        } else if (item.getAsFile != null) {\n          if ((item.kind == null) || (item.kind === \"file\")) {\n            result.push(this.addFile(item.getAsFile()));\n          } else {\n            result.push(undefined);\n          }\n        } else {\n          result.push(undefined);\n        }\n      }\n      return result;\n    })();\n  }\n\n\n  // Goes through the directory, and adds each file it finds recursively\n  _addFilesFromDirectory(directory, path) {\n    let dirReader = directory.createReader();\n\n    let errorHandler = error => __guardMethod__(console, 'log', o => o.log(error));\n\n    var readEntries = () => {\n      return dirReader.readEntries(entries => {\n            if (entries.length > 0) {\n              for (let entry of entries) {\n                if (entry.isFile) {\n                  entry.file(file => {\n                    if (this.options.ignoreHiddenFiles && (file.name.substring(0, 1) === '.')) {\n                      return;\n                    }\n                    file.fullPath = `${path}/${file.name}`;\n                    return this.addFile(file);\n                  });\n                } else if (entry.isDirectory) {\n                  this._addFilesFromDirectory(entry, `${path}/${entry.name}`);\n                }\n              }\n\n              // Recursively call readEntries() again, since browser only handle\n              // the first 100 entries.\n              // See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries\n              readEntries();\n            }\n            return null;\n          }\n          , errorHandler);\n    };\n\n    return readEntries();\n  }\n\n\n  // If `done()` is called without argument the file is accepted\n  // If you call it with an error message, the file is rejected\n  // (This allows for asynchronous validation)\n  //\n  // This function checks the filesize, and if the file.type passes the\n  // `acceptedFiles` check.\n  accept(file, done) {\n    if (this.options.maxFilesize && file.size > (this.options.maxFilesize * 1024 * 1024)) {\n      return done(this.options.dictFileTooBig.replace(\"{{filesize}}\", Math.round(file.size / 1024 / 10.24) / 100).replace(\"{{maxFilesize}}\", this.options.maxFilesize));\n    } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {\n      return done(this.options.dictInvalidFileType);\n    } else if ((this.options.maxFiles != null) && (this.getAcceptedFiles().length >= this.options.maxFiles)) {\n      done(this.options.dictMaxFilesExceeded.replace(\"{{maxFiles}}\", this.options.maxFiles));\n      return this.emit(\"maxfilesexceeded\", file);\n    } else {\n      return this.options.accept.call(this, file, done);\n    }\n  }\n\n  addFile(file) {\n    file.upload = {\n      uuid: Dropzone.uuidv4(),\n      progress: 0,\n      // Setting the total upload size to file.size for the beginning\n      // It's actual different than the size to be transmitted.\n      total: file.size,\n      bytesSent: 0,\n      filename: this._renameFile(file),\n      chunked: this.options.chunking && (this.options.forceChunking || file.size > this.options.chunkSize),\n      totalChunkCount: Math.ceil(file.size / this.options.chunkSize)\n    };\n    this.files.push(file);\n\n    file.status = Dropzone.ADDED;\n\n    this.emit(\"addedfile\", file);\n\n    this._enqueueThumbnail(file);\n\n    return this.accept(file, error => {\n      if (error) {\n        file.accepted = false;\n        this._errorProcessing([file], error); // Will set the file.status\n      } else {\n        file.accepted = true;\n        if (this.options.autoQueue) {\n          this.enqueueFile(file);\n        } // Will set .accepted = true\n      }\n      return this._updateMaxFilesReachedClass();\n    });\n  }\n\n\n  // Wrapper for enqueueFile\n  enqueueFiles(files) {\n    for (let file of files) {\n      this.enqueueFile(file);\n    }\n    return null;\n  }\n\n  enqueueFile(file) {\n    if ((file.status === Dropzone.ADDED) && (file.accepted === true)) {\n      file.status = Dropzone.QUEUED;\n      if (this.options.autoProcessQueue) {\n        return setTimeout((() => this.processQueue()), 0); // Deferring the call\n      }\n    } else {\n      throw new Error(\"This file can't be queued because it has already been processed or was rejected.\");\n    }\n  }\n\n  _enqueueThumbnail(file) {\n    if (this.options.createImageThumbnails && file.type.match(/image.*/) && (file.size <= (this.options.maxThumbnailFilesize * 1024 * 1024))) {\n      this._thumbnailQueue.push(file);\n      return setTimeout((() => this._processThumbnailQueue()), 0); // Deferring the call\n    }\n  }\n\n  _processThumbnailQueue() {\n    if (this._processingThumbnail || (this._thumbnailQueue.length === 0)) {\n      return;\n    }\n\n    this._processingThumbnail = true;\n    let file = this._thumbnailQueue.shift();\n    return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, dataUrl => {\n      this.emit(\"thumbnail\", file, dataUrl);\n      this._processingThumbnail = false;\n      return this._processThumbnailQueue();\n    });\n  }\n\n\n  // Can be called by the user to remove a file\n  removeFile(file) {\n    if (file.status === Dropzone.UPLOADING) {\n      this.cancelUpload(file);\n    }\n    this.files = without(this.files, file);\n\n    this.emit(\"removedfile\", file);\n    if (this.files.length === 0) {\n      return this.emit(\"reset\");\n    }\n  }\n\n  // Removes all files that aren't currently processed from the list\n  removeAllFiles(cancelIfNecessary) {\n    // Create a copy of files since removeFile() changes the @files array.\n    if (cancelIfNecessary == null) {\n      cancelIfNecessary = false;\n    }\n    for (let file of this.files.slice()) {\n      if ((file.status !== Dropzone.UPLOADING) || cancelIfNecessary) {\n        this.removeFile(file);\n      }\n    }\n    return null;\n  }\n\n  // Resizes an image before it gets sent to the server. This function is the default behavior of\n  // `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with\n  // the resized blob.\n  resizeImage(file, width, height, resizeMethod, callback) {\n    return this.createThumbnail(file, width, height, resizeMethod, true, (dataUrl, canvas) => {\n      if (canvas == null) {\n        // The image has not been resized\n        return callback(file);\n      } else {\n        let {resizeMimeType} = this.options;\n        if (resizeMimeType == null) {\n          resizeMimeType = file.type;\n        }\n        let resizedDataURL = canvas.toDataURL(resizeMimeType, this.options.resizeQuality);\n        if ((resizeMimeType === 'image/jpeg') || (resizeMimeType === 'image/jpg')) {\n          // Now add the original EXIF information\n          resizedDataURL = ExifRestore.restore(file.dataURL, resizedDataURL);\n        }\n        return callback(Dropzone.dataURItoBlob(resizedDataURL));\n      }\n    });\n  }\n\n  createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {\n    let fileReader = new FileReader;\n\n    fileReader.onload = () => {\n\n      file.dataURL = fileReader.result;\n\n      // Don't bother creating a thumbnail for SVG images since they're vector\n      if (file.type === \"image/svg+xml\") {\n        if (callback != null) {\n          callback(fileReader.result);\n        }\n        return;\n      }\n\n      return this.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);\n    };\n\n    return fileReader.readAsDataURL(file);\n  }\n\n  createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin) {\n    // Not using `new Image` here because of a bug in latest Chrome versions.\n    // See https://github.com/enyo/dropzone/pull/226\n    let img = document.createElement(\"img\");\n\n    if (crossOrigin) {\n      img.crossOrigin = crossOrigin;\n    }\n\n    img.onload = () => {\n      let loadExif = callback => callback(1);\n      if ((typeof EXIF !== 'undefined' && EXIF !== null) && fixOrientation) {\n        loadExif = callback =>\n            EXIF.getData(img, function () {\n              return callback(EXIF.getTag(this, 'Orientation'));\n            })\n        ;\n      }\n\n      return loadExif(orientation => {\n        file.width = img.width;\n        file.height = img.height;\n\n        let resizeInfo = this.options.resize.call(this, file, width, height, resizeMethod);\n\n        let canvas = document.createElement(\"canvas\");\n        let ctx = canvas.getContext(\"2d\");\n\n        canvas.width = resizeInfo.trgWidth;\n        canvas.height = resizeInfo.trgHeight;\n\n        if (orientation > 4) {\n          canvas.width = resizeInfo.trgHeight;\n          canvas.height = resizeInfo.trgWidth;\n        }\n\n        switch (orientation) {\n          case 2:\n            // horizontal flip\n            ctx.translate(canvas.width, 0);\n            ctx.scale(-1, 1);\n            break;\n          case 3:\n            // 180° rotate left\n            ctx.translate(canvas.width, canvas.height);\n            ctx.rotate(Math.PI);\n            break;\n          case 4:\n            // vertical flip\n            ctx.translate(0, canvas.height);\n            ctx.scale(1, -1);\n            break;\n          case 5:\n            // vertical flip + 90 rotate right\n            ctx.rotate(0.5 * Math.PI);\n            ctx.scale(1, -1);\n            break;\n          case 6:\n            // 90° rotate right\n            ctx.rotate(0.5 * Math.PI);\n            ctx.translate(0, -canvas.width);\n            break;\n          case 7:\n            // horizontal flip + 90 rotate right\n            ctx.rotate(0.5 * Math.PI);\n            ctx.translate(canvas.height, -canvas.width);\n            ctx.scale(-1, 1);\n            break;\n          case 8:\n            // 90° rotate left\n            ctx.rotate(-0.5 * Math.PI);\n            ctx.translate(-canvas.height, 0);\n            break;\n        }\n\n        // This is a bugfix for iOS' scaling bug.\n        drawImageIOSFix(ctx, img, resizeInfo.srcX != null ? resizeInfo.srcX : 0, resizeInfo.srcY != null ? resizeInfo.srcY : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX != null ? resizeInfo.trgX : 0, resizeInfo.trgY != null ? resizeInfo.trgY : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);\n\n        let thumbnail = canvas.toDataURL(\"image/png\");\n\n        if (callback != null) {\n          return callback(thumbnail, canvas);\n        }\n      });\n    };\n\n    if (callback != null) {\n      img.onerror = callback;\n    }\n\n    return img.src = file.dataURL;\n  }\n\n\n  // Goes through the queue and processes files if there aren't too many already.\n  processQueue() {\n    let {parallelUploads} = this.options;\n    let processingLength = this.getUploadingFiles().length;\n    let i = processingLength;\n\n    // There are already at least as many files uploading than should be\n    if (processingLength >= parallelUploads) {\n      return;\n    }\n\n    let queuedFiles = this.getQueuedFiles();\n\n    if (!(queuedFiles.length > 0)) {\n      return;\n    }\n\n    if (this.options.uploadMultiple) {\n      // The files should be uploaded in one request\n      return this.processFiles(queuedFiles.slice(0, (parallelUploads - processingLength)));\n    } else {\n      while (i < parallelUploads) {\n        if (!queuedFiles.length) {\n          return;\n        } // Nothing left to process\n        this.processFile(queuedFiles.shift());\n        i++;\n      }\n    }\n  }\n\n\n  // Wrapper for `processFiles`\n  processFile(file) {\n    return this.processFiles([file]);\n  }\n\n\n  // Loads the file, then calls finishedLoading()\n  processFiles(files) {\n    for (let file of files) {\n      file.processing = true; // Backwards compatibility\n      file.status = Dropzone.UPLOADING;\n\n      this.emit(\"processing\", file);\n    }\n\n    if (this.options.uploadMultiple) {\n      this.emit(\"processingmultiple\", files);\n    }\n\n    return this.uploadFiles(files);\n  }\n\n\n  _getFilesWithXhr(xhr) {\n    let files;\n    return files = (this.files.filter((file) => file.xhr === xhr).map((file) => file));\n  }\n\n\n  // Cancels the file upload and sets the status to CANCELED\n  // **if** the file is actually being uploaded.\n  // If it's still in the queue, the file is being removed from it and the status\n  // set to CANCELED.\n  cancelUpload(file) {\n    if (file.status === Dropzone.UPLOADING) {\n      let groupedFiles = this._getFilesWithXhr(file.xhr);\n      for (let groupedFile of groupedFiles) {\n        groupedFile.status = Dropzone.CANCELED;\n      }\n      if (typeof file.xhr !== 'undefined') {\n        file.xhr.abort();\n      }\n      for (let groupedFile of groupedFiles) {\n        this.emit(\"canceled\", groupedFile);\n      }\n      if (this.options.uploadMultiple) {\n        this.emit(\"canceledmultiple\", groupedFiles);\n      }\n\n    } else if (file.status === Dropzone.ADDED || file.status === Dropzone.QUEUED) {\n      file.status = Dropzone.CANCELED;\n      this.emit(\"canceled\", file);\n      if (this.options.uploadMultiple) {\n        this.emit(\"canceledmultiple\", [file]);\n      }\n    }\n\n    if (this.options.autoProcessQueue) {\n      return this.processQueue();\n    }\n  }\n\n  resolveOption(option, ...args) {\n    if (typeof option === 'function') {\n      return option.apply(this, args);\n    }\n    return option;\n  }\n\n  uploadFile(file) { return this.uploadFiles([file]); }\n\n  uploadFiles(files) {\n    this._transformFiles(files, (transformedFiles) => {\n      if (files[0].upload.chunked) {\n        // This file should be sent in chunks!\n\n        // If the chunking option is set, we **know** that there can only be **one** file, since\n        // uploadMultiple is not allowed with this option.\n        let file = files[0];\n        let transformedFile = transformedFiles[0];\n        let startedChunkCount = 0;\n\n        file.upload.chunks = [];\n\n        let handleNextChunk = () => {\n          let chunkIndex = 0;\n\n          // Find the next item in file.upload.chunks that is not defined yet.\n          while (file.upload.chunks[chunkIndex] !== undefined) {\n            chunkIndex++;\n          }\n\n          // This means, that all chunks have already been started.\n          if (chunkIndex >= file.upload.totalChunkCount) return;\n\n          startedChunkCount++;\n\n          let start = chunkIndex * this.options.chunkSize;\n          let end = Math.min(start + this.options.chunkSize, file.size);\n\n          let dataBlock = {\n            name: this._getParamName(0),\n            data: transformedFile.webkitSlice ? transformedFile.webkitSlice(start, end) : transformedFile.slice(start, end),\n            filename: file.upload.filename,\n            chunkIndex: chunkIndex\n          };\n\n          file.upload.chunks[chunkIndex] = {\n            file: file,\n            index: chunkIndex,\n            dataBlock: dataBlock, // In case we want to retry.\n            status: Dropzone.UPLOADING,\n            progress: 0,\n            retries: 0 // The number of times this block has been retried.\n          };\n\n\n          this._uploadData(files, [dataBlock]);\n        };\n\n        file.upload.finishedChunkUpload = (chunk) => {\n          let allFinished = true;\n          chunk.status = Dropzone.SUCCESS;\n\n          // Clear the data from the chunk\n          chunk.dataBlock = null;\n          // Leaving this reference to xhr intact here will cause memory leaks in some browsers\n          chunk.xhr = null;\n\n          for (let i = 0; i < file.upload.totalChunkCount; i ++) {\n            if (file.upload.chunks[i] === undefined) {\n              return handleNextChunk();\n            }\n            if (file.upload.chunks[i].status !== Dropzone.SUCCESS) {\n              allFinished = false;\n            }\n          }\n\n          if (allFinished) {\n            this.options.chunksUploaded(file, () => {\n              this._finished(files, '', null);\n            });\n          }\n        };\n\n        if (this.options.parallelChunkUploads) {\n          for (let i = 0; i < file.upload.totalChunkCount; i++) {\n            handleNextChunk();\n          }\n        }\n        else {\n          handleNextChunk();\n        }\n      } else {\n        let dataBlocks = [];\n        for (let i = 0; i < files.length; i++) {\n          dataBlocks[i] = {\n            name: this._getParamName(i),\n            data: transformedFiles[i],\n            filename: files[i].upload.filename\n          };\n        }\n        this._uploadData(files, dataBlocks);\n      }\n    });\n  }\n\n  /// Returns the right chunk for given file and xhr\n  _getChunk(file, xhr) {\n    for (let i = 0; i < file.upload.totalChunkCount; i++) {\n      if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) {\n        return file.upload.chunks[i];\n      }\n    }\n  }\n\n  // This function actually uploads the file(s) to the server.\n  // If dataBlocks contains the actual data to upload (meaning, that this could either be transformed\n  // files, or individual chunks for chunked upload).\n  _uploadData(files, dataBlocks) {\n    let xhr = new XMLHttpRequest();\n\n    // Put the xhr object in the file objects to be able to reference it later.\n    for (let file of files) {\n      file.xhr = xhr;\n    }\n    if (files[0].upload.chunked) {\n      // Put the xhr object in the right chunk object, so it can be associated later, and found with _getChunk\n      files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;\n    }\n\n    let method = this.resolveOption(this.options.method, files);\n    let url = this.resolveOption(this.options.url, files);\n    xhr.open(method, url, true);\n\n    // Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8\n    xhr.timeout = this.resolveOption(this.options.timeout, files);\n\n    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179\n    xhr.withCredentials = !!this.options.withCredentials;\n\n\n    xhr.onload = e => {\n      this._finishedUploading(files, xhr, e);\n    };\n\n    xhr.ontimeout = () => {\n      this._handleUploadError(files, xhr, `Request timedout after ${this.options.timeout} seconds`);\n    };\n\n    xhr.onerror = () => {\n      this._handleUploadError(files, xhr);\n    };\n\n    // Some browsers do not have the .upload property\n    let progressObj = xhr.upload != null ? xhr.upload : xhr;\n    progressObj.onprogress = (e) => this._updateFilesUploadProgress(files, xhr, e);\n\n    let headers = {\n      \"Accept\": \"application/json\",\n      \"Cache-Control\": \"no-cache\",\n      \"X-Requested-With\": \"XMLHttpRequest\",\n    };\n\n    if (this.options.headers) {\n      Dropzone.extend(headers, this.options.headers);\n    }\n\n    for (let headerName in headers) {\n      let headerValue = headers[headerName];\n      if (headerValue) {\n        xhr.setRequestHeader(headerName, headerValue);\n      }\n    }\n\n    let formData = new FormData();\n\n    // Adding all @options parameters\n    if (this.options.params) {\n      let additionalParams = this.options.params;\n      if (typeof additionalParams === 'function') {\n        additionalParams = additionalParams.call(this, files, xhr, files[0].upload.chunked ? this._getChunk(files[0], xhr) : null);\n      }\n\n      for (let key in additionalParams) {\n        let value = additionalParams[key];\n        formData.append(key, value);\n      }\n    }\n\n    // Let the user add additional data if necessary\n    for (let file of files) {\n      this.emit(\"sending\", file, xhr, formData);\n    }\n    if (this.options.uploadMultiple) {\n      this.emit(\"sendingmultiple\", files, xhr, formData);\n    }\n\n\n    this._addFormElementData(formData);\n\n\n    // Finally add the files\n    // Has to be last because some servers (eg: S3) expect the file to be the last parameter\n    for (let i = 0; i < dataBlocks.length; i++) {\n      let dataBlock = dataBlocks[i];\n      formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);\n    }\n\n    this.submitRequest(xhr, formData, files);\n  }\n\n\n  // Transforms all files with this.options.transformFile and invokes done with the transformed files when done.\n  _transformFiles(files, done) {\n    let transformedFiles = [];\n    // Clumsy way of handling asynchronous calls, until I get to add a proper Future library.\n    let doneCounter = 0;\n    for (let i = 0; i < files.length; i++) {\n      this.options.transformFile.call(this, files[i], (transformedFile) => {\n        transformedFiles[i] = transformedFile;\n        if (++doneCounter === files.length) {\n          done(transformedFiles);\n        }\n      });\n    }\n  }\n\n  // Takes care of adding other input elements of the form to the AJAX request\n  _addFormElementData(formData) {\n    // Take care of other input elements\n    if (this.element.tagName === \"FORM\") {\n      for (let input of this.element.querySelectorAll(\"input, textarea, select, button\")) {\n        let inputName = input.getAttribute(\"name\");\n        let inputType = input.getAttribute(\"type\");\n        if (inputType) inputType = inputType.toLowerCase();\n\n        // If the input doesn't have a name, we can't use it.\n        if (typeof inputName === 'undefined' || inputName === null) continue;\n\n        if ((input.tagName === \"SELECT\") && input.hasAttribute(\"multiple\")) {\n          // Possibly multiple values\n          for (let option of input.options) {\n            if (option.selected) {\n              formData.append(inputName, option.value);\n            }\n          }\n        } else if (!inputType || (inputType !== \"checkbox\" && inputType !== \"radio\") || input.checked) {\n          formData.append(inputName, input.value);\n        }\n      }\n    }\n  }\n\n  // Invoked when there is new progress information about given files.\n  // If e is not provided, it is assumed that the upload is finished.\n  _updateFilesUploadProgress(files, xhr, e) {\n    let progress;\n    if (typeof e !== 'undefined') {\n      progress = (100 * e.loaded) / e.total;\n\n      if (files[0].upload.chunked) {\n        let file = files[0];\n        // Since this is a chunked upload, we need to update the appropriate chunk progress.\n        let chunk = this._getChunk(file, xhr);\n        chunk.progress = progress;\n        chunk.total = e.total;\n        chunk.bytesSent = e.loaded;\n        let fileProgress = 0, fileTotal, fileBytesSent;\n        file.upload.progress = 0;\n        file.upload.total = 0;\n        file.upload.bytesSent = 0;\n        for (let i = 0; i < file.upload.totalChunkCount; i++) {\n          if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].progress !== undefined) {\n            file.upload.progress += file.upload.chunks[i].progress;\n            file.upload.total += file.upload.chunks[i].total;\n            file.upload.bytesSent += file.upload.chunks[i].bytesSent;\n          }\n        }\n        file.upload.progress = file.upload.progress / file.upload.totalChunkCount;\n      } else {\n        for (let file of files) {\n          file.upload.progress = progress;\n          file.upload.total = e.total;\n          file.upload.bytesSent = e.loaded;\n        }\n      }\n      for (let file of files) {\n        this.emit(\"uploadprogress\", file, file.upload.progress, file.upload.bytesSent);\n      }\n    } else {\n      // Called when the file finished uploading\n\n      let allFilesFinished = true;\n\n      progress = 100;\n\n      for (let file of files) {\n        if ((file.upload.progress !== 100) || (file.upload.bytesSent !== file.upload.total)) {\n          allFilesFinished = false;\n        }\n        file.upload.progress = progress;\n        file.upload.bytesSent = file.upload.total;\n      }\n\n      // Nothing to do, all files already at 100%\n      if (allFilesFinished) {\n        return;\n      }\n\n      for (let file of files) {\n        this.emit(\"uploadprogress\", file, progress, file.upload.bytesSent);\n      }\n    }\n\n  }\n\n\n  _finishedUploading(files, xhr, e) {\n    let response;\n\n    if (files[0].status === Dropzone.CANCELED) {\n      return;\n    }\n\n    if (xhr.readyState !== 4) {\n      return;\n    }\n\n    if ((xhr.responseType !== 'arraybuffer') && (xhr.responseType !== 'blob')) {\n      response = xhr.responseText;\n\n      if (xhr.getResponseHeader(\"content-type\") && ~xhr.getResponseHeader(\"content-type\").indexOf(\"application/json\")) {\n        try {\n          response = JSON.parse(response);\n        } catch (error) {\n          e = error;\n          response = \"Invalid JSON response from server.\";\n        }\n      }\n    }\n\n    this._updateFilesUploadProgress(files);\n\n    if (!(200 <= xhr.status && xhr.status < 300)) {\n      this._handleUploadError(files, xhr, response);\n    } else {\n      if (files[0].upload.chunked) {\n        files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr));\n      } else {\n        this._finished(files, response, e);\n      }\n    }\n  }\n\n  _handleUploadError(files, xhr, response) {\n    if (files[0].status === Dropzone.CANCELED) {\n      return;\n    }\n\n    if (files[0].upload.chunked && this.options.retryChunks) {\n      let chunk = this._getChunk(files[0], xhr);\n      if (chunk.retries++ < this.options.retryChunksLimit) {\n        this._uploadData(files, [chunk.dataBlock]);\n        return;\n      } else {\n        console.warn('Retried this chunk too often. Giving up.')\n      }\n    }\n\n    for (let file of files) {\n      this._errorProcessing(files, response || this.options.dictResponseError.replace(\"{{statusCode}}\", xhr.status), xhr);\n    }\n  }\n\n  submitRequest(xhr, formData, files) {\n    xhr.send(formData);\n  }\n\n  // Called internally when processing is finished.\n  // Individual callbacks have to be called in the appropriate sections.\n  _finished(files, responseText, e) {\n    for (let file of files) {\n      file.status = Dropzone.SUCCESS;\n      this.emit(\"success\", file, responseText, e);\n      this.emit(\"complete\", file);\n    }\n    if (this.options.uploadMultiple) {\n      this.emit(\"successmultiple\", files, responseText, e);\n      this.emit(\"completemultiple\", files);\n    }\n\n    if (this.options.autoProcessQueue) {\n      return this.processQueue();\n    }\n  }\n\n  // Called internally when processing is finished.\n  // Individual callbacks have to be called in the appropriate sections.\n  _errorProcessing(files, message, xhr) {\n    for (let file of files) {\n      file.status = Dropzone.ERROR;\n      this.emit(\"error\", file, message, xhr);\n      this.emit(\"complete\", file);\n    }\n    if (this.options.uploadMultiple) {\n      this.emit(\"errormultiple\", files, message, xhr);\n      this.emit(\"completemultiple\", files);\n    }\n\n    if (this.options.autoProcessQueue) {\n      return this.processQueue();\n    }\n  }\n\n  static uuidv4() {\n    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {\n      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);\n      return v.toString(16);\n    });\n  };\n}\nDropzone.initClass();\n\n\nDropzone.version = \"5.5.0\";\n\n\n// This is a map of options for your different dropzones. Add configurations\n// to this object for your different dropzone elemens.\n//\n// Example:\n//\n//     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };\n//\n// To disable autoDiscover for a specific element, you can set `false` as an option:\n//\n//     Dropzone.options.myDisabledElementId = false;\n//\n// And in html:\n//\n//     <form action=\"/upload\" id=\"my-dropzone-element-id\" class=\"dropzone\"></form>\nDropzone.options = {};\n\n\n// Returns the options for an element or undefined if none available.\nDropzone.optionsForElement = function (element) {\n  // Get the `Dropzone.options.elementId` for this element if it exists\n  if (element.getAttribute(\"id\")) {\n    return Dropzone.options[camelize(element.getAttribute(\"id\"))];\n  } else {\n    return undefined;\n  }\n};\n\n\n// Holds a list of all dropzone instances\nDropzone.instances = [];\n\n// Returns the dropzone for given element if any\nDropzone.forElement = function (element) {\n  if (typeof element === \"string\") {\n    element = document.querySelector(element);\n  }\n  if ((element != null ? element.dropzone : undefined) == null) {\n    throw new Error(\"No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.\");\n  }\n  return element.dropzone;\n};\n\n\n// Set to false if you don't want Dropzone to automatically find and attach to .dropzone elements.\nDropzone.autoDiscover = true;\n\n// Looks for all .dropzone elements and creates a dropzone for them\nDropzone.discover = function () {\n  let dropzones;\n  if (document.querySelectorAll) {\n    dropzones = document.querySelectorAll(\".dropzone\");\n  } else {\n    dropzones = [];\n    // IE :(\n    let checkElements = elements =>\n        (() => {\n          let result = [];\n          for (let el of elements) {\n            if (/(^| )dropzone($| )/.test(el.className)) {\n              result.push(dropzones.push(el));\n            } else {\n              result.push(undefined);\n            }\n          }\n          return result;\n        })()\n    ;\n    checkElements(document.getElementsByTagName(\"div\"));\n    checkElements(document.getElementsByTagName(\"form\"));\n  }\n\n  return (() => {\n    let result = [];\n    for (let dropzone of dropzones) {\n      // Create a dropzone unless auto discover has been disabled for specific element\n      if (Dropzone.optionsForElement(dropzone) !== false) {\n        result.push(new Dropzone(dropzone));\n      } else {\n        result.push(undefined);\n      }\n    }\n    return result;\n  })();\n};\n\n\n// Since the whole Drag'n'Drop API is pretty new, some browsers implement it,\n// but not correctly.\n// So I created a blacklist of userAgents. Yes, yes. Browser sniffing, I know.\n// But what to do when browsers *theoretically* support an API, but crash\n// when using it.\n//\n// This is a list of regular expressions tested against navigator.userAgent\n//\n// ** It should only be used on browser that *do* support the API, but\n// incorrectly **\n//\nDropzone.blacklistedBrowsers = [\n  // The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.\n  /opera.*(Macintosh|Windows Phone).*version\\/12/i\n];\n\n\n// Checks if the browser is supported\nDropzone.isBrowserSupported = function () {\n  let capableBrowser = true;\n\n  if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {\n    if (!(\"classList\" in document.createElement(\"a\"))) {\n      capableBrowser = false;\n    } else {\n      // The browser supports the API, but may be blacklisted.\n      for (let regex of Dropzone.blacklistedBrowsers) {\n        if (regex.test(navigator.userAgent)) {\n          capableBrowser = false;\n          continue;\n        }\n      }\n    }\n  } else {\n    capableBrowser = false;\n  }\n\n  return capableBrowser;\n};\n\nDropzone.dataURItoBlob = function (dataURI) {\n  // convert base64 to raw binary data held in a string\n  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this\n  let byteString = atob(dataURI.split(',')[1]);\n\n  // separate out the mime component\n  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];\n\n  // write the bytes of the string to an ArrayBuffer\n  let ab = new ArrayBuffer(byteString.length);\n  let ia = new Uint8Array(ab);\n  for (let i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {\n    ia[i] = byteString.charCodeAt(i);\n  }\n\n  // write the ArrayBuffer to a blob\n  return new Blob([ab], {type: mimeString});\n};\n\n// Returns an array without the rejected item\nconst without = (list, rejectedItem) => list.filter((item) => item !== rejectedItem).map((item) => item);\n\n// abc-def_ghi -> abcDefGhi\nconst camelize = str => str.replace(/[\\-_](\\w)/g, match => match.charAt(1).toUpperCase());\n\n// Creates an element from string\nDropzone.createElement = function (string) {\n  let div = document.createElement(\"div\");\n  div.innerHTML = string;\n  return div.childNodes[0];\n};\n\n// Tests if given element is inside (or simply is) the container\nDropzone.elementInside = function (element, container) {\n  if (element === container) {\n    return true;\n  } // Coffeescript doesn't support do/while loops\n  while ((element = element.parentNode)) {\n    if (element === container) {\n      return true;\n    }\n  }\n  return false;\n};\n\n\nDropzone.getElement = function (el, name) {\n  let element;\n  if (typeof el === \"string\") {\n    element = document.querySelector(el);\n  } else if (el.nodeType != null) {\n    element = el;\n  }\n  if (element == null) {\n    throw new Error(`Invalid \\`${name}\\` option provided. Please provide a CSS selector or a plain HTML element.`);\n  }\n  return element;\n};\n\n\nDropzone.getElements = function (els, name) {\n  let el, elements;\n  if (els instanceof Array) {\n    elements = [];\n    try {\n      for (el of els) {\n        elements.push(this.getElement(el, name));\n      }\n    } catch (e) {\n      elements = null;\n    }\n  } else if (typeof els === \"string\") {\n    elements = [];\n    for (el of document.querySelectorAll(els)) {\n      elements.push(el);\n    }\n  } else if (els.nodeType != null) {\n    elements = [els];\n  }\n\n  if ((elements == null) || !elements.length) {\n    throw new Error(`Invalid \\`${name}\\` option provided. Please provide a CSS selector, a plain HTML element or a list of those.`);\n  }\n\n  return elements;\n};\n\n// Asks the user the question and calls accepted or rejected accordingly\n//\n// The default implementation just uses `window.confirm` and then calls the\n// appropriate callback.\nDropzone.confirm = function (question, accepted, rejected) {\n  if (window.confirm(question)) {\n    return accepted();\n  } else if (rejected != null) {\n    return rejected();\n  }\n};\n\n// Validates the mime type like this:\n//\n// https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept\nDropzone.isValidFile = function (file, acceptedFiles) {\n  if (!acceptedFiles) {\n    return true;\n  } // If there are no accepted mime types, it's OK\n  acceptedFiles = acceptedFiles.split(\",\");\n\n  let mimeType = file.type;\n  let baseMimeType = mimeType.replace(/\\/.*$/, \"\");\n\n  for (let validType of acceptedFiles) {\n    validType = validType.trim();\n    if (validType.charAt(0) === \".\") {\n      if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {\n        return true;\n      }\n    } else if (/\\/\\*$/.test(validType)) {\n      // This is something like a image/* mime type\n      if (baseMimeType === validType.replace(/\\/.*$/, \"\")) {\n        return true;\n      }\n    } else {\n      if (mimeType === validType) {\n        return true;\n      }\n    }\n  }\n\n  return false;\n};\n\n// Augment jQuery\nif (typeof jQuery !== 'undefined' && jQuery !== null) {\n  jQuery.fn.dropzone = function (options) {\n    return this.each(function () {\n      return new Dropzone(this, options);\n    });\n  };\n}\n\n\nif (typeof module !== 'undefined' && module !== null) {\n  module.exports = Dropzone;\n} else {\n  window.Dropzone = Dropzone;\n}\n\n\n// Dropzone file status codes\nDropzone.ADDED = \"added\";\n\nDropzone.QUEUED = \"queued\";\n// For backwards compatibility. Now, if a file is accepted, it's either queued\n// or uploading.\nDropzone.ACCEPTED = Dropzone.QUEUED;\n\nDropzone.UPLOADING = \"uploading\";\nDropzone.PROCESSING = Dropzone.UPLOADING; // alias\n\nDropzone.CANCELED = \"canceled\";\nDropzone.ERROR = \"error\";\nDropzone.SUCCESS = \"success\";\n\n\n/*\n\n Bugfix for iOS 6 and 7\n Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios\n based on the work of https://github.com/stomita/ios-imagefile-megapixel\n\n */\n\n// Detecting vertical squash in loaded image.\n// Fixes a bug which squash image vertically while drawing into canvas for some images.\n// This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel\nlet detectVerticalSquash = function (img) {\n  let iw = img.naturalWidth;\n  let ih = img.naturalHeight;\n  let canvas = document.createElement(\"canvas\");\n  canvas.width = 1;\n  canvas.height = ih;\n  let ctx = canvas.getContext(\"2d\");\n  ctx.drawImage(img, 0, 0);\n  let {data} = ctx.getImageData(1, 0, 1, ih);\n\n\n  // search image edge pixel position in case it is squashed vertically.\n  let sy = 0;\n  let ey = ih;\n  let py = ih;\n  while (py > sy) {\n    let alpha = data[((py - 1) * 4) + 3];\n\n    if (alpha === 0) {\n      ey = py;\n    } else {\n      sy = py;\n    }\n\n    py = (ey + sy) >> 1;\n  }\n  let ratio = (py / ih);\n\n  if (ratio === 0) {\n    return 1;\n  } else {\n    return ratio;\n  }\n};\n\n// A replacement for context.drawImage\n// (args are for source and destination).\nvar drawImageIOSFix = function (ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {\n  let vertSquashRatio = detectVerticalSquash(img);\n  return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);\n};\n\n\n// Based on MinifyJpeg\n// Source: http://www.perry.cz/files/ExifRestorer.js\n// http://elicon.blog57.fc2.com/blog-entry-206.html\nclass ExifRestore {\n  static initClass() {\n    this.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n  }\n\n  static encode64(input) {\n    let output = '';\n    let chr1 = undefined;\n    let chr2 = undefined;\n    let chr3 = '';\n    let enc1 = undefined;\n    let enc2 = undefined;\n    let enc3 = undefined;\n    let enc4 = '';\n    let i = 0;\n    while (true) {\n      chr1 = input[i++];\n      chr2 = input[i++];\n      chr3 = input[i++];\n      enc1 = chr1 >> 2;\n      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);\n      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);\n      enc4 = chr3 & 63;\n      if (isNaN(chr2)) {\n        enc3 = (enc4 = 64);\n      } else if (isNaN(chr3)) {\n        enc4 = 64;\n      }\n      output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);\n      chr1 = (chr2 = (chr3 = ''));\n      enc1 = (enc2 = (enc3 = (enc4 = '')));\n      if (!(i < input.length)) {\n        break;\n      }\n    }\n    return output;\n  }\n\n  static restore(origFileBase64, resizedFileBase64) {\n    if (!origFileBase64.match('data:image/jpeg;base64,')) {\n      return resizedFileBase64;\n    }\n    let rawImage = this.decode64(origFileBase64.replace('data:image/jpeg;base64,', ''));\n    let segments = this.slice2Segments(rawImage);\n    let image = this.exifManipulation(resizedFileBase64, segments);\n    return `data:image/jpeg;base64,${this.encode64(image)}`;\n  }\n\n  static exifManipulation(resizedFileBase64, segments) {\n    let exifArray = this.getExifArray(segments);\n    let newImageArray = this.insertExif(resizedFileBase64, exifArray);\n    let aBuffer = new Uint8Array(newImageArray);\n    return aBuffer;\n  }\n\n  static getExifArray(segments) {\n    let seg = undefined;\n    let x = 0;\n    while (x < segments.length) {\n      seg = segments[x];\n      if ((seg[0] === 255) & (seg[1] === 225)) {\n        return seg;\n      }\n      x++;\n    }\n    return [];\n  }\n\n  static insertExif(resizedFileBase64, exifArray) {\n    let imageData = resizedFileBase64.replace('data:image/jpeg;base64,', '');\n    let buf = this.decode64(imageData);\n    let separatePoint = buf.indexOf(255, 3);\n    let mae = buf.slice(0, separatePoint);\n    let ato = buf.slice(separatePoint);\n    let array = mae;\n    array = array.concat(exifArray);\n    array = array.concat(ato);\n    return array;\n  }\n\n  static slice2Segments(rawImageArray) {\n    let head = 0;\n    let segments = [];\n    while (true) {\n      var length;\n      if ((rawImageArray[head] === 255) & (rawImageArray[head + 1] === 218)) {\n        break;\n      }\n      if ((rawImageArray[head] === 255) & (rawImageArray[head + 1] === 216)) {\n        head += 2;\n      } else {\n        length = (rawImageArray[head + 2] * 256) + rawImageArray[head + 3];\n        let endPoint = head + length + 2;\n        let seg = rawImageArray.slice(head, endPoint);\n        segments.push(seg);\n        head = endPoint;\n      }\n      if (head > rawImageArray.length) {\n        break;\n      }\n    }\n    return segments;\n  }\n\n  static decode64(input) {\n    let output = '';\n    let chr1 = undefined;\n    let chr2 = undefined;\n    let chr3 = '';\n    let enc1 = undefined;\n    let enc2 = undefined;\n    let enc3 = undefined;\n    let enc4 = '';\n    let i = 0;\n    let buf = [];\n    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =\n    let base64test = /[^A-Za-z0-9\\+\\/\\=]/g;\n    if (base64test.exec(input)) {\n      console.warn('There were invalid base64 characters in the input text.\\nValid base64 characters are A-Z, a-z, 0-9, \\'+\\', \\'/\\',and \\'=\\'\\nExpect errors in decoding.');\n    }\n    input = input.replace(/[^A-Za-z0-9\\+\\/\\=]/g, '');\n    while (true) {\n      enc1 = this.KEY_STR.indexOf(input.charAt(i++));\n      enc2 = this.KEY_STR.indexOf(input.charAt(i++));\n      enc3 = this.KEY_STR.indexOf(input.charAt(i++));\n      enc4 = this.KEY_STR.indexOf(input.charAt(i++));\n      chr1 = (enc1 << 2) | (enc2 >> 4);\n      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);\n      chr3 = ((enc3 & 3) << 6) | enc4;\n      buf.push(chr1);\n      if (enc3 !== 64) {\n        buf.push(chr2);\n      }\n      if (enc4 !== 64) {\n        buf.push(chr3);\n      }\n      chr1 = (chr2 = (chr3 = ''));\n      enc1 = (enc2 = (enc3 = (enc4 = '')));\n      if (!(i < input.length)) {\n        break;\n      }\n    }\n    return buf;\n  }\n}\nExifRestore.initClass();\n\n\n/*\n * contentloaded.js\n *\n * Author: Diego Perini (diego.perini at gmail.com)\n * Summary: cross-browser wrapper for DOMContentLoaded\n * Updated: 20101020\n * License: MIT\n * Version: 1.2\n *\n * URL:\n * http://javascript.nwbox.com/ContentLoaded/\n * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE\n */\n\n// @win window reference\n// @fn function reference\nlet contentLoaded = function (win, fn) {\n  let done = false;\n  let top = true;\n  let doc = win.document;\n  let root = doc.documentElement;\n  let add = (doc.addEventListener ? \"addEventListener\" : \"attachEvent\");\n  let rem = (doc.addEventListener ? \"removeEventListener\" : \"detachEvent\");\n  let pre = (doc.addEventListener ? \"\" : \"on\");\n  var init = function (e) {\n    if ((e.type === \"readystatechange\") && (doc.readyState !== \"complete\")) {\n      return;\n    }\n    ((e.type === \"load\" ? win : doc))[rem](pre + e.type, init, false);\n    if (!done && (done = true)) {\n      return fn.call(win, e.type || e);\n    }\n  };\n\n  var poll = function () {\n    try {\n      root.doScroll(\"left\");\n    } catch (e) {\n      setTimeout(poll, 50);\n      return;\n    }\n    return init(\"poll\");\n  };\n\n  if (doc.readyState !== \"complete\") {\n    if (doc.createEventObject && root.doScroll) {\n      try {\n        top = !win.frameElement;\n      } catch (error) {\n      }\n      if (top) {\n        poll();\n      }\n    }\n    doc[add](pre + \"DOMContentLoaded\", init, false);\n    doc[add](pre + \"readystatechange\", init, false);\n    return win[add](pre + \"load\", init, false);\n  }\n};\n\n\n// As a single function to be able to write tests.\nDropzone._autoDiscoverFunction = function () {\n  if (Dropzone.autoDiscover) {\n    return Dropzone.discover();\n  }\n};\ncontentLoaded(window, Dropzone._autoDiscoverFunction);\n\nfunction __guard__(value, transform) {\n  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;\n}\nfunction __guardMethod__(obj, methodName, transform) {\n  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {\n    return transform(obj, methodName);\n  } else {\n    return undefined;\n  }\n}"],"file":"dropzone.js"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ֞U�L�:w����� �r4!�Z��A	��)&�!�i�����8�a��� aTI�8�i`U��`"��Xr�% �v��'p��=���(��8Jeв�vT��|
*q��{��!n���Y��cf��2 ����,}D�>ߣQ�pY@�+��/�!�7�#��d�J�K��/ڪD�~�v �O�^�쇧z�N��Xl�|�ar����!O��hKN @.�`�K�Ɇ��q�s~�Z��Wj]��k9qE���IN��i6<@{��Q�����-�������Ѿ�㰅�)���X����i0�et�_�E����a7.��lFD�"7�,>��E�|jhT�^j?�0ɉ��3-ꌧP�܁�r�*��b#?#�|�p�y�����Ӟ�^��el"����Е�fA�,ʸ9�z35��H�LSΘ�Z�c�;�M	f�x��zB���=�O%F�6y}����a6�y&*���M)��D��&����E�F���y����H`��N
�+C�eS
g�~�������@ x]j{_��/`���������(���s����K�g{���(�u�[8�}s��Ƹ�	"f��{�0\p ѻ�4��WF�I�����bX����ܳDK*{氤쌑o)�
k�L� 5�*%P���l쯲νڬi�`H*��W7ٽ�g��͔�Z�]Si !������mB  SS�~x�F�]�P�Kݪ'cY��),��fx!��fK��&g�s�~�mT5��]PP0N^6D��:D�R�W��5���n? ���>]b�m��vQ�
��2��b�� ��1`��o�z��Qar!Xo�Q��	@I���
s�U�_��#� �c�!
6���fJ����  �}O�}��m��9Ll����M��S^'��y#��% �La�V� S�U#� ��X@��   8� ����C � �i┤��qaΰ�����j��W��x~od�0�������^�@����#�bVH���1ŸP	���1>}"s���%t
��ELi�^�Y��g��>|,^�Dr|p$�N�޺��|� ��`4�jį�{ ��TG�N*�^��pq�To�R���_��M̃����ny���1X�#��V�ۙ D�L]+�:�Qc� 3S1�������]JI�qX��lDRc����3mI�T�
<09EbpHP��T�ɰb�3I3>p�J ��ۻ�6�#a�:f7=��PՒt����>��pѥe+��ig{��%y�`�����:�V+��qm�閵R�*�@�!����3��l��o]���R�9#Sv�1p|�7���E��X""��%|�!С�խUd|�����h�js��`��/��?�� 5bn8���^�B��8
B+�]PfS�'�� �Χ>����5������E�1l��I���a������޷�Zyz��
r.�w�S!�Yh�3�����O,>��x�Y�&��f����ć��y���L䂇sZ�n~9Ћ���k3�b6�����\�tJ؄]�</^U-]{�!	VU�V���d愖8N���-9�+Abj}�Q�q�X��&�y�
�w��r y4�c`C��������i�� ����ș���!#hMe��@��X/�ס$Dㆡ��W�[��:��?c�̷I��aC}pw�Z�f�eAH>@K6�mP���:�X���PL�~��go��4��m,���:Y�E.��=?]L��0
��w߉��Y�r�e��M]^�mN�&�x#+�aa���5��&}F���D�et�H�qnA/)h�EW㜠rs��Ϊ,�V�N��&�Sh�T�2������_�7&�%��I��Yk�}+{OT�?Ёm����>�18u�Q7�@�s�2�E�\�2F�A\�G%N
��uU�g�_	�	^��P��/�.�|?��T�?��W2�m>�v8S�6	�!Ej��n�	�V.A|Nڀd�e	ƀ��\m�MW��jb��UZٛ�>�T�1��뎂rU�A�b�*p�A���"�r�βL��w��RJ���
O��	����!gb����o
��X~l�dz��Q�q�b'�3���uw�P ���_�C�1q��O��ԏ����W.�Bu����K��8T��Eb�<�W��[�`�"�{?>0G��'�z�\T����C;zn�$��c�&��yMlR�j<�����8\��2�:~�Wt?��U��(z�3d'4�o8UU���l.¸uxg�H�ʏ�1��{��t���8��T�H4?f}1C�vrx����P�f��L
��{��<���l��&%XbǾ��2���� ��.�������&O�Zm�l��֍���O�����*x�iYB����k��J�b�l"ʇ�� ���X@$�Y��3l��	��s^�ۇ�f	�Ө����(��ۻ~N���S��u��t����l���QwC=�aćP�M��x~B�~#w��_��i��Uc7���K��$I��E!1^��w	�}^L(h�N��W��_�y��ߣν���ڱ��4�T�4���Jr��)6���X�>`�+W��ɿj�mo_k,�8+`wY�/ıW23ڤjǈt��_&j��x��J�j�r�cv�O�-�|Ǵ��ι����ɵh*�8�XX��^�=<��!�9&�s�c������2z�k!پ߮}�V�=�~�D�����L S��{\ ��/A�������o���r�?�eF�0���C�`K�9+$9�3{l=.(W�B���x��G�Hhu0Z�����g����S��$
tў�c�Sw��t�q��0��d��5�NDM/ʾ-�M�vp�G��������v���
�j�/�׏jc�L-���Ѱ�\��.�����挃��1�-�@ۼE�����J��7�b�!e�
����;(�Z�ѥ-T��/�+�o��jU����(��4.jt���Fgr���B��n�d�-�O�~�58��"lV�H�5ȭ3v���} {>�����3s�h�or7g��0���,�.�o�DIHXO�Y�mM	Z9����u���H{3��-�:z#�=Oul��r5���~_�nZ��&S�)�I�����/KΫ�@j����ۂ��_�(�n�5/p�F������c6|p��� ,;�is6&y���k�B�u7�*%�G{��6��owó7&����_ і=��7��
-F��cߣr����g7�y�?���hx<�{	8��a��n��Vq5W�s+
K�����I�D�㧖����(tL�#
�v��+ү܇Z���]�X��.���߸~�M�\��6&X�%��EXy��Wf	^��5!��q�a�d����$x  ))��Ү�3������^�J��CQ�g�����X�T�А�2hH�Q�h��Fyg��v�� n�	��K��m���-�<��Π��w��� ����Z*����n��#��A�i�Ih��2B�$:\�;}�]�dd�ìg�z$c���
t
j)T"�4�s����ֆY2���LL��Or�(ӒJ_GE��I\�G�$'�L��\��D�º+�w��$�.�\ra.��)[�e�:J@>�}��-w��p���>�;Y�p�$Ls[�����1��^p��m~���TW'�E:�?�Ńf	b��,td����|����犸�B��po�Ʒ�<���,�E��h4N���.R>Ol��.��ʋ������W�vx*l�C�ˁ�no��q.��+�a��:����� Q�6�ǰ]�Ue���H��>����`�@����L��t��v�}_� *��3��7
��H�.x��*��Y�=��~[�D�-g�~^X�w^i//\3��ڙS���>�8D��J.*ҡ������R8��ǧ����+��\
P�*lcY��U�bnT��BK�IH�5q�Z�:h�X&۰nd0�* E�������X/6�������#G*T�s�R��w,]���D�E�o�ܮ�U
APp֭mb��U�W�����A!��z��,Y�.�o)��P!n?0�?��R֒?;�lgX;D��MC��w�?#I8Xd�*�a��F�cG�r"�p��o�E�����iT�<雿���>�k���j+�b�_� ���\-!�XsR�_�>"MҰO��
��58\��k�;~�v�">B7�ho�mf���É�n;o>JR#��84) 7l9�i�G�8���j]��Al��qQ�gP8�g��(٪�`B�%Yw�)uv��R�'�O��^��ò��7������n	���lje)������0+s��6w)t��	*z�֕�ܹ/J��>�U�h�`�i0����pӏ�Q��ˆ��0F"
�_暇�i����|�?	uC�4�3ip��	�`
i�m'�^����L�Z,���ҵ��T�Ķ^���om���m��ֆl�,�(#�F�wO�ˇ�U)�[j%n�OI��X�e����]��i`�J�!R��V�X��F�:Ε�ʵ�4�$!�3��s.����M/C6�C��B  � ��U�"��_k �����6��MD#���Z�%��GC�QX�6��O��2e0u9����-�xuﯯ�O��Lm��t�0�^�E_9���l(�&v]��XG���>z�]l�NV�6j��e�bF8ya?.������<eIس�-\�1����nWZ���WI��˼���A�X>�+]�������4����Ze��Tr*M���?�ݡ
dLmӨ4WAy��)�C&<�ը���n���kk󘌥M��~�R5��Y�G������;�~{���o��:Gw5ְW�Rߨ��w��������^�9H�J9��۩�T������b��X�{���{w�
#w̓�v%Ƴ�{� t{G���Î~�]r�LQT-UDT�.'�T%��tTt͉'y����5����C��   � ��-���<���TƻC�6�}C�,��s����V���4��.��_~����
��d��G��Gʵy���}.l�n��͇G���mA�Lpwz?�#��qR��s��Pg�3=gN�� $��X�R2����1 �Np
)�L�����~$�ܽ���"�HMp2
f�uſ@�(ŵa��>o�7�[_ͼf@t篙���y��D���h��9���|���/�IMi�����[�GF��?�;��@b�sf/[
r��7����h@r�ME����R�!�rx$�cR����;�Ҕ���U��.�W���IX��,&�'�{�j*�oHf	D���jM�x�t%ɿō8�rc��P�������_���6�����,cP����T_%�}	�/�M"5!�J|h�>�)x�E�["M����1~6��͙���Ѝ���γl�E��������ʂ!/�����)B0�  .�y|~���q�P��=�i�	B�1����z�
����TΛ�}���
i'UlV��:��٫�=!d�,�
D��W�|U����=
k��?s�:	����' �Fh�  %����;ݼ��.�l�=����x&�
��	�Iآ�)�`0>N2��,���S��j�lȐ(�]j�:�@i�Yv�|qSf�*L�F��Mb)�'E�yB�d��(@  	Ƴ�^`��d��7�zc3s}����W�d�D�|*�'���f�q&{Y.պ;��ed^(�J�V�~��U^� R��+��K��gps�K�~%�=���tW=�oM0_ �Dh����׾������Rk���i!�J�Os\�� �1��V"�\�{�#��m��?�3g� g����� ��*���Y�����>�?H ��~ߗ��
���f�$�6F��Y�S`

u��?v�Rӊ`oh�$Ċ�P�sftY��EH���4�`��Ȥ��NU�ʒPđ����VeC�J�� 1��ӟ��~!{����'щP Jq� =j���>@�#}A�c1�hP��ڻj��JT�+�x9g�w/��r��~kT��u�U� @�4Pg9q��w�(.��XB{���
���Բ8�?9��\u�v�=���T&_�!��x��,A� 9Ӎ|hl}��/k钎,��O��e(2�t-�A��9�=�sB�$��R��
א�=��q�e�ds����7�RO��Ի�4�&��@  ֡@���)&�K�T�M��P'%4Lّ1����紭�H�EV����������!
�P��{_t'���ʤ���P�ňv��Wk\�ӝt�XH�cK�@98NHT*O7�3E�F	�aA���	u߾1�����
�PT�L\h|M��N�`H['�� ��J�'�T�Ƥ�:�c��S����!	���(ш�@  ��\}A�?���ؽ�1)U�M�z1>���U?��I����H��U
ϯ��J�U�6��K�S�ժ��D��B�/�{��C�URYq��2�z�   ���J�Dܿ�q����J�9*�/w�n�r��	~0�����]e}Ђ0�K *LHDp!������!   	״��)��X���Ò��j�*L�4n���� G���Gn�Ep&�Z��1G��&T H.[^����^l�a�@��.0r��+db���/    ��ظ\��+R	���dc�޽�瀜��\�⽽��V�{.V�pS
U�ֽQ !��������DH@*TQP=���ōJ��)�x��4r�꺾���X�)y�4��n|)�W�Vs_�SWܴ���̰Uj��m��%��e)�O��8�G;�EI�j)��!26����(�   �5bl����WYkY�C�zi�sO��
#�n�o`�w�.����u���s��X���]
1^mR��_,���͚�;�Eq��e#RK�Qj���!f/�\<@�0	����z�I�W�����mckb�#�7H��&)��:��b�Q��>xs��蔶Fi�M��O�5d�*Ш��#VT�pg3��XB�I�p����[Q����޲WN#"��?<b��+�V�U��V�M���[��,6d���
G8�t&��RQ��1��l��#����Ej��*D����IO~3X��Qq�Z�/�,�+�yl G�r��}��&���i���1M�bO:���?�R��Lōp���[S�Iv��R[.��$��ϴ���p����8̹X�>ۚ!k[�Q�ut��y�����QdL��v�@��ȯ�Z
���ث��g~�t���ȣ�9�/m�%�%IA��OjU����\���#�\�9��<q���{B��l�T�T�K�r=��M�K�!u�l���nW���� ��6bg�I���0U��9�2V��5��K�`���"��,&��zG'�WF;�7�ύ��n �(̯�DQԑ�d���,Sd�̈�ܶ'�~e;���"?�/��4�U���s��T �~�5X��� 
�-u.KF��g0�ym�D��9tXB�R��J���&|����k���R����Dy���ҵ-�Liv���sp9�`�x�dĪ���Cx*�a�����=欯�-@p(V����H̖%���*|Ǥ�"q
��C���-���C,L��"*��o�yB���͌dro�6��>�c��]\�(��$�l&(@f0:�s|
��A�[a���k�M���:E���zqb��4d9�0P�y� Zk�@~��F���3�K��J��~4>V|9��x��ْbVݘ*�6�)����2w�W
��:R^����GX ����uB��_#��DUܮ�U⍲�^�cӮ�kq3�3��P��_��#�t�p����V�8E#(�u�;�s���)g�E��_�m��/�G���CH	oD�ۤ~��Iء����Q�d&&c2v��%Cv�V<��·}�# >3
�y���������\�h3�a-���k�O�7�^�lRƥ�Vս�w��?�cg��"������W�J��[B3��8X{X�o��N`��EY���f;]����̄�$�����i���%�����Ԥ����?g����v��u�q��_.4����(���i���)i��id����s�f��ɉ6����;�qQ*�N+�U�0�
�l��k�F��l��Zb����� DvEV�z���'��@��.�;wH�G�r%���)7��괼y	B�����
����^�*)�$
:�^�BH�{�Ǳ�O�/�Wt�х�"�-P%�nB�m����lxBMMx$�e[�ۿ��<�w�<����x �Uef~�) �k|/��7�z��ˀ�j��;�4�;�=�{S��!1�b��Qtv:R2��4%����oO<���T���x8��bZ�o=>�1'�	h���:*���e��Z���	
�-�1�
Uj�~�`Z��?2I�� �w9ǮT�(�#�>�v����ͣoנ�6���p	�?"�.3ܽ�VCYƉ�|H�C"|��-�mJ��#�>z: $.��v2YTY�����	��fD�pi18�����4���Ǖ��¡�q������	��7G�5e�.��C�e�Fy�]������d��;�����S8G\�]�}e"1Q�t��Yu�~s�aӢ�ϋq���g������;�B�6�|�τ���	N�����8d%�ƃ�vX`P���-���Yr[�:����z\�k����Y��֮�eӆ�����z�r��F�\��"�7hKJ�Vf�˦���8l���߲Rlz��.�A���3��H�)����U�/��J��x��6�-�IWڤ��ɳ4��3|'|7�J�>����6��
-^2�h^����	�����NSě ���ה/Lڈw�Q�����w�.�]�<���"=C�k�=�m
QR
���C��ߜ�+e���F���{�p��q���ɖA�c�����<�QV@�k�tD"��)s�㌕��p��dj��EwQ8���98á	���T��M�[U�s^��{����p���[�z�ݎ�:�ա��$��Y[��J��t�_��|�a7~ ���,�,@�������G����*���q5P#���*��q��Mq�k��#	?RP����p�	ʆR�� w�~ò������=?���<�A ��P�R�R-�
t�[�)!��nL������J�cE�/��8O��Oc���S_�ѢN{
��'1b}`V��/����q`c��19A�����4�%ȭϬ�W4�,�����	��� wa$�m�Qf�hhN-,�B���"<'ZGY��f���^4=z��ϦQ�Q�_U��������"������8����Z����`�x�]����A,�����5�w�w�/pO�4m�b���ag.�h�HMw�ŵ�}���R����X6m=�J�ޙ��>k jiw8�$'[v~j��X���YUR��=�Q��e�˻���%���`���l
Doa�x��Q{g�W �����C/f�����U��np�ae�B�<��8����4!�ce���;خ%��a���ޜ�P�E�
�+��t�q_aeX��-x��`�E����庉����S)Dtt�J�������x�%3Rr����@|���΁�*+�L5mV��W3��#7j�P�M���?C{�]���	�[�+��S�
�K�T��~7�#x���Ͱ�`��*�svf�U�<��a�$]<5�3I4�z�ҿӅ鴻�p8��Og���'��B=|U=I�H�1�b�"���r�Ԭ�y"�}=���X�m!롫����N�a�,q-$�մ�*��҉�����*X�_������:�
n�S�X��?9��.�jW�W��.�_�+�jϖ��wb`*3�+��/��9�38����󸏟���Q�2��
��l�^���������3,����VO�}q&�8��z�%�L���O�RR�tW�Nd���b[��i�bS�j��~�r�S��a}v6n����4�cy������(�F9�"���v`gd4;���0��� �0�����^��B�Q���.���C^�
2	
�ϙ����;�Ցb�;z{e؎nE[���9��$e䤛r����=m���eO����f$��'���;�p+��k	=���m ��R,�e>+`�A��f  z�b'R�� R$���;u��V�߹癨�K�'�G�5��h��7�d�ﲸqO�k�⮾G�u�px�+=�:-��cc�3et���A;]� >	�e�Ly .SF�h[tN��C�v�"� $^�di��'%�x8r�^,�Y�!mI�t�T¯h*T0�wC��
��i�o����̪�����ޱӻ�6��>�Zl@��WV�Z��6�֯9��C�c�}'��>9�8Q���ߢ.G@^=cc\Dh���Se~�1��K��J�DQ�*p�S�LB舄�=1�si�Z���5��y�] ��w��%��
��H�����k��A&¢�
����U8�{���D�]���{K�@�_�_H(5����
xLO��F��bbU�.���8ӎ�C���   � �-�������ָ�������K�V�
^����JU��j/����K���.��o��sho}���w�v�v�==n�Z��y�T���x���V$~E#��l�[y.�DR^�U�������Ur\��>o��%w ���δ�o����E!�g�"���L�D���:!v������Y��]��!@F2L~h�	�'D��8h?I�dF��q��r<�q��e�w_�^�-OfY��
mqKr� ����Dt��,�.)~��� n���UΈ�H���Eeyh�OZ���4�gu�����pHw+:Mw�EM��&�>V�*��#ֽ3^G˾�S� �	��$L���Z�IJ-Eq=ҁpQ����M��!KB��q���m�s�H����c%
�7X%5ss\��9RI���c�;\�ǀ��0pl}؍��{������RQΤ��hW41�tK��|>��
C~���%��$��(Lv��|�yMgx�s@x��p:7���̤ w������K(�o�ew����"gp*}|���X����V|������Ƀ� SY��5݀��m�ơcH�o�l�]j!7�)�㉆��P2�DK_�b/D��x�`n�2����!�!-�Ex�X��������!	������JЈ����e��=��:�8ȂBL�~�ò��}�$M��,�ͦ)�&~l�g][�Z�|�L�@���r�S��1
1�\&����I��FP��t���o��
b*u���YB�0�� U�CwK��$���c��x��
�����jC�ck�����.E���M��1@�!f�����'Ј�L"�H� ��{O�w�j���R[}|��U�j*��j�t*��	6	�9Ua���E7�R�����XL@#/���'�ܘ����JC-{Z�ʍEd0h������%,PdP�E�   z�2`�9;=�E��5�Q<pE��<��d*��7�j�U�͓Z<��EDա�!�����,B   /�뮃�e��]<�^@~�2�/��lQ���������X���U6J�2��b���� ��d��[7fڭx��]]o^H�1.W�X�i� �Һ�LK6���,Pf1��(��t��]�o��}|v�Ya���cƧC+�u`���V����{wŃ��PZ@�!
�8����k0S��D>3�P�W3m�{� Y�0:AMS'�f�Q�0�x���{l�uY�D*ĭj_l3OtA����řd��"���l��7�ج�R�6�0��٭� 
�U�%���N'��9�:����YV0�w�f{m�������Y� ���T�!	������.A0M7����JoK�׶����U�l��-���x��ހ�5՘mz�T	D{| o���Q�u̢<"�=˒��p�~W��m� *�)I��z+�r����Qz� ��rv�"�Q�  ��������$�|]�)k�:AҠ���T����q��:m�bv�`{{4�!	p����n"��oF�ѽi毧��Ž�����EN��~4�m�W(�������56ڑ�ж'˝=�(8��d&8F�����R�;�s?#~�E�٭"�]]��!�' ��$I���8  ��s�6#���Eշ�k�-�ӝI:��1�K��6�R���;[XVU~i�S !�}������D:! T
�{T����]��tI��-~���_>�Lw��b��4���b�Bf*�ɬ�SX[`U'�D0�T%;����`Р�*Nʌ4xD^@  	�� t�_��xv����v�:i�}�N��;�V�MP��'��h������;���UR��   J�P����C � �I�u��S|e�����}��v����S����v�S� �����u���7=�%���p(mc���v?��yX��\R�\�Zw�#���}m��tn�9§r��t��������ʹ{6���ݬ,�6��cf0D�Zd�����5����M~�x����W�[%��������`$#��{�Z`���1����[U��f�_v��4��F���>�Ǉh�>�븚�q<)���.@�}G�1��r�w˗
E�a����'FPTr���>0 M5���.�X��/��Ϋh��g^a�$<�u�R����Vy;$��������on��׳~�՜Ӌ֪�ᗔ}s��V��P����0��j=���s	�^��D��kև䣲�� �|�v7,�5$��Cz��_��40�%��
��k��Jn�{�z5�F�rr�n����'�o���N8�g����-�fKB���*�4B���%?0n��B~T�@'�a�D��)�/���~��P��v��|oG ��p3)Ԋ9X�-��s����ݼ4��ۨP��E�� f�$d�bjr�*F2��B�?��������� nmg�c�If�"϶�=�+c��e�#f�v�=�R �g� lq�g�*�u ~\n�;��=��W ���f�	{�E�#�)tIY�;�:�N�=L���Q�A��h\n�c5AsC���]|I�Џ�_�c
?�F�I�����i�˾JIx���n\�Hm�b�.����B�[;�a� S���r@���9-7�;���ee��$8�|��>��!��Zf`�0QJ���^��I����#i�zw�v�������41@�O��I�I���I���\�U��ۗC]k�V�<V�"��b7
��^u�6orf#Tw��Lz�5��q��M�-֔xW��	R�o?�&&�� �c�h�Ę�QT(�β�幢�+f޶�pxzB!����@���R�0f�4d
gSF����~	�b��"-m������z!�X��t~�"�Hp�AE�(o&��\�f���^=�?
��M
�ʆB�S�ݍ�]� b��ż�m���ܤ:�]T�����a��p��i���͜1P%�b�}V$/��jc�������
����!ě! _�7�p_�*'>r�#n(]7�
�2	@�0]���aONHq-X�D�aCp��a�
������c�uِ9<�uVcY��<{����5)�@�2)N�Nx�	ݧ�D�`��$�g�uy��23��w�<���2	��s��i��Q
��<�K0��� &����L3�<t<�g2՞=&�T �$�ob�8B5����\�V+f�l�(XǂM)�Bt����G�����v)+�k~i�8a� m�7�Ȝ���x�k�TH�U

�ֻ�H��,@*f*�!�/:�pQ��ր�6�=��s(ev|k��$�L!wJ
��X��t؜R��trW�r����w�����n�~zxzt�J�{VC�7����s�����Gz���
<]��j��Wk�׾
���qW��`#��~;��EI೮r�C��D�����pj!���5���l-�Y�<�0�P�I�Ν/d?X��x�����<y�6n�@yh�@&y�I~�mT��G]ru�	n�_�W ���?)[��3W�ٶ�1R�x\i�g���P<�
��!E0�80�Er�~��թG?��U�Ə�M |�$6��@ˆM��^�썹�2Wq�[�Lq9�(�� ���o	a�\
��Fت��8qo�m��%2���H=ÚL���N��J�}$��No�Pb�՘��}oo'}0�enqv.e���zHZW_�&��0�e�ӹ�o�/=���M�D����5����1�z��/��4Ì�"��
g@�&7 �������&s6���/�*��s	o�
�%\qd��7� u
E����Lx��co�̊�|׷.��١��$\C�|BP�B�8�i�kǏ����_n��68������L���>
�˄aN�AeԷ�~�q�?}�����o�����Ʌ@����t��|�Q�{��h£s�摟0��j���q�kB|ҁ����"�j����e�����_>��QŢ��~����x�o�@�lB�m���;s��G�3���UC+%L/��^��yQ+i ��-!5Gډ`�J	���S�Ktʿ[��iO�P9��ˣ���zǌ���}�*7o�j��g�`�W',C�I9���:>u-n�����+������s笞�d4����)����������ļ��	���*ۀ��5����ǳ������s)��=��`F�t�αF_�-��N�k���uS��_�  �a6�>��_R������!�7���$\U�J�;���
Z�n{#]�j5�v���H  �i�A��7  ��'R�� R$�j�;���V�"��Y@����ʛh��֛	_C@,��	���oߌ��4���7�x�N~Lڍ}y~3�6��:ۋ���{i���t�`4����8J�������[�+wS!��)������>��}H����Z�'
�0PW:��Q��@R ��H��&�eп�e�>�v���������X�'e_!�!���m �t	OuuK��FM�r���?�~&]/����T��,b|��O��pឲ�D�"�>p�:�+ >��:���:�7�c��0@�
���&ʶ�O"S��8Y_޼�s�����&�8f�dd�?������H�Z��(�����
ڣn5UE�]��3J�T�M�u�d|�G ?[[�1M������t�n�Kmaj��&����` ]���΀.8�l�RtS}���ǻ}��ߕh+���9
B9�����I�9�+l��C�����.E{Y_<2	E�l}w7�*
z�	��i�R4l�m���@��}�.I��.�"�{	�*�5����������d"�+������;�Ŗl^?����Q��1d��yA�Ԧ�g��t�ޡ�N����G�Ԑ��,=�����)�3)��
+
���e�g�ۙ��YO��D���V���}�5�}�-7��HE��w%��C�j
���!��n�Y�m��������k��D�r�\9Γ
�F��Ǐ^��Ee�i�O�w."8!'߾���� �IHPN�oh?[����"3P���7�޽��B�?�I��o��&[���+�5�*�$�I���c*��

�8Df�_����C�p�jH)���)U��j�M ��+ё���
E+���3�t^0pgZ"��I�Qb��  ��� �o��_Q�E�f����N�~��T[~Q̨K函Ԃ` 3�!	w����'B0�P�( ��~�����-���|t
�$ ��U�[   ��x����C � �eQM � ع�'�������.UXŎ�O�Jd��=�
AQh�� �Ʃ���J�O�����������^}1���_�K��?�.����`	��־"������٧dԝ��W�櫵��)�52{?'J�U�m��F�]{G�_����82)�������q�Kg����~מg�F�c4���դ�_J�&����ɸ4kzQΫ2i�0 �g�{֒\p�'�ݿ�@��J�a��
!l�_Ӯ�@2�We�fhP%ЉpjRr8���鉨,���#�ӣ�@����1�Y��*�8�Ŏhf�c�A=`���;E�a���1��+�Yю�؀���9�H���3�iK
���A~g��۸N�B���/������Cz-ԟ%Z���]�{vJ�E�IA�a��0�|��Ș�,۰����@��o���,��"�8zP��PIC�W<�r:���̘X�wcN�/�ͱm�dR��K�l({&�E�gV��&����\�0t=�&/^^��)��d�j	�@EE'h����� U����(��SC�$�����?��$`X�y��6�Oc��ւtڒ�$ز�^�0���V��ܱM��(�K@�������j���&��O"�-�RG5��m����뼙�췽�|��\9�0�\���g԰�o�����D�����f@�������s-����u�mc��#�T'���:�Ġf�f� 0�aѢʞ��k�e�BOU��c	H�S A�ګ����I��������7;��H��9Ӵ�E���d�׬�:�������s��҈)y9�]���u'����;���}�z��d��x�;��H�6�E�6�|�y2����3��w�(nG_���S$��r7�|TғW{�G��,F�MXc7�AC��z��HE�v��F6w2������1���ah��M��,�;[0������������U��	𶎗�V��p?�9Nxo<k2�OL�j�G��띺W��ot^Y��!!0�̅�0�(E�@ه%���'�{7�^*�+Dߐ�������>�]�F�`ǜ�����nˉtbn��>8��rp�	�7����&
X,����]mR&X9�i���1�����~H����#���OOD�Z�9��$Xz���6UJ?��S��G�O@[C�	�mE���u��-����B�I�S
@3�L���2�Zd�7U�!������,��XlW�~-��8t��;\���WOW��J�������rU��s�%'b��תHJ�C�q��=�T�c����x
Lx�O���*�{�N;o��
����}�M��������Q�蘼5�����޺�"XOJ���ǜ���V�|D��,��2��;_|)����.z��uI�O'�U��.t �r|)��W�����ru��LAǲ����q`�8oI���i���A�>��z7C�dro~�،|®��	ｚ��|���(��B!���	Tֆ�y��5�馆qpoY(b��w2�:��Ze+h"��3$NiFtd��
�8o�#bJN[зv$��7a��X	����6�Lr�V{/-������HU�􇛛Rc�e`���R�H3�mv���
�۽VE�Ԃ�S=oD���ȖI��Q���4
�i6��61ߜ�����OUCj�
xŨ�w�NC^}.8�9�B�3�g[Rd�$ك��HN>����(�<���ɒ�+l�k��b���`,r�������
��G2�uy���KZ��%I�PӤ�yf��~L��F�X�����s�TH��X�Ǯo�1���lk�<}�05}j�M�@�q��F�������!oUb:���
�p�G��z�,єuV=�*+HK@��PO���&����o���xu�sd���`���N�( l��ĝ���) i�G�LUL��t+�L��x��Zu��eҭXP�m�;�{t�q�u
j��R@�}d^�b%�G�Ja)w-]"�}rS��$�#g��F���b����+�l�����P�K��;��F����� �*H�*/���5�b_->ݨ�5���[���]� 6?Q�wsD�y��ts9P��_3�R���4wڽK�O��7���oEQAB��H�J�]��d��>m�Ǜ���wܙǃuwT����Wm��o�5�7X��%d�:k�o2�`�ak�ܲ���94�ړ*���t���Ί|l�Z`�vݠ�: ��h���YH��W�wS���yi.�0���T�b�5,S�7�Դ�R��� ��IYqwz��[��Q����l� XDH#�]�3B�7��{F�x	�㕼�.ý��c���\���KRh�vH(^ʬ����4jDJYK����N�rG�Ek*���	Y�i<I��E3��`0T�d:����"]-����l��g�#��7WR��!Z�;2P����PSF^��1��1�+H������m�A��#ߢ}�Rl2����$y$
�:�;19���sz����1�4 �}A����'AO'�aRK_�p-P~��ژ�Lצw�*.�U�+��~l��P4�jrsA���p'�<�>K��CS�4!�`3�O8��"�𥤑Љj햸8̱H���xj�e�I����G��}�:��1"�5y��%`��2�	��P�qVGj;s��c�	�[�`�y��݈�����)[?
���v�I��V1F�]����8r��n-���m�D��9$�o,����M�Xƫ.$
Z��f� ��3��T����fRI0⥀�
ֳ�/�	��3_�)M�e=^�3�Q^e�X�b�-�:���1��"2'�j�,�$�t���'�/h6����=�������t�Y[ʖ�� o�/��b�0���c�rI��@�o
AibN�/���O��r�y�l)���L���@�-������S����W��P��<��0��XQ��v�Eh�ؤht
Dr��~�P��p��y�~����F텁�m��~��`�:�r�"}�v��:l��AoOD����������)F����$��o<kv2�����Wg�nz	a�a�d&lL�a�.IU;,ܢ!��)2�T�f�B��C���<��k�_�g t�D[�$��� R��l�d��$��hd]��B��.#�
SQ}d-j�v�P�ck�kS��gY�0�;��P;Ou䖛~~E��
A����C�Ӡ�͜�
�Q&�����x�,��Ge� T*�G�%��ng{�/!�'�9�+t�����g�"���Dj�@�A��  ���'R�� P$������#Ћb��ȵ��x�^Fp"%~Rv,2��PnuG}��� �K�u.�/{v�	S:u�i��8�@{���/Y�ݐ� �e�����h�7ƶ"�![e6f�����~(�NwF۝��&�޵Oͻ.��e�L�p�v��V�Lm]��*_�~�̹�&���mC���i����rԛ�H⶯�~l��j���b.�����AN�l8,H�#�,�Y8�j���%}��0*�wh�-1��n�Q��U^c
2�fuCvg��2T���M�?��T�L+���N�F���Z�>wT�6���s��$����;�;]��8 
卟���V놣�N�U'`�vsB�����me����VJ� ��e�we`_ޡ��)9�&��� Ð���������꥿�����P�ta���y�.�B�+Ч�v�	nv��s�X������g[�Y��K}����O�%�l�7c���ΓX�()_��"�ɘz�N���^B�GpZ�N�G]�D~�b���AC��ە�f@i��܅lDԻ���ͦ��h����M����qՇu�g��80��O{����a��T��
����:�W�r���
4��Շ�_�F ��G	�����HYU�LJ�]��aA����p�Fu!� �u��x����2o�:'��8�g�(���n#���x4ٟ� b;� !�8&{���z�������Ţ���6ݪ@�����{�7�/��Շs�~�9-�R��	�~PA{��X��1��ݹ������G�i���&�>?��2�<>�b1��1�5nw�������u��0�������~b��!N���Qϼ�3�r�ef#NGV][��$RS8�v_�����b�S[�����ޙ���]EB/.ߒ[ɵ����[͗���/ӕ����9����R�7jx/�=IFmR%�&�Gr5�=\\tS��� '��?3B�
&>c��{������K�V���.�1@8��@��    � ���u�&�RL������9�����,�g�D�AA�JC��n���p/R��>xS�٫^��¤c���Yi�Xe�wJ��W;"i���H�
�,���^9��h���!��#˂��Üh�u#Io�-�&�����y>��p�|d��H���sX�iѾ���r���I:����"�-��L�tNI����RY�`���G�ٓU����x����FEugn
o{�g:���Y��~�o�%R&o�L?`��F��{f�9�M�+ �>m�2�O!���:��H)�V�tM7��1�C�� �ѷ̉��N����j��^��\��)ȉ{6bC,��	��m���5��>P�g��� ��9��im��#�kYx�_��"c��@u_�j�}�u�6p���?ZS�u�e�wJ
�)���?�7E�}�ug2�v��e�p=x�k�����"CDf4�X�V�k�i
CL6h�hi�������W��-Cwȼ��y5�j�K��n�=R�.h���AO��7� �LuXCz��.��r hTuK�� �׊$1���X,+@�j6]����;>Z�z!	�z�hM�i����]�{�7b�6d|�	m��O������\�u�+;�Q�Z��k�_����j�Wޯ�SS���͹�*���m[��.z(��:�\��L�2!��5��Е�󸽢x�`���U�c��]	�h�?����3����T4�[�sbZ:Y0+�;�D��n���L�ː5j������aCqm�G�
���ӑ{_c(wu�WP+KQ�
���v:}g�����[c�?
��<hN}��i�L���x��I !��������+2�c/,:�u4*w/x��Ѷ_;5b�d���N�H&� Rc^�W��1�Y9���\둶	����7W,�i	�X$��r��R���}�\�6������RF����  �s��.w_�x��ڼԱ�������U�x�K ��ڬ�"��4d�)Z�(��J� !�����("0��X� L����QD��8{��o6��ll��Qv���g��Q�=?�)�;9��!$���\S�e&	�?z���=�ֳB�*�J�M�]�r�}(�b�r�YB��  =�L�:����~'�nF�\���R^�u�i=�n��pB�׳�6�&薻��� ��!s�������@  �������%E�;������}<	�q�Ó�ִ���~��g�i�!" ��

-G]葎��RD��ec�#�$�Hi���%��)fE��"0  ��Y����Y��w�b��'����9�J�
�-�%fZ�v�� 	�!_�����F�(�P�Tzu��@���=,+D���MahO
�0F�Q0s+	�{�8%��8$N'�>7��i˨�N�DX��yE�-�
�ō�b��h�s�P:��Z�b"2�m�J̊y� x����3��W��4<u���w�zuʎз}�e��/n�n$H#n��/�� Lavc58.134.100 B0_��	KC�$B0�e值˼e�}���R��]#r�W lz+-�J��8���`	1y�ʲt*�N�s���h�2X�|j���d�d>MCv3�>3�ۋ$Ɖf�����&1E�qX65��=�IY�b�0 ���R�3�5���Q�|�9J+�y�������}��{H�L�]��R��� �*E�L�!�������50��@
@u���͖���9�������I�D��ȅ	�1�뛁3�u���Y��
�� 
�ӂ�_!�1^��'�e��W���QVd� ��n�%����Y��0   2�/����t�L�__z	��7𣜑D���he&�j�(����C�D�8!
�ߖ'����
�F�Yއ�t"�j�ь�W,��V��I͍j�z�z���hO��`M��)�Dlʖ���/���SYm�eZ?�p�vv�"��-A�X"����t��
�3;2�V�n>�?��2��c�
b��N!7P�=�����kv�y'l�i�����V.����p�B���$Ȭ2��+�4��	Rqܴ�$6�� ���FO_��.�̚���#ѳƁK�
��#v�_����xh%,<�9$#\�`A50�$.��>J��ʞ��*�AX�D���/-#��r��]6M)�3�p!���P�b�C�~1�yt���I�45�7`k����-�e�
"9�z�	�Ab���{Y��nY�������
R�=Ϗ�Jվ#�~--d#�D�|7���ˌ�:�y���=�Jc��՟�^֟w�|aR���!�/z�Y���&RM�@���=���E�
��T�rt��r��������;�
�V���I��v3�5|�U"@��_;(n�L�]�� ��PA�E
|3�a%�@��� ���kj
���/�s�����(�.><S3wQ(1P��b�.\��q�ݝ�\����y�����@�ؤ���:�o&u�^?�PN;o�ܖ)L��?`��/����������sd�_��ϋɍ'�D)\�\��l
�4��h��B9"�wA��_�ο��I��|I�ح�3��ܐ�ˤ��h	���Һ��`�n��*����0�C� �h^G�Yw�R�����?YS�H|-"��N�1�I�6�jJ�G�z�/�� �o6��s�B���L���	G��!�*����>A�F�Ȍ`��'�������2Y���`͓�>�`a�D�k��S�'�կ7��S5�g��0|jcÄ��͆�ֻGr6n F�ؒ}��"��]T���p^L�J
� +I�L�6G��p��p��\$1�Z1�Mj��#�5(�-[ jˀ
�u/B��
c5�~:S�U���������S��*}��2�Z�\iQ\H�}���Ɍ��đV�A������U�'�X����|���s�!,�,�UE~�>�3N�c6���� ��q4����^�񻅝��?03,$\��=���d6{�s+�0X���@BQ�q�Ęl��Bq3C���UQ�8�,<�҂�E٠]�	~�{h�~��z&��5�S���m���ޥ�ws{˺�Ή�E��1�@J�~�>@Ὣ5Z�o!	FhA��NV��"�I\�!pj����Y-��H�w��Tׇ���cb�}�k���?��&%'oy�O)����ĝ�*�'+�8���-���Xh/̢�z������z����d�M��u�dq^�F+�A�c���ȭ�K�3�
7j��L���x��������R^�J�$��0Sӂ�#�c��'�G�ޔ ��������*7�8���{��8���Rn�bܥi�D�-TA�
���������#d��=�ܺ�h3�?����Z���Z*y�֕��j�ؑxF&%	2ꄩ�c�PI{�˪!9�-��YA��*��/�p2�v�n-�Y�+�L}]�U�e[�:@��!.�&K� �KܮdL�$�4�"�b��8@H�{������.�w����/g��-y�3��j�λ�s��d=�:�mMa���9�eh�Vv΢���X��M�����{�*���9L-�Y�.͒<J���pv�צ�[�,&������L&�k��� z{�N�7�������M��\� �h�7A�qy�;��IC�8mI�N9�b3<j�q�z?4�%�7�N�D5�@��{KA��#0�_�`{��A�1�7����*��á�x��3,U���y�=�	V�~.�{��/�B~��X�X@R�4�ג���(��e�S^  ����C�GbVbG�Q�"\$}�?9�Q��_~��]Q���+�\�Yr��{-�];�g��K��b��� ݳJu8251b�����0Ru��܌HO2�-N�G��W#���0����\	�n�=҅}���#]�!�g��!�c����.��-�t^Ҩ������gS8_��m�a�u�9�7���?��2��.��W�ޮ� y�PS��u��1��u�I8Y��&�t�!�P�w��.}�ȏ��p�J�?]��A�A���F����O$��Q����(�ۗu��4�5�Z��=�c�J��[��6@l}yuE��.o�Ѿ� ��t���ͯ��G-�R��;iL�my�.���G�����������!�[!K4�[��(������A&��r����z��!<ٓ���Xwo1F{7jRy��:�ׁl��T@��c��_�?Q��=�[�
��!��l�
��M^�"�v;&�P�Qq��6�ޱ
���F��tK�3S=q!,E��
mh�G��뙌����F��.��z�PL h �<I@l��}��ux*��G���<h��Vf�t\,�WS"!a���2��"v���I�`(���#���F��0�On����x�_Y۞-e@d��3�ΘLۺ\�$ ХF�m�d)*��a�W(xe�_mw���[Q��'�A��vV6�3���J?Ɲ��3Qh�DM�U)�7DVU��U�5��3RI
T,q�f?�,�g��.)�~ �m:H��D��vm=��N����tܡ����a.�#�ݞ0nM-�O�E^ �&t��2=^AxChڙ(�����O]{��2d�9\��$�v���9��i�pԥ�ñٝ���ތ����H��瓑�� �]�xy�ɶ�9�Ѡe�� �0���ԍ��V-�1MM�56G*CZ� 'z�J5-�*b��R#da�:i��T�c''+�6j�;
GB����N*I"�ˮ!�T7�晡r��v�w�<�x:ԣ*��3�.ud5B��̻��>�)h:P�c3�˒��
�p�O��P޿�9�6X�(�C ��3��'-аrW��
/_�u<��UP[&�������z'4���o�9h�y#�~y�P�g�/1:�x/ |�
haR��捻��Zf����V�)�.�z�� ���CRYh�l)L�W�s9��!%�h�<T��V�G�?�o���E4'�욜��>�.8wn�԰�.U��b��Ws6���(Ҍ�^���gd�"�04�(�����<�͇G���S����R�������c�/�W���O��?6�Ԑ� ]��l,�Y���P^<�X��F2�p�ML��T�Ex��)�N��H��a��k�
Ϩ�e�
�f���9$�m]�I;qYm�/8!�o�eE��(�c��i	�ݲ����I�Q�Aw���~�Y��=j���׻��~;%�D �k�YU͋M���-J�kS����PfO�9�/�QK���*�ؔ�#�
r8ko���>v�(��p����5b��%ċ��bt-O� �N8m#���-4m� ��y�7Ó;��	��f��횱�e�"5<�֔�Oq�I�(��jd�2�Y���8�p	��ֱuKm^%+F�����C�b鸄��5��S[��6
u�2��cM���D��7�m7��F� 6
e��6�8��]�&Z�"f8�
}c�]�*���q���6~��~�+�c��m��[�'�������K/bD�]�eaC�����h�e�w'q
��Q�	g�8��M�����*�;p~s�oI���&]��cT�-��j�f@i�����6p�lN-���U*��JP���oBγOXC���:N�~��[ҽ*�`�G��Xc�ؔ�U�.`]��h��x��i٢����Z�&��Z��@��*�h]m�o�Mu
M�҄73I+G�!鿝�અp��V�Ģ���5���ѩ���lt��������(��z	�5:�M�/Ut��J�+�p��NT1��t�^U��/*�3>����M��x=�>�{���9��K �n�(�ojTt8�H���] ���
W����˛ԁ����Xi���rX�7�9FJ?����?�"����_�r-�|{���!�;�bc�d'����M�\Nvg��dc��FX?'�w5�=�3x	�P�-9��q
IW����i0>�g��ZE%� ��`�>t>���)�8���!���+�\t!|ڮ�µ'�>��w�zne�w'o��:�k��x�����e�Xi�^���тAh�]���Q��^�+ڕe��8���D%���j0[łww��������9+PI�L�����BZ�����tS���
C��	��Ws��k(���C��   � �b-������,����Ce$��vl�NF�����O��O���5�G�����PfP��p��i�2S�h|f|!�=$���n'�� �(�p�>a���)��W	B�4yy��7�5��A�XT�^�/��@���I��"����o�Z��~7)?��SY�#��<�e�w+۱���#ش��3���C����v�hX�Ծ����[I$utu%�;H�
����C�ȳ�����'H�?�9!���Y%Ixi���b�r���ļ҆��{AM�e��Oh��Nrgq��`DTU�"��
?�^F�p��+�3^SQ$�͌�̮�Rj
�+B� ���񯪱�|���i��YN*���˂5�;�W����=
]4��
�z�̒a�QN�4���Թz�:����&mF��������f��蓬�Pʢ\�E������42�y'�V�&:���v@ ?;���β�?k�~?� �Il;]�
�ae�k��af`�#]�ų�:! �z������U\I�_V$N{0��TcH��V���u�nVLB{���@��� �<2��(n����ڲ�oup �x� �D$A� ��u�%�������Rh{ߟ�l��4,��C`U������ŷ��{��LX��i�V�?�%2VN��e�i��ͼ��������
\����I]�BB@� (��<��=oA0@�i����݄Ɇ�������;I}�Y6��D�~���Ci��t*��Dv�"�L (Ps��	�n��D�$�!������1A9p9�9�owǕu�J  8�@�'�~�D%�C�YC�p����aR��������� ��"��d��6�N
Un�\@*�!W-�U
�)�����+E�;Wh�:���H�U8�)�;��(�sU�^���� X�$��������\N6<*����`�y9��R��8�<�  F�%��"{T��ŚFc������t��U�P  �!
�����iЉK�e��Xe�Ӫ���!��\���y����dU�S&E�P�`�)�G̛}N��e!Hzl�f�% �E��^a�k�}/�)tdϏ��^��yƔO'fE��"0	@ 㘪*x�Y�;���;��	�K�|잪j�ٯH��J��%������X[��   S�Ȳ���C �(�f��Y��ez������ ��3�2Y��o6\�
?�"w�=�y�����.�����^r
φ��>"�C�pU�@��P���j�_���wè/ԥ�t
�Rqq�qt nMXp��&Vȱ����1�5�!�?f*�20��MPPK����)[���hl��sWx	�Q�GR7�W-�5W츐>��ri�H#W����e�CJ�Eȟ�i�3�%K�Od��+eA�����(�
�J�ϟ���
Ϥ�\-�z2<}��*ifv�.��
�6���HA��ʃ���ӱ�܊�>cVW��Ӑ�ڸ���QШn�s�E6��B�QP\���#>���>�f���!}*@aK�lw7R��J|Ps|��J?���#�d�T�@a��y���>���lT"��$���<-~���d�?��|!Lr`�����*h�v[�!W>���A�2j�.������ÛZp�\�q��gaʌJk,��BmR��]p	!�a%��|)�ژ�;`�ҠO�y���L�K���sƔ'�9T��wI���Ol�{����<}�&���#DZ|� �>��?��F�Q0Q\xS��>$Y,/ڲdd_	JJ��� `�&�8H���J�Or�)a�s&\��vD4/�,�����7Q��` ��Y��d��?>a+�|�X}�o��<�-dCɖl��Σѿ�B�!�ft���|��Uj�9��-Q�覤��~4�W��x���=F9���#�j��L ��Ll'`�*�{���h<��m����F�zR�
dwW�c��l��굋4�yc��5
���CyF���(�F��0��̹/�0ܷ�S�(=��8GOX��;�Vm%�	UB�ة��G3���Ny=�Ԩ���g��|�W���$�1�OÉB���A���ңɶ��[�?����(�V�|Wz��6�r7S��mS"�p��Yƞ:�@Y~�K�ƅdv �5���/R�iR�C�4=�)�Z𭅔W5fυ~�h��8�jS�σ<7�#��6�X)ѐ�*�������< ���t�%,x^)&�Û�-W6/2�`'D�9����� �i~Ό3��oE�j��IV�ͻ�s��Q�#�����K⭅�6�l8b�
�-����#{R|�A�� ��ujZ�x�3��o;�y�b�L$7���YmÚ\�ӕ�a��ۉ٠
r �H�vj���U�0�� J�[�L�u�aCi|�bβ�Kj��-(�hĤV�y!I{�
�ɶm���J�nт��X�,��)3�<d����%f�!'�˳�ۭ�K$'��.;1B�;<}1���	�Z��]���ff�x��u6��*3\�����Zm1[e�XV䂕,��L�pl��f������&�M��r��ʵ��Ji~e�*<>�@��@y�������a�[�����U���M�c��n���>(�&R��j��vf�.�HB%m�SB�:����-��W�g���f&!�=}��iЉ0̪�V�����;�;�O��G,~����!��i�5���qό��` =d��:;{��x�:�W@:�>!�ɰDu2������}���|ϯkFldbm����������+��Ծ��ϲ8pٱ�<�(��fD&k��M��1�$)��[B&�Z�[a����ٮ�ڨ@���Z��~����
"��ڰ�c�Y0�O$vn繼*�"C>�Z:�}��)DoJ�}m���ߞ�y���2 P��FW�~��<Wa;
����LpȢ4K|�P{J�����Ŏ!������_�J�B�'��E&@��s��@��B��'��nv	B���H���Hڑ[츮�}B�
�Ȍ��p��9�Ի<����P{�gT�:������R42�y�,�~F�!�Vӎ�ŸY2���账���Pm��w��a.xx�S�Alc@9�d
�5�	i;f�@E/������UpK�(���m�`-M��P,s3�����8	����M�yCbs9\�Ӵ���_�
3@��V�?�g��H��H5
=,���a5���z���:o?zI��y2����dO#���������O��,z���\�uɾb�K(����'p{���5�vN�W\v~Y���	y�-�3�(h��a��%O�t46
1uܯ����""�w�#���`n�n*k���4�w��j � ��_��RK	l�����r��(_G�
u�g�T�E�O�7<􀫸!��DF� ���#g�7�n��IW�պ��%���?�t$�����s����Ü��@��#���'��yݩ�Bv8����,�7<Θ������6Pn�m�VZ�͓-,p%˽�;=�;R?�&˰?P���1�F����ꁏF��^��&��j�m�a�߄Ժ�ro�<�{oV�%����B��-���%��ϸޭ2J�L���C�?�V��V��-���L�5M`�+ɿ�Iyt�Ǻ���?�6]j��I�\j*�1j6�*6�^��U8[ģwo+�R^Nxр?�r���:�n�ݖ/æJh?�Ʒ3�
��#��z�đ��`�aɪ�ᴴczM�êt(���g�.4�P��`�(�A�EF��� 5D��B�8!�P�ϫSd<P~��ё�{$��fz�IV<���)|��K���O~���<lߞ��=k�C$�0���8�8�?��^�|�?y������^B�=���x�q�Lf�Zc;�u_[�ĉ�P��͘]V}�\b!U��1'`�TM
��b,_b��y	+,�^<WZ("��G$�7�F�TN7��`~iu��q=XD�7�	�7�����],��xk���a����Ǡv��GUO���o�`|�BZs�.V&&h�G� *�~!�k����}>d_�q�.��4�u�rI͚u\SD-�P����C��ޤ���}���mD�X�\O��8yG���=$����<�M�Y��N�e�G`���5IU͞#d�p`�2��Y�	PA�6(�./<�Wԗ���R�?wG�V@�M�g��]�cߜ��tZ��$��:+�O	�hP���L�w��Қ���aer�u'��
��3<�g��M՚��,�/E�w�x���+I(�B�d���y�Ҍ�zu[8���?���� 櫠J`� �v:GЮ�L��/ׁ�}?��C=�Y*�1�&;�3��6��ȷ<<�]0�g%o�Z� %����k����b�B��'�ʦ����P�E�QΜ�8�O{ޖ�|m$���I�c�!8 <O��T	��0Q�[_l$�Wҵ&A�ɑ,�ܰ���=�=~;R}M��O���e�x�m5�zX��o{��XyM �+�#��jF��uB����u�?>��L�/�0.� �A?�I�?h��V*�>�̱�h�BP����d�GȀW+�G���x����z��+�R}�L�s>!�����+~���gHa�(��0#ϲ��az2,Dr"`<b:�>b��+�h��@�ULP�p�e�7X/_ΫrVX�]�~KE$�\8|)�~���q��T����8ID�`�?+9�<f�&6` g�\`��9����*J���!N31t_l��,����ZQ���e���2Z}�t�0f�^�R�5+e�U��`3����I��-F}�q9|��> �(�Gk�ݯ���a�ʚjB�<"ћZ2�����.GCp�t-� �%��F�h�>`��?:��A���+��E�o�1Y�T���:�����c?0]ٮ�񾗖�o!*iL��C{��?�~D�,�͌���:q���.+�7�d�b�vL���J��	��ҥxQ�°��q�!u�[����K��
�B��>�� �^�ʥ6��0�C����n����wNS ;6kOy^���]Ǽz�Z:��/[N���rg-��M�f���δ�C��Y�B)�dￖ�O|��:���"5dnqؚǬ�i�{�l�}��4`��u�w �;ۄ����')^Qp���(_-�����8I
4<���N;�:8�gh_��~��UbFa3{eNֿ�.��	'�xi��A��  ���'R�� P$�">3cY���e�p���K�ݼd���^+#Y"lbր�7�oF6���&V5����zT8������\�����{�E$Ÿ��S;_:��xB�ܲ�t�S��i� ˀe�K�P��?��P`����*���HW,��V����Ƃ�`ٱoОL���-������aӨ���K��i��e�3
t����e�Ft4�G��'
ߔ:!�N�N��@��/�����.u���萓�e�w'w��z�G����9��N��</ :�2���l9'�F��
x��97:A�{����1U���Hi�f������9���יt�����|�y~y'�8 ��-�9������E2>N D����A��ksT����#!�MD+����u��ը�W��d˫�ŏg.z����^=p�%�K�c Ĳ!6g�>�I�I^'�����}��o���3(���f(IҎ}E3?��j���;e�r��%	
����]*q.�y�7M�Sk�$اEF�J��pۤ�9gm6;�Ǟ�1�j� �+��ӡ�*����1�ȵLّ%�낣
�����P���Z`_��vT��!��|C#�M���/���L��G]җ{�R�`w=2�ѰI�U1����Q-����oK�M^�J�?����!������Wc�l�%KḄ�c8"�+Ƹ�i;J�k�<�3)�y��ۡ�|)�:Sƻ��+IKgC��!~M5��陻�B�U�E&U�[t]@)���
���˽{�N�I֤D��R(���a�tS�����x�*�t9���Cp�u젊A��O\dQ���:T�IєZ��z�7��(( � o#���8���G$�0�"o¡\	'ӓ��d�
�m.�`pD�9�CmϬv�$A7DO�N�W߱
��oO������?�j�Tί����8S$3�zU�U�z��(�"|tQ�����u�+�;Q�XP��&	J�ћ<|��+`;�׬�C ��    �-��	`���򸋆#��zv���=(���vzhA�Ԗ�N����@�5u��F0���BX^���>cέ���j��U�Ǡ����t�yOm�a�Ǹv�=n2~�EA�e�>�$�3�|�a2o7���
q�F�,�,&�o�k�43�e�w(Q�S�_Z�O*������"�YY�&����4	�
$l�Lq��D��ze��Ѝ�#ޖ��{amg��%�R�(�>��SZ�����(Ռ��{�5F�y8��|_��x��C��� 0��M�]�����Upi�i�i�sO��}
r��]�_ߍ��� �tq��U�����d	�T}���
	1d�w�\k%�	n�\,�^(��] � fW4�)��Ia�
�5㾹�ѣ$c:�h.}[�:*�@��m���)K������I3�������uŤ��{��tS�ԩ��)�e���X�Թ����ƕ�P���ˍ%I�i��I>%��3Kߚ�[�Md�9�ņ�g�gT)q<7�����+����&~�x�G���Qv�~[R=#�2E}Tc�O P�E���������!�����Z+A %  ֜{y2p��/�i����s��F�����?�Fq~��v3�0��ȼiDY�9��sP���N�O�+��Q����|g�D��䬌T8�â�cyc-���4���?����?���"�3K��ׂ*�Cͷ���l  (��!
�ӭO���~6�N��+#������8S��\��w �@�z&/��)�
� J���Rȩy������`�b퍚�HJ���\�DW�>��� 6
�D��!	�����+!�2�̶[5Lj��C�oBE
�V����uQɫ�%
�<r�u<Ħ�2-����v_k(��$�ȱG�0�Xe��nV�)��1���T$��%��#$T#�v��ah�Iuk��Y�=�fa!t�E!]�������Dh  �>����}�f	)5%H��U�-c<Е�uC4�bg�Ӧe��2���Yդ�IF�* ����O�ٞ���5B��!lTC�$��(���vd@�̊�������B<�Z��֝ܬq+���n:^?|�G�����B��ťP�mTU�!?������ �� 'Omt�S�Y����$z��s`�PL��S��8��#O0(fԳ��������Y=s����I>��D!jD�����
16C���p+�e%ea�
�P]��8�,�.?V�ǡ�)�+pE��MF�=��M�
�/PJ��cES��L-�U�в� �?�|�>��|jcP����'�@���u�K"�W�  
i�6   �n�ϕ�e�=�Y�չ�n��j������O�UX׉k�kx٣f��J +p!��Z���jA�@7+M�z7��Wu���pk�\�Mvo^b����������<�cb
N���s��%U�}t���̣(/`�y��F:���w�짚��1b��]�vg��^��Nk�jF̅����p  }n�c�+@u��-����o���@��X7�+s�Ms�3�*7�~���a
_�C�߂[�!������.B//�S,�2����\���w�1�<�]A� <@J�=�b!s�B���<Ϣ�����F}<S}#�@��G�;r�"��-/V*��@�����M/��Ĵng�"X"}��` =�T��}�ڷ��	r1�!{
��l�=�Qu-�U�%�N٥�h�� $��%���L�ה�^���ת``�MG���3��� L&��ɠ�,r��R�V2Wӌ^9
�^sEc��u�##�I�_�Gk�����o���"�1Ƣl�F��~��j~�d!_�H�Y���8eh�?e�y��̲z�ܘ|�`³t*����z�kr2�� ��F	`��y��Z�� _%ja"��2���M��j�W�ݛ�9��|M�6)l(��n�M��Q5!�ۨ�Z|z�7��U��s�E�� ��$�U��V�}�p|̆w�W��zܖȽ

�̩�I���Ҵ���,,fl'#��	�\�H
\b&���v��H��5���mv�?�p�{��	��yq� R���Wo�p��P�HCZB��9�R6�����)\�ix���@?�"�~V
!T�g,wcu'������D�)�\�S�tR�O3H�[K�����s���-"����iqq��)�6�߄s9���W�{Ĝdf�p�V���^'�ZHx���)���i�j�8F���s��$x��<�m�;�!^�t J&8�*{5��X�\���xZ2N5�<sxW����K׀�=��-ݚ���A)�L�ƴ!U<,ᬦ�~���O7} F-4�R ����ҩ4��j�䶋�J[u�3<�N�p�켏c��
U������I:��^����k�f�9C�)ٶMG�-)j�	oY:A��qkj���b�隋
�͡��l�ê���0��Ko!Q;!��:�YP�ޭ/,��yWm"5����S�K+�'�c�[�\n���Ve��>W�*QFx�@r���6P��j��m���N]!�0��yw�`dg% &鳷=p�IK�ݿ���Ó�B̵�b���e�	�%Ə9�id��zp]�m3��JS/q<8U�^h<��2A�C�;�K���䞁?�ٰl����;%��"�r�j�g����&�<gS��Y��!�Y&Qҵ�b��Ɩ������+�3r�������g��*��&/>E�
hFd�{Շ�-泱F\�c��.� b�A`0����F���#^}��y�r����p[$*�)�ܗ��:A݆�1��=n��_f�`�.b�f��u[��_5!���YF�v1V��|fd�~p���)�X-;�36
m���l3��K'y+=n��Ğk�"�>��}ǾxJ;X�B+���r���d�����������]
_ S��jxE����5�x������P��1g��>���8�#S�x��]��mA���-���R(�ٝ�-:
�)�q7�ݑ�a;��F�T.�S��w�����u�?xG��\j��̽{+���ό/���d)`�WNi]��#Z�a0p�ʂ���s>�cey
>`ѽŽ��}��?�y�����:� �%�k���/1���� �GA�QxS�#�)���hW��
m�S�6�z5h�4�\k#&�p��&�4s��e��!�����8Kh�E��"֕o����lRB�{���G�n8��*eh�1�,�8�` ���`��]���̣����V�֛�ݣ}�fq��e�?��
�>��d�e��^GkT�v3���s\Z��Ġ��_��Ƿ�g�,-l�K����s_�AJ�V|��<u�>�>X���f�z1|nD1��d�ꈚ��?��Ӿϖ\�S��\��?�(�GIͯ�J|$����J�� �y�hACA5��O`a�0T�]F�@���ya9^�@�g��
$�8l�{�ǲ�l�o־6�o�w�W�����"z����Y�9�������:���Rj�0�M���¾��C"wCbgI점T	��F�qfk�ΔZ>��8�W(
� P��af�s�<J]@ζpe�_���`r��W��5H'�qʖ�0�1;
�]1,B�Ϯ���EC:Z)�@���
�vP�\�7�'�M+?��e�J>�D4I���)ZR-D��J)"��>�њ!�?p�cBR�u�y�� }H�Ox�ټ��	����[۫x���5���-�� ��vٵY����]o\���5�<���=}h��
Yv%o�W����u�D]��hj)�[�^�|I���"���]�3T̮8������b�Up�T2Y�
�VA<�R�9��e�Q�vg�pLZ+xK#���F�N����YJ`��ˑwZ������W��{����N����q�_�[���z��MO䒈|-#����6�&���t��������$
|+�����ʽ-�����y�'������F�D�vT�4
������B�y	�(ث<�L�/����̸dv&x�dP�k�}P�_�܁B����f:��vƂSC�,
[�j��&%�2�ꔌaZ����:C0}���2�ϲⰹ����<+�C�H���tg-*�Ι����Y	Y���,߲PE݈���� ���!V�e)"
�ǁ�Bʑ
ކ����,E3����4����{���{>� �6\��#
�����[9�N7��S�@�uB�.��BB�)��� �e�JN��_r������ڍ/��.r�+��
�󀡽)e��dֳojF�K'm��%w����o���}��V�c�'�݅��M3�sguU>�Z2f7x������-ϳUt���o�	�6�mrN���T�_Z��<gѤzA����R�-����|�pQ��Z��^��)XE�
��d���TfSz����5�����z�Θ$��m��l�xV�Xi.!
�a�F���\`�B�y  ��'R�� P$�Ϫ��#�P�g�4)�1�^����K@O�һ�
Il��yYs�բ�?n��Me�/�2���������˱�i�8pq>`�f��f^#�q�4��+_�t���0r���"���jQ�b��g.YaI��h��q�8I��Œ�5f�n�wk��	�{����N@��d7��^=�B��O��2���
��p'y�-!�8�8�+�a?�B�iP�\ȫ��5�B��m]�;���_��Q�]/��s�(�� ����H��?��{�O�΁��M���3���Ɇ�J/�'����
B��U�/v�����_!s�����܋�W@tS���F(�m�� X�$�>G�"b���&z6ϳ̖i)N5�gɝ� U)'Dʫ���c��_��
`{�Ӂ�~[�~����5�������Xx�m���F��>eat�[f��]���pO#��"���]R��}�W.|ڜ�@-+��ć\$�e@W7��"3-�*�f��e^B ')I�-B��q�gѿ�@W{���̏�O��.9U�rkI��e�wV������_����q�����x\���ż�)��oC����V���kjȏ ��q��z�Ӣ2�[p>�~4�6y�$_��6r�H����i�
'��nT �K�nd�h�X>����ti�4>=j��ٻ$'�`�(��mĿ���6�F�ܱ:.����?ܸ��Ӳ9�f������ډ��O.'��I nrdu�=�z�F�e���@���Y\���ڧ���|8�$;p'6e&����Q��T@^%�-�]3%���;��a�	x����,m~�Y����u��/����c�E#���
_1ߕ/B��E��Ռw��x�N�/�DkQ_Ro��ݵߝ���G���K2�����?6�F�����R�U��q��E�k�-�RlvE��ѸB�Q5�������B��  �#|v�ڠ*Ա=���.��m���Z}Y�� ~�� ���&����^d ��!Z�QPR�;������-�"E'��E�O�W_H��E�]�]��'TaC�K��7sT�s2R��`�ݲ�%4}fYT@tR������W��be��K��8�}UgoN�m!:��^��"<&J�\�%=T�oA�@�Ł��5�tý9��F��9���?��7��Wx.�@!�[������HoG�B����[�a�y�W�k���Xe���

�o%����I}��:�8壤Øn����1bC�!
舂(F'��z�4�o�b��!���]���P�R�F)ǌ � /4ʱ�*#R=�*n��?���{0t
��p#�\Ӱ������Y�v_k�B�sB�$��_���
Ҵ�3�Wϫ�&-�I�p��d��IN�A!i�2yzE'8fH���hc$*I��@KM�0W�r4~;�%:mG
e�cy� �I��a��X�g�$�=3gY"���lu~ј����]�J�(��sQ�<����P�(�
}F�S�G�����0'�s�ˇn�m�h0�2�0
�:���E�_�5�����/��V�o�V�[�䈥Mս��Q*��2�<�����Z�l���ID��eW�g�mi��������硂^U�#��0��D�3䙖��]z��/P����a$�B�e�a2a�x��?�Vl\8��ۊ�J���9W��I�|��/�_�� ��[?���-���t�u���0��e)������4����x��zΤ����.�H\��Q��` �C��R�����r��/ŏ����  R�	%R�d�T�Be�^�G9Y ˀ5���g�WVW�7��p�h�-��/��D��h�������������f@<
Z�iv�$%0������k��^ �2YzQC��,$����o�4,�z��Q�ۡ������keb���4���h��ށ;���m`E���` @*t�W� DI"�'I��rwA���T��N���}��h�PC�8��?�U�[`�~�f%�Ω�M���T�%;�	�7�Ģ=�E����棉=����զ뛢�S��l���b#��2�w�Ly:�G�g|O7��~?-��0�rMu��9��ls�:L>b��
^��-��Q���ztJ�X����&���������QQ��?A����E���D#D5>�Sw�J��VA���U�А�Vn�G�*%k���]�C���Zl��.um��e�5�"����,���}�5�l"N=.��� ���F�����
��=�x`�,�Oq�hj4�������;���6@���.*8�I�3F�a�;�v7�LڻeIFI�;\$>�w)�Mɭ����no�I�*0���|���2���4���/5=���Q�m]7�9�M�Ŋ'4�]OAB��7�-�q�R�(�b��&_�]J����ʜ[���z�=4�,T,�9�����v����W���t�Q�wXvl�ES���^���]�
�������Du��u�"8�&�(����[�_\�^kL[Gч�����t6C�L9)e����^&��I�͸5�X
�Tz��.���a^	A��΅�+��IK>v�'�V�&0�>�-���~4tV�y�"B*3�a��5k�r�/A{b`�0�8!� ���_>��
X{��s'�4��&�.f���������z�hOȰ�n��2�{_f�M&��["�߼`�츄fv>�Mc��ɵ��)��N�:c�_����9�Z*�jC�o���)H�O"B�n:�LY������?-����+{|�I�RBd���t��iE"��U�� �~x�YY��w�h4Y>�v�1B�K:E�6_&�l'�t T���� C�/g��̰�8s,��*���_���l� ���r��'O�ԏ�Iv E]��5	#1y�l�;x��(L��ME������i�^@B%X���5 ��!��r���7�V�8=�S#s�VI ��Z{�n6�k��Z����\��,��6����k��[�
��_�fG
�迏�"�ܣ�^����5�ܝM��[M-J��}LN5��w��A�A�щ�����K�-{wp,�Q����lt��"7��Ǧ3v ߸��)%Z3A<�b�^70���+VEQ�P5�" m�,|Q�Q��=������Xp?�14R�N�B�浥V^���]��,�{��=B������A��=@byH���ÀÜ��i�}����P���55�~ŧh��FNT����n�VV��I�=S�b�zA��YE{v��'�_�s
�	�:�j�\D�&�8��:Lc(��7\o)�c0=����2���s|��,wJ�-�3�w��d�5��t��k}$���-��(��Ѽ����Ù��M����0 ��"_�=t���T ���R~�}�(4�S�B���PG�^9�� �=�*�^�Zz�
�`�#YE���|=!#y�� {���S��⪴�6H7mM�Kb�j�[cU�0?M��:.��E�}o���oi���
\,l�sN����v}*�����v^W��L��!���PXk�/~Y>k.�/c�����j� E���H`os[e|�T����<���/�����H�$��Յ���+�� �9*N0��h52��.�G���G\�/ ;,V
py�r�HEԴ��*[á�8R�z�L�K��������gi	;���r�x�B�Hs �?��c��	���L�_dFW�[��0�R�w�v���	�Dr.�ܿ6x_+F&ek1��i�������x�t'��VVs����]���D�<�+,��E�qw�l��T�YƎY�0N�8&����P��������U�F��/�_Gt��J���x��M;�Tk�0C�E:@ݦgƧ򂁮����K%��Z;��ա���a��#g�O,��e{}ƇZ�+��׿~Ͻ����i�y��w|]�؍=��=����۽(W%	4E�X'nb���ڑ�q\��X�Ew�����3��$�.[�
�wJ����'T�]X�#����ׄ�dN멣��Cߎ�M��v�
�wDW��2}'�`�2��ꇿU�B��\��J��Ł\�	y�cp���7���	��e�d�ܔ��K�< P�L# ���\cO�R�yM�����U�&dF�U�1��B��;��b�쎙R��q��B$G���e�[y!�EF�DA���L@�(�]A�p�}�0C؟#C�)J�x�G��9^�os��=���ǻ��xǬ�0��}�<0����V�a!ލ5��0�C@��r����Ź�7U���bAe��h]v
��(�Z�5nI��cO��0`z��u$�,jo|'�?�œ� S��*��z������^{v>���.�m*6:�@.��G�'�	�)*�+�If��СKx w������1zD�LξG?�����Μ���k>ob��eL�כ~��X���b�;�q�� ���/�����acLI�%�r� �)�˞/��6�ä�zx�5��g
W��蹁ц-���F#��a#따��q ��i�V�~�K�I
�+���A��h�h�;�]��s�>����+��J��@'�\�ǳ{��sa�:�|i&�=r~]>�v�9=::���z����Ξ��!�~��"/����h�l��4}z�'�F.����g���}C��!����xQD���hn�v�N���J5�~H�C��k5�ll}�'�kU`�<��%V#$�N��	����z���h� VD7a�RB����i������Wt�'h�+�IĿr�3���
�ŃXjr���f���,)��h�fi��c
z��p��\#�s��ŨGAds�	����ks2OM�+�G�p{��|�D��~
��o�����ĳ����]B��:�2A��<�P8*��U ˆ+�-��T�p/��O�X���[I8)������۝/��3����Q��x	 &�j ��cH�u�,��:�*C��_F�7
�w�j����1!<�����G�@(��,ۙaCE�H�����">���\�J��D�yF/J�Ak+L7Фpl�Wv��I�-�o�ܖ�ӧ?��*7�`���l��r��A�~�|G�C�h��&c�n���v���y�p��L)��y$��o`-+ǂ����r���ʭqQ���S�x
�rS���b���Ƚ_�smۑǤ��K	�J-����Ah�D��]��Y���ˡ2�Um���
U�tC��z�'���OKC
��U)b8W��Q��z�:�-���q��\J27���զ��/�*�Z���득&-��~[ע��JN�v��!<��Hi�]��`��I4]b�_v�Ȇ�`��M��jm���L2��{�zx�t��/�3!���@N�N����<h�!�������\���0w��Nz�,�ӧ%=��E�,��'PF�t�nj͞��Ϝ�.�Rqfh����F�T��_}�k�[�����·�&
cĲ�	���[2l���ul[6�����
�i��A�ͯqW����Wpl� E宺9%μ�h�d�VS4�>����w��z�
S��'�A�-�3��]@^!,D,l��m�x,��
?�� �P�)4"V�,P��.�Ҷ �
pQE$��*��|��"B�����h^; �է��m�˨d��
p7 �eD�����x�����AP#��L��ge�f��V
�NM�@dQ���Y��h��{�d]����+.'�/�i�n��KG8�Bz��#%[�p�j'�*���F8�<��Pf��S�H���3̈V�s��q
��(a]���*�>�����6���ܽy[AI[�wY'$�,&�\��^6Qgs䎂�k�ו6: C�"8_ԪU�����W��8��e�Q���RH��m����C���	�Z�S)��p��2a�#e06~ie</?0�?��h���a5�:Ӈ{����8���T�UQ?Ne@tS��]���6i�e�C�3��G��Nf��C���E?;pc&Ҭ�@�b���r�'~<#8}�Vz�6kl�Ш����a���2`�A%�	     ��u�&��ۚHN�����2b8�?���#L\9����7����}\�+��"���C[p�>pG�R��u���#���2�ꇒ���e�w'p��@F�x�,�[�<C%B��)^�C 9i�����7z�d{ym�.��ZU��Bu� c�^(p��T�?O�@A�{o%���DM��:t܄Y��Y�>��O��G8�?��Q���1�+��"M%���+�iΞ�`�hN�a�R9�/<v�d*�b��=�`�0�mY�tQ��38�-Nڑ�4�|�
ѓΒZr�Y������ �`�=`	���_f���"��r�4�L�Lv�\��B��Z��l�_0��Tw�U&P�Tx*�V�_�3)�}��^8Ԥ�>dgf���5p��:��̥C�B��"�tߚ,��	Քۄ薽���B%���Ū���{c���R=rל}��jB)�s� �wbX'�e�w��$�_���;k铎T�
~�5C��TG!A:P�M@��}�so7{�0+D��"�H-���{?&��0�,�+h{��v�*e��f���<�/,,1���gsM��bj�5h'��WrN$tS���֗]�
JR��C.L��y�2��8�*'8��E��p�> ��-�m��Oޕ��&l�7���c�Lo�O@n����`D�HR���@���E��
��������!
*T�ɂ�2_��_��mNx��%iD�<�>  5���12 z�8@@�:�`�:���� ���{Ty�ß;8�X� �ג���!m|��*A�@��P�y�O":���a�#�����|Ϝ��9�)��ޔfV�
���$�t�X(��ƗWo�&�ڳFs���kT���]ȧ�n��h�g�x��eқ�QB�0[ �SwP��ډ&�Lf5��a�7r�Tv���b���fg�l*
�K�����!
T�����I �K�����X���p"��p �N]����ŴA��i0�TЍ�S���^D+�ɹ�\����i-Ĝ c�%~��� �[�>��9�K�-Aƪ����n;٬���3%dd���f�	{  ���K�~ۙ�9~z�=��pP�����6�)|�fO$I�_Ӕ����״B@�!
�T�&n��6�y�v3Q�dq#���Íc�k�$�!�z�IK* Y��  �|�
禤�VSq*������q[�R\o��+�X�wR�U:
)dq���yYM�m�LT7\K<��X�V6�L}�_��|#���s��@�k�4/���Z��u\�劈F�j]�Liرە��H )+:,M����� ���`�~U��卛b� �6��OU�]Z�{i��̹�J%������f!�����v�h�O<}��zޛ��k�5�R�I��cִ�M���}ƹ**��F��iv���g�DS�fw �X�KtJ2#%�HLP�a���U��Z����E/8��z�&�ʱ�QO=�s`���i30Q� ��� fPD%"{}��fM��A�9+̅ w��R�@h�Fn�>u4Z��X��,yJX�@�!	a����RH1�E寝y�e�a����wTA�_�(��rj��\U��|�x�%kh����ߏ�g/;��X^r�M�����xD
���3�t��_���A_� ���1z�
>�4$wp!	��t���h���,�2޳Wz��&d�d$S��|����&t�v�6z$B M������cҴ��C���oQ���q2+}����[�m�+V��6�t+�0X#�i�i�l�E�%dG
4^@  �y{��ɩDƒKZ܅��ɍ��0z󓺾�ZJ�0��x��E}^S,u*�jMR��\��
n   ��@����C �(�d�.��m�i�P���ô�B�����
x�Or�%o�ZV]�F]�v
V�\�P�@&���s��n�hz鯹�;b��!m5W�V���c	)��>��w�����ea�)�QQ�j&���c6�|���chY�����w	�)"��|�t
I�#ݯx	7���̀d �����<6���9Y7U s��/	]�A�
GM?�j��(�A�{��A��4u� �ӨΜ�]D9�2݆
P��\�U�pmx�3�������!f晙��j2>r�y�u"_V/<^����b�b� ��z%U��Q����$.2Y=]o�A�[eT�V#,5Ǉ�GͫU���s&��]Iu�p�_A�N����^=�ћ8�͂�r@3:̋� ��p��t�G@R$���XD.�wG2=�P���Y�-�߁����@r��o���$��ҼB��u�]י��ɛW�Eg���<��W&������A��ƪH��-2��K����EcBC�^�d��Th�\)���1(�0��΁��G�h��	�R��S4$�Xڭ
x�k�<�<����1�C�{"�g�� ���7b�-�$��c�	����K�ZM�z�&��MN��~�4.f���P��c-�"A��ñԏ���=)�V����r�M�t	~�F���lE)�젌vzz�
���!b,�8������ߐ�H�U���8��Ͽ�W��K��a���-L4	�_�����k��^Z��F>M�h�nǥ�O�%6��P���r> ���08����~,�{?50����?�#ua�8�3�q�%�����_q5x��(Ȭ���Z���F�D���I��N���
���~ѭBc��n��)[~5K�˫��do�����̧�w��(���1�o,�����4�����@N���A����޻��L���&#�Q�8	�9�ʠ�m�)@,� ��
�](>�\�|�>ޕ�� ]ҏ5�d�N��X���4s�Ir��Yp�1�W�e����Y�:L~��z7��U�$)
{���#p"�鹿�Q]�MR�#AX���F?���"�X1����0 ���r�<�d$�^ɡ���`����t�He��4%�K瀪JL6��$��lN�	��_P�ɰ\0?~�S K�/����β���Ky�M	��TĹ�O�9����P��Z����
�����2?ttKU������pz3�w��{"�NL�&���cxԠ����� ���(Q:|��`)�|j>�
a�BO�KA��K^���[��B�
׊��,�3U�b���Vl������}��c��Wɐ�(�B-q�4%�|�������4���{���N�d^�����QU"�f��;Z�|��LHWlK��,��F>��[�����h&r96�
?����ʈ��bk�@�%_�N���w|����i�c����q�Zj�i23�fĒ̈V��w<�.��fH-������>(N�O,��1�B۷,�$�
&5&ͱ	ݧa ����4�w�'����eXq�D�~�Pi��Y�ĔtGz�Ec���@ʜl��M��K��U1�y�#*�jw|��ϯ?���z ���}�g�%4�j�vZ��~��7�Vta\5�����m��C���>N�¸f��z.CeY���^>q 2���G��p���J�Q�"m�^�ET$G`����� QA�"=��O����Į�DƵ;y�z[a��;���C3%4�{���,�Y���'��V���z��+G�y?lr���Q���y�%�7�4�4�����Qs�����*�@ɎL��at1���~���hh ���kf��s�oA�����҈ȑ�Ӎf��D�_-��\���CüpKp��o��,���.zM3��'�X��D3ߍD��O'

(�˂A�~��*O����P��	\��5�; |.�A��p�tI�C���I|�Gڼ'Ju�i :�4�%�~���
��w�ȧ(���B����N�[BoD8݊lt�OݫwA*�����&���F*��k���r{�Z�y��h����>�8&z�$�y�w<�ahj.}����[M��D�bP�:����2
��y�Ϳ�y��(6{�}���P�@`j�U�����X��D@�׿�?&�a�V���7�� �,�� �VӿQW���F��
h���g���6�&�K ���}�� ����#D�Kh�l���%�w'��nk¨�o_2�xu,�[����7�+8d���Xk'�߇�M;�\+�U�|xG�� �P#1��˂���a��O���],�ۃ혻���e!�c���������w����|�G~��	T0�]f�Fx�v�@���l,ܱ�+B�&@kZ)�V������)�41�5��r��p׳�L��a�I�2�S!_��ұ�+�������YM�Q�跂�&M�o�u���Ra��
��sD�^�e��$�4�Xy%��v�)Dx��Ӧ	q�oT�0���vc�@iP�)��b���F��g��J��֏Hq���������8
?]����d�ρ�-Z�R]���1y����O�ؓ���䋖ƹr4���nUh�=�����F�<��Eɻ�1��ƪ���A�~�[+�В����"~�o�`��Y��7V0;�ű�\���6�d���M)�3�V����w��eT�s�ei_�P/Ar��	GWQ<�F-;. �h(��0(#�O�b�k�L���Q��\yr�xXR������u'3�K�$i�p����#'���`�|�D��J�0~ZS���H���^j��u-�a��6��-F��m�c�Z0�
���1�7�z�V�%�y������ 
0�v�/tַ�/�)��b�24��Uz�H����P���ǌ��VH�����Jڴ��G���xYNr��I����nf5ob�>��r�	=&n��x�J�x���Ԁܯ�?:����ɢ Qm��|f�[�kD�&W
  ���'R�� R$�-6Z���p�mQ1����8>�;e�8�nұ:�n����l���It�# �7�F�%+Z�`�'�X�/�p�1��@ּ��5$�'b�oI���F:�%��@��_B�3�{�Og����o��L�Ա/Bjc�Ԁe�LV�~����R*� ��$���IR��neL�I�_I�1k������G8J�����0i���)G��q�� ��Ⴤ�!�1��-$���>����Y:��, ^.E��1�:�tg��J��93��̢=y�����Ӹq�j�#N&Z�u�bt4c�HM��74�x3��&�g1�ת� vf�����0̝W�NɹCN�I���4Z��f����%03|��+R���Y��6�xxp��Ѥ?��[M�]f/�,��\�%y�
���+2�9F����5S�
-y�dI����Á�L��x��
D   � ��-���t������,C}Y����8x����"������Y��k&z�:IU�(��R� l��6_��wӹ�P@�>e�@����������c;�Tw9���Px��c����6ˉ��G�fr�i�f`�pTLնgg����R��,�U�ޙ��!��e�w�T�ٿ�������q����q���5���I@��Hc05	<�_��|�}�]^��A�~.��2L�h��4���z���6,��`ⒸZ�CjB�TW�F�f1d!CS��?�1ϒEyu��7�i�����6el��&(�..g���L0]�#�fGS?�B�Ϻ�!@��z��)���Q���HH�Q��4"���^`Z0@L�WV�<���ٟ��W68>��X�5E���"���aږ[���W�P�*nf�$e�^=\8�>wj�;%m�A�U�D>o�ɩ�Z����V�ej���(���«0C����)i�t���(��SJ��� �����6ߩfF$��t�s'�
�!��� Ja�6|���poS�<O��Iu��ʻr�RFk#Yj�;v^��$��vzG�#�"��R����u��V�h��o��Pė�6�=�
"	]��C��1h�RA����m3&Ld�3���������L�)Ͳ�k��	ڌ�p��(����z	h�r���M0ד��*
�0��"�x�%��pq�����R�E��N��K` 񻍗ꉛ��/�3`؛z챀tV
A����|���s#�m*!V��|u��&u��T�0s�a��(�=	����W���2�D�\PT(3R������+�����Պ	RJ9G]rR��}u/V�a��"�i5��
��h��ET�
���������!�����.@�����W\|A:�� �$� �8A�Ƀ���m($���g�mg5}N�+��=݆Zu�a�!����+	�ҽk����FYp���M�M��wM_{�O����
8ZA!+�N���|�  �ʔ	�,�䬳m�{��X�0��8��v��5��E_�bbT.]�!�ol��'Щ���e��[,��K��,���Ϊ��9P>��"�
�ӵ�		f 9��t
r	�h�Ц3+mF��D@�
����@�}�xB�tG|�&�}�>s�:��k!�;�|֬i)8�)`*i�4_�%tAo�
t>eB�P� �j�HR�� .�\�C�k���c7f�=�
�j�G&U�k]
�	��!�����T.A��� ֳ�=	]��_帾��P4��1x��/�=o	��o��~GM�ٹUt)��XEp�|!s��T�z�*�@����(&�Z��y��'cb�t^�   �W��m��bW޶=|hJq��V~�ax�(�R�N�KZ�E.%��`��!�����#��K�����]k��!�REL, [�i���|U��KwH�k��l��[X<G��X�z�f��>Ź�·H[���ѡ����R����eZ^�u @"uc'9 ��I+�/��*I"O0  R�dul�O�|*u;�O�W�{=�OI����S��7v9(�U�OhYx���!��������  
��.wǅ_]��������r6v1Q�   .�(��0@ʛ[��<��Iv�� ���#W�qW㽡$�[Y�Q* ��Qq�>   i�h����C �(�F��"�����P��eE���l�[kG%��S�=���v�٫��%}a5r�+tS�m6ײ2���z��5Z�5���-S�y@إ�7j �������3wn�P%=|��(7R �B�ׅ�
9��#��>In,�>��m�2��^�=�y��^��U�n;_��
���Z�_�?�y��m�g���8g��[�	��O�r:-����'q�T.�ڶ>�Ig��)��\h�Uv��7޸E��>1�[q;
�0��.^�d��t��������M*lvۛ��q�
���D�s��
����,r�N>Z��
�l������q�m�r�O���C. �Ý���v	����:[k5��������+ �80K�d25k5.(�M��|9o��.���l�����k�?�?w�1u%R[K�i+��n������ M!���R�u�{g?�zNp@j�uw̕������GA
F���@ 0Jz���ݍ��j�xs�g�=~&�K�/��{�|M!�.��<���45��Ki'�ʷZI�?e$hrY��f�-��Z�I-�D�����z�a��~?`�x3��8��Es	�g��b��ՠ>�Y$��{"g�j��G`j��2iߛ+��IpW���ݮ������D�sj�>�꒐�pS|�� �'�9z��X����ӗ���JU@�of�a����O�➬���֒�d�{	>B�$�%��G��1�{p���e]wC=��Ɉ-5�����#a��%p�^ $�P���s���[��v��Qԋ����9�5���e�|o�G
��ktN������>�_U0������
��ڪ�&"�;?|)nL�D�o��ٗ苆>�g�V
�#D�
��>Q���*�Z<̯�÷3^�|�p�� ��6�X��W�J ��(l���ˤ�Ð6Mʙx>c�3�G��M
��c�a�ҟ#�U���
AJݮ��[� e`S�d�(�I�Ӝ����E�z�Ʌ7t
���7���q�

0������tlD��(�@B���Ei͈��Z'%U�����_�~��X�q>�H�P�m�"��651��Y�
EV*zxK ��͊G10��z�$����A<;�{g�/��뙼pz�賚��F���ՙ�@���ڎ4ر��Y�~Û"����:��=��8)aFI�{��O��v]CDJ��Z��
�o6r�rv����522`ֺ���-�a�������؝ Wr��tg*�%��4\2���\��K:{ �1�Y?�s{�2���`O:!>Cc�A@���M�4F��i�qa�M� ��8V�m����T��_{:���1iI@��O�PK9RQ���t���]��%����ȑ:��)��)����1�E=۟�6���٬�;���$�S�(��S,�| J�"޲��!�?b)* >�7"�ϾP���P�E��yS�7�*���sf-�s��=�}Y�c��7t|���{Qp�s���5_����xj�����6?�)��l����S1��=�}4o|�
U����k�wk瓵N�c������� �L�B�M�_�y�C4!�/q6A�xf7+��z�:�H��9�n�ժ� ������jQ�)&'R\�qO�~�B���fVڿP�������գ�z/a�Õn����s|�9�e��?�ǔ��xv��ܩ}�0��?��sKnw��K`c��ɗ�����5�K V~TW9DRn�/c�t��m}7Ъ2�h>h2�e£�0>���7����/�Z���?�� ��
"އ���������w�y�s}�Xk
pn��WD ��1�m��f�%�7s��!2����3�G���k���Ȓ�Yv�rз���r �B�WzD�Z"UL�=H�L
OU��8W��)ߚn�k�w�������6)TX-f�g���&�|�G�-f�t
+�e l�bs
�/~I%Q��a܆��̫���S�ե�(�
Ӹ��e�a��~�p/��d{�#L��k�1�l}�FOfE'�AV���	��٩�i�<#d��*��	v���]^<�]���@�#�t�
W�ڊQk(ӥ��� m�K�ϭ�G$�����r�F� 3?	��8���4��J&�s��F�G����h!�6䍹C���H�߂�ܹ���7��<���?�5t]^KzZ��қn֏=Z9E>"���ź�y[����;�9�@U���ȸ����W0�����Li�W�,�����T�� �5�����|0xSK���x�$���ȶ�z�N���'�_�^���t�* RS*��H�F�w3�O�����m��a7�XC���aV/�ǋ^[�̪A��m�i�nB�U�m�$͊k��j}�j|h���`X >桭ae�K�Z'����3��b�<�ֶ���g#wU�y:�/�a3�/���oY�I��l'�T��fy(��MbdK��2/���g9=�S��g�v?BD�>�^U���m������jI���*"���敖�����y��(׽g���7��K/=����&�z�ÀD���	s�w}��$�����ލ�:�m�����gj�ȸb��=�w������V=IS��:�bb L(������.,�O� _v(�e�3꼘" �#$���MH�M���|%1�x�c!c`X�Y�S�zfT#�dMuR�Z_�<���Գ}�.8�j���   �\���[7Q�Z ���R�܆:��~R�%
�  
��]���jL���:ZO��l5*6�[�4gu�� N@�7�_'-R�5�%ɇ8�O�+�O7  ë� ��\�<=a��gɄ����$e�LY�۞�����_5_�m�i��"�4�Q�{�Y��Oܖ����#O����/05�\�0^0��4�4���.v�4��S�(�k�C1w�֯ug�j�
��E��Ce��fߥ��u.	�F����8����O6c�fo �0����6%��3
�J����1��X�c����{�|%c���]�j����1����A�2չ�=O�,��[d�v�
�%wU������i.�5\�jS]��e������X��R��K
�   �&�U�"!�]*�Z������?��\��s��s(�/B�'s�"Ch��7�
�����������>���#��i�!Cx�e�'+�s i�R^؄8��G��̔O� ��\8����M�=$.*D����o4�7��"kppV}�f�[��_כ�{�[ݖ>c��3I�PR�lSJD���ؚpUzڠ��S"XO'<���)���,9��ɬ�4�L��~@e�w������)���ܦ�HzΎ�m������.Rpc�V�:Vr�B`g���tWX�	����)h���
�ĎRd�o���A��O�, ^�Nᬱ�_�Xz�؏�%��A+�������=�<�t�:Â��n-P>����Pqv
f"?�,���?��Nm^�$����L(_��tлuaa�
���*~�1I���d����8�������]�Ռ�,�{R$��b03�tU��j�|!�� ���%JF�����֬�����:mІy�f8�Q��?@��j�zp�,-��+��צ=�F���4|���O�p�������E%��?8��8\�s0*�A҈-x��y�2�4�&��>6���9�$�꤄0'�K�":��lbBf�uc
�x��8h��1�q�?��r�(��A
�
�    �F�u�&��vo��a�#�׿j�O�YL�7����&
x��M�b0}���n�GQ����~\��
i���ΈTxs��Ai��N����d�N���r}����s<�bO��tV
eZ>L������!�=��s5
nG�����������{7v�,�������}YX��1��6*@��J_�~<!]9Ώ�7!ma��Y;�Z���z��J.���J-��H��P-��2�Խ?��E��A�],����2��BW\khs�K���Q��ye7_�\D�=ܾ���D�b(��u��U����
Y���tY��A��W6�O!RE�׆=FIS�+�Z��r4Q\��w�&�k����0)8�L�+�q��f����F��;W�Vr�WO���7��D|�rXzb
B��? ���OwA�h	e�y�C{�l������O�(5�B2w�O�=��tD�Ef�X��������!������nAb�7���Z�<��L˗��:��qꖘ[6@s(�.jb{���P�O�s=ʊ�:Oo����y �H�B����6�3( �*a���t�5I�y�:���   iJ������E��[(���˄��=r[>�v�w�Zd�f& �k���jƉ��!�~�����1 �*�J���p;��I�I"S�J�;ܞŌ��PJ�����	A�����@`���Q�!g L7}T�.>0�7�� �pd uQI����� �EhK}�!��,:�������?�  TT����M*�P�hQ��0̨���À���طLE1E��F�"� p![�������@  /<�ք��][�����o]N��	
[��Kg�_����Q�Xv�T�x�lEk(G�R�Alꥁ4�(~i`�¬!m�x{(1��~#T9Ɠ��*�>`  ��zi֍��D�h��6�Tn�E�9�z��JC /`h���!	������#�PL ����Մ���R�?w��d9]�w@0,j+�G1��ŵ�	!�Te�����������ʐ��Ɍ�U��_]��Q;�kO�o�`�wZ��Qد"뛍	��a�$l��V��   =��n,��O�G����ֵfc�e����ܿ�4���R(�.�!������(Љ TT@T�����)�0mhX���3�V�^�0)��
�*)*8��hO��Or��ǯV�f@Q<,�
翟_"�����`� U��^�Y|=7�zv��32%�9��վQ|��|�y8IbWya�c����!
TY*0�Bv���}4���7���; &"�)�I
�:���Un�
KCˤ
�6�.�Q������(�i��#`� 	���O�+��X�%�^�:A��8����PQ�opys�i�������)�L!u����G��"��ƶ*��O:��[xþ�ټ����{Hj��)���E[b8j���֥]i�1w4�\Z "A���t.��(̆T�F�er�EQw�?�pf ��$*�5Vc��  /� �ୀ��^�B��U�t��y~����ݏ�u�L�(T�!��z��+a 8�"Uu�=k΀��>�ʞ
:[�  	yS�IS�����G�C�:�%�'��!�>܆7�(m����A@ h��!
N��K�#�'(2�
5�6G����Q�G x��U�-�j������뻎�ۀ�56��ض����
( /�pc��j�=����y圵LX�h�R~Cj��=~��[UulX
�.�㽷0��;F��d/�V����2�{����ɢ�ř�����.֓�~ �Q��|Z1�,J���ꥇ�J4�bO �b��?�@T�WhDC�{&����Ӻ���_�G�k�֟�\�6�9Y	���[t���Ϙ���2��v:��rZ`gʸ0j�W�)��c���	�u�
�_4l�0�3���荼=%s�JrF��-�Ob]�c!��	���=��Y!̵U��D��VZ��VKC��D�-G����Tt��c吟�W��&#�T<	:bu_(�RV�����^�#Cȫ���Q�@���,�xR�y�y��u��5:��ZB|�����=_p95M��x���"R<����H��@�Dg
�*:�z��WځMy�8�%^"GH՟��,�&,ұM�:~�k��v|�+����Lx�m�b&F}�����ZR-ɱF4��ϭ�V�*��4l�fz�ep��8н�Gxg�t�6!�AƧ�ci�x>[���~S@���|㆔"̇���D���k�@7�3Ml��٠ck2B�X�G��]����Jp�`�R� O����8�Ӿ���X�}�6==,b�A �g:W����x���P1��9{;����=�9���]pj$�
�l�W�]D}I����@�+�f=��_��P��ja���_ŃS^F�aǐw��nR��
�; ŝ�[����4`�#��E�r(�hɟ��Y��J�8vΫWf��J�=� LSEA�2.Ż �s'��Scy�^��X��N
�&1i��>��S��{E:�C�Ek&#���|^g2�T;���ފ9>�M\�S�K},@��m������B�4í�l+��
�E�f>Of@ui}c�%�F� �l ���8��[멙J�d��,�� 6���ɖ�$Z�-Նf	�J&�!�a��Ҿ/��n2�@Pn(J�Lu�f�SN�A����Tᖗ���������%��y����[��ɀ��`��2wzeL��]�){��s
�p���c��U�!�SY\ \���}��?^�؞������h��/�F����lb��Gy\����$S��YHߑ�qx�M��?M61�;��p&rOq�`�߱���&��y��d���d,4���m��6�һ�D��e�w��%�V�@^:�~
=��9.by]�ܧc���� �m>�j��W�榗�����<H�ϼ w������at�=մK��]R=X9C��ULQ��Nɐ���VŻ���A�qi���p@�=��k�����~� ��Xӌ{�g#�9	5�F3ẽ� ��/��qx�[�Ot '��;�T��`���}�D��0p�X�^�m@����)٭;���M�R0Cb���a��g�KB�4�/��a�fDwk�i��X�f�0ޚK���h	� m�y�8��k]3Q��)Ԯ�"v2�n<K�N�~�S e����).�
���ԝ\�E:���s�����nI��C7f���UF�l��_6���{7�Wޭ�z���F�ٝ�؃t��B���jH�9�.f��{ZZJ�=!�*LCZ�t�|��[�~�-.a[n���	E��Q�1qǬ�������9�d�Y�ޠ��"�E��l�w@?��r��0�O�G�����ud�R{��o�
4�OD�Q�3
@������`�NTg��#�d�6ߣ or@�*�D�FRĂ�ˀ���DQ^n��I�T�Ռ>�"(։I\$�Qs�O_��w'MH���fx�S���kN��b>�.cr��ۡ@�W�a������RxF[S�����6b$�
�1�O�;��.�\.5;���%��z=�-��o1���r �:�����/R2:=�
���bI����Kj� Dh��}ܼ��
le��}���!��/��_��p��@!aCF�������"۝�B3����V���&V9ǣ>�d#v�� P�lk[��vRb;� ���p�`��Ui*�*j��m�h���D���Se$.�۽!+s��vG,�FZ�����$��4��'N�+�7�����m�[^��~�k�N��%�ዃ1�eo�!�ǘ~�%���z��+�+/����s�*�v^3�,�U
��K1��k��}KAJ1��-VZa���	�>�t��U���L�u��8c2EKl�SE��U�Q5I��9dU\���
+V21���K<A-��!�n�Сա�>��T+�#�L�����`��h ��B]q^�:��g
�o��e��3����Z�C�'	�0K!�׉�BP��D��a���Ō�Y�܅��62�=	B��6���ӚJbja��*�Ѻp8C9�m
Z�䡵����)�FL�,o1�
����:�z�!��x��c���t��#(Z�v-xi>ҡe�n<��Fw���l�J@H�-_�;��LǠa3����KլJvId����*?*!�b����e�5K�8<p��=+��:�U��c�*q��QZ�pM��� r�ct��g��8�[�7h1-u�ڳ����n�8�.�;��l氒����M�Ѭ���h�V�I���YHpJZb��i���h]�	���q�<��Q�
�����o
W�ᔂSh'C�	��E6�Åm�$��i��05~��
���uw����%+?Y��DIל�#"L��I�����k�&���9��Æs.Zݦ���x��\���n� kQ��nC4�[�5�
��Z:Ӆ��U?
���	��/U�E�$��Bs�(u�@A
�_ݕ�y	�?^"Q(�5[�.�'���+7�>��R��@��섣�*ź����S
߂bϻ	�آ��cb������=���W��G�N�b��Ε�t����P?Ĩ/e��zt���a� �� �@?�0}."�y��cC���jr�uM����n��c��vK��=@\bv6�X�n���&2���_�jѳJH����w5Z}�j��:����c������i���
�o.�G_A�?u���S��Ĭ1
�(҉I;4jl�P���⩐oh ���ˁÙ"�/6&
-WW��/��A(��E\\������fD��
���9l�9=��Zo Fs�KT$[�U?
*��
+t�Z��ӔI���N�R�X�9߲0e�����oAs�ŕ�P�?��6-��UU)����mx
z�	�^_:���?ȏړ�g�<\�:�Q�;rM���J��u%�m/�������	X"U��'�?/���^���}�&�n�~k��������$=�[������Z~�3NI mu�շ��w�M�ʆ��}FFe����
ʝ�#5���=ML~s��ϲ�\g��Ө1QKz�t�+�"�7Rt��↣A���  |�'R�� R$�E�f�dWp�D�]��(�-���M8���S������{`�\��-��SO��{_�;�gP牱��	��8�ϼ�D̔7�!mo��_0�e�L�	#�����A�e;I i�߼�NO3�J�_HjU
	�n�u���g[����зU{lG ��5��O���^.W�dR6��������9�1�X�T�*�/�	Py0x�N�L�U� ��if�'��<����=C&�}xa@A ������9�@�]].5zH�+��ɦi-��1s(l�c��^��ˏ
twj����Z)�A�RΫƿ	y���/��.TD���5�x�&�mD>&��&s�׀f7Q�����]o�s�[#\��ʊ�\�ꐩQ-��H��$��C�h  � ���U�"�%�\!���џ���B�m��mT����\�mZb��N�;���/]��x�>���RBCE8� ��;�� ��|n��.��]��Q�O����
}cK��>��q6�$:� ��I$��r�9>FCl �V �$��>���r��d�{	;ؠ��S9�"��&M�B���e��M�'o��HR�����T���'D�Б|~B�O��ML�t�HtU�F�u�Kq��U��2&��&B�ޅ_n1����� �Շ�A:;���k�1��C���   � �"-��	,�W���'���|)���b^��xfR[�C�؈QJr�Pp�#F�8Q)`doē
5q�@�i��B�tl�N�YWוv���8&�@�u5���2�q!�	��%r�C������#�������[֮�P J-:�PR���Z�3|�;���|K?�Z�������߆�U`k��e����8~�4�h
C,�F�²c1�^G�{-/�=��L������9�F��ʰ��J"��+8t���C�r�ʆ@*I�C[Ėt��/���k��TkN����?���, &u��������#H��mr��ǀ��;1�������2���� OL�rӭ��_������
m����:�z�����#|߲C�ϗ��-��5%�HƂ���1�	�������|��`�Nlgȩfɓ�x��5��/�T0�3��9*-IW����%����vʑ5ꈣk�#bH�>g��W/�;�3{��nL�eU��{d~FP
��}x�M�_$
Hs����*:�i��Ŧ�8�$�I!gs|� ���iI�{�e0��l ^u�u{
�����Stn���ӎ)�ъ�b�r�� �!}�����+!�� *�q���s��LE���6��Cӱh�C�Ի� )N��".�1`�Ǟ^�:�����%�.QMv>�l>��8%O���c�k5�T��`�(W��χ"v�}mee��  U�Mܡ���3�7��]!�j��ah��A��C�
�7�v}�  \�!
�PFҍ.�)I�ۇa��k$�j>X�2`�W���x��8��wF�}�!fT�����9�2����I�.�� ���S�L�j%-c���T�a�^;xItL@Tf!���}��.A`�:��q�����Kg"'ulO���.�}���2�Ў����ʐe�iRgd�����#�"���$���ŝ���J� �a��i?��֔�|���O�  sl�
�B�O����7��9��6��[5_�^�̛J� ��� _�!
�(WP�9�B"�2ؼ�/,˫�=x�WA�������Q���o������cǞ9��nڭI�*L�IW!���}��.B
���%f���S�=�$e�VǵAH����T��gT
��� )�þ�L��8�] )
�B�Xq^G�Kr����%.V�8�pe��5�-�D�u_�ӺV(�:�S� {z %J Bò�Jxs�2C��6��5���kSO`��2,us���   8!
�< �F@��  �����C��ρ��|Z�%B��?y%J 9B4�X�߳U�yU�|���c#Em+!�{*�����ǋ�\�r�NQ�3��PGO��qw|)�o
GJ
;�ֵ���ڊ�x��E��fBB�x�yʠ';*�-�g�Dsȟ�l��aEL���^�:��W�<j���q}�w��S�6��sY��S���-�b� ���n�%��v�C{^���@�
����ҙZ!��m�ay*������8��:b���2�.g���A�������ʱ��pt_�\M�+��N�qV^�����|PxR��v<�K���c�����Z��@c��|hmy}ZMB�tH2�S$8�y�� ��Fp>�<��N�-����ɓ$[LUW�
!L�ڍ
?p���4v�z;Q[B�s����� �D�̆W�5�
�yw�`>�X`�ا���"Ó��
�]��i˽���{�E#�*af�(Nc��u�P�I�>��[�Ʀ��N)d�S��������-D��r�2F���H�i����"}>�v0�Q[�t�b�Ǻ��09��3�U��c/��Tҽ��/6���qЍ�Bp��"<���i��i�Q�Wp����q�Ue�o��}�+Y��*�Ȃ�6�_�K��{bھ�'�F��Q�� [��lx�wW�����㤛%DI��c~i+�nhO�(�ڧ ��C�Ft�~j��V�9��Jú���|�*��f"Ꚙ\�N�88(+�F4�j�	d@z �%X���.�$?�M��lΪ_��ONA�Gt�)8?�:�ň$m6�w�.��r���O$��7;�{��-%�&��/�G�I_�
t���Kn�} ]���_�����ό��½�9݆�v(R�����p����A�jI@���
Ҙ��e�)��hjH��� �7���t�N�)�+��<�\
�)�s�;�u̇�w�a���e�Ð৑�w=�;~�蕵�8�#������>�8��yk�2�­�\똀~��j0��ɢ�A�j����ڵޥZ�&�-F^ۤ9���&�q�5me
?
ќ�5���o*t*f�͢���9<T�sacw��Y�2�T��-5&��F�F������n���z&�X �q�쬇����4������	�w�>�ٴbpi����qYq�z3��Ґ����to��>��5���
�iO`��nM�:J��r�ơ����"�����pl�����JNy��-㨒ۖƕ��L�,cE���m0*�4����7~>������>�Ņ��d��F|�̑�m/ ��z�U��S	�eԒ(�;r <�4�I�,�O@j��(cC�%�%C���o��w�С�1n���}Vu͔�sbଽN��@#�3@�x��=�Y*�=M�摩7�?��/ۜS܋M�D��3f,�"'�9e�lߟ��\���q1����?�I����Nq�!�}+MH[C(���j�G�33BFLt���(�݉GR�����*�G�J����I#�oHܬ�I�k��b5��Y��]a��zvT�N^�D�mL�Z����3׭q�;o�75��D䜶�
��[XC\x�>})��j;���Q.yxt/z-��p�5N:���+�lH��}i�+q^�J�fݓ��(��%R ��������`K܋z5�/�w��ַȪ^2���P7�O����$��CD��{ċEd$+�R��Ɇt���"Б�&�g�  ϖ�����/��P{L�Lf*�G�b�.^�*V P)e��L��k����#����@�KߎxqF�-���g�bƙz���\𖣖�h�;ͭ�QS>�~HW,�'yX	Ro�iq�dD�Y���ͽ���5۲/��Ê�e�W��kA�=���N���Gˮ�$�v�*�}=���G��\4<P7吉��d��,H���GQ���*�����:����$�9`��t��_ �3a�ʓg�!������ҿA�3�/*�ʟ[�Ya�1�o�%��g��kI�B��/��
�xD�5A�9G�u�(6���� ��d�Q�*��[-�o�
�^�}�x/�\hbl��z5���iB�C|[���ǰ
�c
��
�0������cB���mI�k�� �çI����QwK��%O�����GY�+��]ڎ7ky}3�J�F:��g[Ҏ'x�H�dZ�|/�ɩ#PAm��s�����
��Orڻ4����-~���[��"��K_�X�u"�7���n���#�9Yj(�9�����4v@(�9���]̌|��j��
n����)���\��i�d��ZR<{>\�#�;?��o4��ٻ*�\����?�.^���}<40� ������TPgֹ��ͻ�����K��i�r@ɏ�!=��#���E�n���Ъ��?�{��*��[oL����\��@ϤM;mh����ؿMI����*d�Zb$�%(W�Ǳ>�?�5oD\�p|]��~�<�Sv�����}HB�O����
ZRg��:M���q}��)�O�=p6��!��~��_	��Gh��1Z���
T��A�b��K�G��p�a�(����&zj��{}�tSd<x�TǨ
�Ќml؂,�������Ȼ�:���<2���M�Z	2,�� �)h<h�?'��}4�Ü�k6 GH3�h�>$���3&��?������?�������'��>��-_�e>�ݾ�,���	���a�Ks�wZ�u_
��r�����s��z[��ߑp�	,K�lǛ��h��aD7Q�|^x�#AT�?���DW<c����³��u�Gn��4F ��[u4��M�4z�Ô���_jEƞ�q��@����:Ͳ[��;��GҌ$�)��:�Bk�Ѥ5�]���t���
���ǚ�Z�B0i;]r
�.u��DSt�Pؤ|F#5��.�#)�*L�p	�j��:=4�$d1���2���2�����	���+J9�UD�2h��ā¦��*cޮ
��t9*�
?|c�,j���Hw�*X\K��`�L�8V��[���Sе
T��t޸�3��u��7ο�B��p�W�t#�aSc�(����[�`͕��V�jA��%�|iK�������K;��̈�x�x���³8a7)����[Zx��S�Tr�)V��R�1��K�"r3F�o��\�[�����+���We�e	�1#�9�@�-V���.���;���n��Y|Fh����/�j�PJ�&�	b0���%�D)��@8݆T2?��]��0?}����n^��~H��=z������@�3��j�L�b�|�<�E	�݂��}z�˨�oDh�+�E�m ��q�tT}Z�*��mp�
~�e~��부��@a�~�q�;�@¯@gN�A%n*�x�ˣ�[09���^���R�ۖk��
���3���4yA���9X�hk�	�My����;#�H�Jr�Q�'��=;�L>��K'�,:AA!N�>��QH�"��s,L<xK�>��\R��æ�V�x��3N������x�̳ �����F	|�.�y��$d2��9�{��aD|�Ӱ\�9�N8�5�o�+�>�p��u�ϭ�7�?� TdȈ^�%χ�z�x�f��f� ҧ����p-'/��@�^vق��6����c-j]ۆ���Ѩ������
е� e��T ��ׁ1�l�Y����m��f��9�k# �I�}��*��)��������wGohjZ��EɛO�@���v1S��%`J2����[2W��1&ǀGK];�R9����>�0ʏ��[Jh���î-\�ja>xj����"�	���<(QN������t�D�4�I�+�`�	--������QJ2"���*�I0�
K^�׿
����P]�$h`�/�/l�

��!0�Z$ǈ���gJ�Ȩ�ɕ����;
ߺ�� -�mb#q`>}�Nz�猚G�#R��'[ `�D
�8   �f�U�""�U�^p����@���P��҆�$P��Bt$���	�⩛#��oݲn ��X���,<�%
�O��,��b�^�����^�_m��z@�ʍ
CN\��_݌��v���'`.n��*�ȗߖV���9�\�Vm;K�	�qKl@�D
B»0yhq�^
R���?`�>�Y��[J�l7(UJSF�gB��R@ O�����H�����w&�j$�|�
��$��_n�݄�M����=O��
A�N�^Jp�b���^��1��}�^l�ϔ=ҳ���z�Yֵ�b�[�e�xU�LJ�����U��C�G���M���vW��D3���>	��k7�[�܈�2`�\���~���@Q�̐H�Ԭg*2�7ʰ}x�ԣ���1��E�=3�,��G��ϱ:ŔW �>�r4̷W��i7�#�Z����C�R#�a�w�cq)���'�]n4=���y�q�.SW�Q#:a��1�-��:�SE��e��ؽO�ZG���T�0U�S��kX�x�!EY�=��=L:��l4^s��TD����&��;�D��V������<��)���c֢���s�(m��?�Bz�r�8�5�H���˛�����l��=w��m�>K�6�D#�G��=4��X��;�|*RقWYCt3�%_���
�ۼ����ø!�����J��(   �������:�����_Ó(�`� ��]q�� ؃�WDX9	������};��Ԙ�|�\���Z���A�B"I��	{��!E��YqZAT-hE�|Z?  ���^��#Y���P*�p2ll���u��;�6�K^�id�,͍�*뗨]k.�!������)Јtd@  U��װ$��C�S�dt�,�	pd���tU툸��8c�LfsY��R_v
���/�T���j+TC �20��Pl^�I����wK�����1"mB"�   z��*�"޲� �dG]��ŪǊ���y�hp�]pv���� &!�\���'��T*R��^��� �BH��8(�:Û��:��)*��v��0��lB��4 =�ȼ�_]��ړ��F� _V���d!�\d茴8�F!�  ��j�×��Qh����q�=څ:�e�y��D)0�{rx�JA&K�X8����2���A 8!
�\�
gz��z�K��N˜?��6:�Q]�y�W��J����f*�X�KT�_<��v�I�N� �������p�P�f��
��[\3�z�_�gD�Z�}�3����ZF��<����Ī��a��co:5�,���їV�C�"�J��.65_����4�R���`Y�kC^`&?�V�.���f�jh�i2�C�/�ɜ�b����]��\�@\��ȡ��f���
��f;�e���1�Z �@�J_04ߴՍfZ�&��>��:ר��o�4@�!b�!T!_zR4w3д�
7�� �[�<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-bo" viewBox="0 0 512 512">
  <path fill="#007934" d="M0 0h512v512H0z"/>
  <path fill="#ffe000" d="M0 0h512v341.3H0z"/>
  <path fill="#d52b1e" d="M0 0h512v170.7H0z"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="M307.8 224.8 203.3 329.2a97.8 97.8 0 0 0-1.4-1c.4-.5 104-103.8 104.5-104.5a7.4 7.4 0 0 1 1.4 1z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M314.3 218.2c-.4.7-1.5 2.6-1 4l-2.1-1.6c.5 1 .4 1.5-.2 1.9-.3.4-1.5.3-2.2.2a6 6 0 0 0 2.6 1l2 .1c-.6.3-2.3.9-3.4 1-.6.2-1.7.3-2.2 0-.6.6-2-.4-1.3-1-.3-.4-.3-.9-.4-1.5 0-.8 0-2 .7-3.2 0 .6.3 1.2.5 1.8.2.5.7 1 1.2 1.5-.3-.5-.5-1.3 0-1.9.6-.5 1.4-.5 2.2-.2l-2-1.4c.8 0 3.5-1 4.4-1.6a67 67 0 0 0 5.2-4 57.6 57.6 0 0 0-4 4.9z"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="m327.5 237.6-134 75.7-1-1.3c.5-.4 133.2-75.2 134-75.7a6.3 6.3 0 0 1 1 1.3z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M335.9 232.8c-.6.6-2.3 2.2-2.3 3.6-.7-.7-1-1.2-1.6-2 .3 1 0 1.6-.7 1.8-.4.3-1.5 0-2.2-.3.6.6 1.2 1.2 2.2 1.6l1.9.5c-.7.2-2.5.3-3.7.2-.5 0-1.6-.2-2-.6-.8.5-1.8-.8-1-1.3-.2-.3 0-.8.1-1.4.2-.8.7-2 1.7-3a8.3 8.3 0 0 0 0 1.9c0 .6.3 1.1.6 1.7-.1-.5 0-1.3.7-1.7.7-.5 1.5-.3 2.1.2l-1.5-1.8c.8.2 3.7-.2 4.7-.5s4.4-1.8 6.4-2.7a65 65 0 0 0-5.4 3.8z"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="m316 232-120.4 90.9-1.2-1.2 120.5-90.9a6.3 6.3 0 0 1 1.2 1.2z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M323.6 226.2c-.5.7-2 2.4-1.7 3.9l-1.8-1.8c.4 1 .1 1.5-.5 1.8-.4.4-1.5.2-2.2 0 .7.5 1.4 1 2.4 1.3l2 .3c-.7.3-2.4.6-3.6.7-.6 0-1.7 0-2.1-.4-.7.5-2-.6-1.2-1.2-.2-.3-.2-.8-.1-1.5 0-.7.4-2 1.2-3a8.4 8.4 0 0 0 .2 1.8c.1.6.5 1 1 1.6-.3-.5-.3-1.3.3-1.8.7-.5 1.5-.4 2.1 0l-1.7-1.7c.8.1 3.6-.6 4.6-1 1-.4 4-2.2 5.8-3.4a61.8 61.8 0 0 0-4.7 4.4z"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="m204.2 224.8 104.5 104.4a97.8 97.8 0 0 1 1.4-1L205.5 223.6l-1.3 1z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M197.7 218.2c.3.7 1.5 2.6 1 4l2.1-1.6c-.5 1-.4 1.5.2 1.9.3.4 1.5.3 2.2.2a6 6 0 0 1-2.6 1l-2 .1c.6.3 2.3.9 3.4 1 .6.2 1.7.3 2.2 0 .6.6 2-.4 1.4-1 .2-.4.3-.9.3-1.5a6.2 6.2 0 0 0-.7-3.2 8.5 8.5 0 0 1-.5 1.8c-.2.5-.7 1-1.2 1.5.3-.5.5-1.3 0-1.9-.6-.5-1.4-.5-2.2-.2l2-1.4c-.8 0-3.5-1-4.4-1.6a67 67 0 0 1-5.2-4c1.3 1.4 3.6 4.1 4 4.9z"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="m184.5 237.6 134 75.7 1-1.3c-.5-.4-133.2-75.2-134-75.7l-1 1.3z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M176.1 232.8c.6.6 2.3 2.2 2.4 3.6l1.4-2c-.2 1 .2 1.6.8 1.8.4.3 1.5 0 2.2-.3a5.4 5.4 0 0 1-2.2 1.6l-1.9.5c.7.2 2.5.3 3.6.2.6 0 1.7-.2 2.1-.6.8.5 1.8-.8 1-1.3.2-.3 0-.8-.1-1.4a6.8 6.8 0 0 0-1.7-3v1.9c0 .6-.3 1.1-.6 1.7.1-.5 0-1.3-.7-1.7-.7-.5-1.5-.3-2.1.2l1.4-1.8c-.7.2-3.6-.2-4.6-.5-1-.3-4.4-1.8-6.4-2.7a65 65 0 0 1 5.4 3.8z"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="m196 232 120.4 90.9 1.2-1.2-120.5-90.9-1.2 1.2z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M188.4 226.2c.5.7 2 2.4 1.7 3.9l1.8-1.8c-.4 1-.1 1.5.5 1.8.4.4 1.5.2 2.2 0-.6.5-1.4 1-2.4 1.3l-2 .3c.7.3 2.4.6 3.6.7.6 0 1.7 0 2.1-.4.7.5 2-.6 1.2-1.2.2-.3.2-.8.1-1.5 0-.7-.4-2-1.2-3a8.4 8.4 0 0 1-.2 1.8c-.1.6-.5 1-1 1.6.3-.5.3-1.3-.3-1.8-.7-.5-1.5-.4-2.2 0l1.8-1.7c-.8.1-3.6-.6-4.6-1a70.7 70.7 0 0 1-5.8-3.4l4.7 4.4z"/>
  <path fill="#00e519" stroke="#000" stroke-width=".1" d="M234.8 302.4a40.8 40.8 0 0 1 17.8-4c-8.5 6.5-17 6.8-17.8 4z"/>
  <path fill="#ffe533" stroke="#000" stroke-width=".1" d="M234.8 302.4c.8 2.8 9.3 2.5 17.8-3.9a67 67 0 0 1-17.7 3.9z"/>
  <path fill="none" stroke="#000" stroke-linecap="round" stroke-width=".1" d="M234.8 302.4c.8 2.8 9.3 2.5 17.8-3.9a67 67 0 0 1-17.7 3.9z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M234.8 302.3a44 44 0 0 1 17.8-3.9c-8.4 6.5-17 6.7-17.8 4z"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="m285.4 234.8-27.2 55.8c-1.3 1.1-2.4-.3-2.8-.2-1.7 1.9-3.9 2.3-4.4 2.7-1.9 2.5-.8 4.6-.7 4.8 1.4 2-1.7 3.8-1.5 4.4-.7 1-3 .8-3.4 2l-5 10c-.8.5-4 6.5-4 6.5-2.2 0-10.9-5.6-11-5.5 4.8-7.8 16.5-19.7 16.2-20.5 3.3-5.6 8.5-11.6 10.8-11.5 3.2-1.7 4.8-6 4.1-7 2.5-.1 3.8-1.6 4-1.7l20-40c1.7-.6 1.5.1 2 1 0 0 1-1.2 1-1.4 1-.4 1.9.2 1.9.6z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M286.4 222.7c-.5 1 .3 1 .6 1.2l1.2.3c1.3 0 2 .7 2 1.2l-32 65.2c-1.3 1.1-2.6-.2-3 0l21.9-44.7 10.6-20-2.9-1.3c-.9-.2-1.2-.8-.8-1.7l13.4-23-10.7 22.3-.3.5"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M286.4 222.7c-.5 1 .3 1 .6 1.2l1.2.3c1.3 0 2 .7 2 1.2l-32 65.2c-1.3 1.1-2.6-.2-3 0l21.9-44.7 10.6-20-2.9-1.3c-.9-.2-1.2-.8-.8-1.7l13.4-23-10.7 22.3-.3.5"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M244 290.6c-3-.1-4.8 2.2-2.8 5m1.5-2.5c-1.1.6-1.9-.4-1.9-.4m16.3-14c-1.7 6-4.7 10-5.3 11.2-2.3 2.4-4.2 7.7-3.8 8.7l-8.7 14.2"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M258.1 290.9c-1.4-.5-6.1-4.9-10.7-4.1-3.5 4-5.6 8.2-6.2 8.8a60 60 0 0 0 8.1 5.8c.7-.5 1-1.7 1-1.7 1-1-.1-1.8-.1-1.8.1-2.7 2-4.5 4-4.6 2.4-.2 1.7-.4 2-.4 1.1-.6 1.9-2 1.9-2z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M258.1 290.9c-1.4-.5-6.1-4.9-10.7-4.1-3.5 4-5.6 8.2-6.2 8.8a60 60 0 0 0 8.1 5.8c.7-.5 1-1.7 1-1.7 1-1-.1-1.8-.1-1.8.1-2.7 2-4.5 4-4.6 2.4-.2 1.7-.4 2-.4 1.1-.6 1.9-2 1.9-2z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M253.4 291c-2.1 0-4.3 1-5 2.8l5-2.8"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M253.4 291c-2.1 0-4.3 1-5 2.8m-3.9.7c.2.4.8.7 1.3.5.5-.2.8-.7.6-1.1-.2-.5-.8-.7-1.3-.5-.5.2-.8.6-.6 1.1zm2.7-3.6c.2.4.8.6 1.3.5.5-.2.8-.7.6-1.2-.2-.4-.8-.6-1.3-.4-.5.1-.8.6-.6 1z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M283 241.2c.8-.3 1.2-1.3.8-2.2l-5-1.8s-.6.1-1 .8c-.6.7.1 1.3.1 1.3l5.1 1.9"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M283 241.2c.8-.3 1.2-1.3.8-2.2l-5-1.8s-.6.1-1 .8c-.6.7.1 1.3.1 1.3l5.1 1.9"/>
  <path fill="#00e519" stroke="#000" stroke-width=".1" d="M228.8 305.1c4.2-2.9 16-4.6 17.7-4.1-8.3 6.6-16.9 7-17.7 4.1z"/>
  <path fill="#ffe533" stroke="#000" stroke-width=".1" d="M228.9 305.1c.8 2.8 9.3 2.5 17.6-4a66 66 0 0 1-17.6 4z"/>
  <path fill="none" stroke="#000" stroke-linecap="round" stroke-width=".1" d="M228.9 305.1c.8 2.8 9.3 2.5 17.6-4a66 66 0 0 1-17.6 4z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M228.8 305.1a42.6 42.6 0 0 1 17.8-4.2c-8.4 6.6-17 7-17.8 4.2z"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="M278 236.9 252 293c-1.3 1-2.5-.3-2.9-.2-1.5 1.9-3.8 2.3-4.2 2.7-1.9 2.6-.8 4.7-.7 4.9 1.5 1.8-1.6 3.7-1.4 4.3-.6 1.1-2.9 1-3.3 2.2-.1-.1-4.5 9-5 10-.6.5-3.7 6.5-3.7 6.5-2.3 0-11-5.4-11.2-5.3 4.7-7.9 16.1-20 15.9-20.7 3.2-5.6 8.3-11.7 10.5-11.7 3.2-1.8 4.7-6.1 4-7 2.5-.2 3.8-1.7 4-1.8l19.2-40.3c1.7-.6 1.4 0 2 1l1-1.4c.9-.5 1.8.2 1.8.6z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M278 236.9 252 293c-1.3 1-2.5-.3-2.9-.2-1.5 1.9-3.8 2.3-4.2 2.7-1.9 2.6-.8 4.7-.7 4.9 1.5 1.8-1.6 3.7-1.4 4.3-.6 1.1-2.9 1-3.3 2.2-.1-.1-4.5 9-5 10-.6.5-3.7 6.5-3.7 6.5-2.3 0-11-5.4-11.2-5.3 4.7-7.9 16.1-20 15.9-20.7 3.2-5.6 8.3-11.7 10.5-11.7 3.2-1.8 4.7-6.1 4-7 2.5-.2 3.8-1.7 4-1.8l19.2-40.3c1.7-.6 1.4 0 2 1l1-1.4c.9-.5 1.8.2 1.8.6z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M278.8 224.7c-.5 1 .3 1 .6 1.2l1.2.3c1.3 0 2 .7 2 1.1L252 293.1c-1.3 1-2.6-.3-3 0l21-45 10.2-20.2-3-1.2c-.9-.2-1.1-.8-.8-1.7l13-23.3-10.4 22.6-.2.4"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M278.8 224.7c-.5 1 .3 1 .6 1.2l1.2.3c1.3 0 2 .7 2 1.1L252 293.1c-1.3 1-2.6-.3-3 0l21-45 10.2-20.2-3-1.2c-.9-.2-1.1-.8-.8-1.7l13-23.3-10.4 22.6-.2.4"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M237.8 293.2c-3.1 0-4.8 2.3-2.7 5m1.4-2.5c-1.1.7-1.8-.3-1.8-.3m16-14.2c-1.6 6-4.5 10-5.1 11.3-2.3 2.3-4 7.7-3.7 8.6l-8.3 14.4"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M251.9 293.3c-1.5-.5-6.2-4.7-10.8-4-3.4 4.2-5.4 8.4-6 9a55 55 0 0 0 8.2 5.6c.7-.4 1-1.6 1-1.6 1-1-.2-1.9-.2-1.9 0-2.6 2-4.5 3.9-4.6 2.4-.3 1.7-.4 2-.5 1.1-.6 1.9-2 1.9-2z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M251.9 293.3c-1.5-.5-6.2-4.7-10.8-4-3.4 4.2-5.4 8.4-6 9a55 55 0 0 0 8.2 5.6c.7-.4 1-1.6 1-1.6 1-1-.2-1.9-.2-1.9 0-2.6 2-4.5 3.9-4.6 2.4-.3 1.7-.4 2-.5 1.1-.6 1.9-2 1.9-2z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M247.2 293.5c-2.1 0-4.3 1-5 2.8l5-2.8"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M247.2 293.5c-2.1 0-4.3 1-5 2.8m-3.8.8c.2.5.8.7 1.3.5.5-.2.7-.7.5-1.1-.2-.5-.8-.6-1.3-.5-.5.2-.7.7-.5 1.1zm2.6-3.7c.2.5.8.7 1.3.5.5-.2.7-.7.5-1-.2-.5-.7-.7-1.2-.6s-.8.7-.6 1.1z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M275.8 243.3c.8-.4 1.2-1.3.7-2.2l-5-1.7s-.6 0-1 .8c-.6.7.1 1.2.1 1.2l5.2 1.9"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M275.8 243.3c.8-.4 1.2-1.3.7-2.2l-5-1.7s-.6 0-1 .8c-.6.7.1 1.2.1 1.2l5.2 1.9"/>
  <path fill="#00e519" stroke="#000" stroke-width=".1" d="M278 302.2a41 41 0 0 0-18-4c8.6 6.6 17.2 6.8 18 4z"/>
  <path fill="#ffe533" stroke="#000" stroke-width=".1" d="M278 302.2c-.8 2.8-9.4 2.6-18-3.9a68 68 0 0 0 18 3.9z"/>
  <path fill="none" stroke="#000" stroke-linecap="round" stroke-width=".1" d="M278 302.2c-.8 2.8-9.4 2.6-18-3.9a68 68 0 0 0 18 3.9z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M278 302.1c-4.5-3-17-4.2-18-3.9 8.6 6.5 17.2 6.8 18 4z"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="m226.9 234 27.4 56.4c1.4 1 2.5-.4 3-.2 1.6 1.8 3.8 2.2 4.3 2.6 2 2.6.9 4.7.8 4.9-1.5 2 1.6 3.8 1.5 4.4.6 1 3 .8 3.4 2.1l5.1 10c.7.5 4 6.6 4 6.6 2.3 0 11-5.7 11.2-5.6-5-7.8-16.7-19.9-16.5-20.7-3.3-5.6-8.6-11.7-10.9-11.6-3.2-1.7-4.8-6-4.1-7-2.5-.1-3.9-1.6-4-1.7l-20.3-40.5c-1.7-.6-1.4.1-2 1.1l-1-1.4c-1-.5-1.9.2-1.9.6z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M225.8 221.7c.6 1-.3 1-.5 1.2l-1.2.4c-1.3 0-2 .7-2 1l32.2 66c1.4 1.1 2.7-.2 3.1 0l-22.1-45.1-10.7-20.3 2.9-1.2c.9-.2 1.2-.8.8-1.8l-13.6-23.3 11 22.7.1.4"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M225.8 221.7c.6 1-.3 1-.5 1.2l-1.2.4c-1.3 0-2 .7-2 1l32.2 66c1.4 1.1 2.7-.2 3.1 0l-22.1-45.1-10.7-20.3 2.9-1.2c.9-.2 1.2-.8.8-1.8l-13.6-23.3 11 22.7.1.4"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M268.7 290.3c3.1-.1 4.9 2.2 2.8 5m-1.4-2.5c1 .6 1.8-.4 1.8-.4m-16.4-14c1.7 6 4.7 10 5.3 11.2 2.3 2.4 4.3 7.8 3.9 8.7l8.7 14.4"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M254.5 290.6c1.4-.5 6.1-5 10.8-4.2 3.5 4.2 5.6 8.3 6.2 9a53 53 0 0 1-8.2 5.8c-.7-.5-1-1.7-1-1.7-1-1 .2-1.9.2-1.9-.1-2.6-2-4.5-4-4.6-2.5-.2-1.8-.4-2.1-.4a6.2 6.2 0 0 1-2-2z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M254.5 290.6c1.4-.5 6.1-5 10.8-4.2 3.5 4.2 5.6 8.3 6.2 9a53 53 0 0 1-8.2 5.8c-.7-.5-1-1.7-1-1.7-1-1 .2-1.9.2-1.9-.1-2.6-2-4.5-4-4.6-2.5-.2-1.8-.4-2.1-.4a6.2 6.2 0 0 1-2-2z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M259.2 290.7c2.1 0 4.4 1 5 2.8l-5-2.8"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M259.2 290.7c2.1 0 4.4 1 5 2.8m4 .7c-.2.5-.8.7-1.3.6-.5-.2-.8-.7-.6-1.2.2-.4.8-.6 1.3-.5.5.2.8.7.6 1.1zm-2.7-3.6c-.2.4-.8.6-1.3.4-.6-.1-.8-.6-.6-1 .2-.5.8-.7 1.3-.6.5.2.8.7.6 1.2z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M229.3 240.4c-.8-.3-1.2-1.3-.8-2.2l5-1.8s.7 0 1.2.8c.5.7-.2 1.2-.2 1.2l-5.2 2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M229.3 240.4c-.8-.3-1.2-1.3-.8-2.2l5-1.8s.7 0 1.2.8c.5.7-.2 1.2-.2 1.2l-5.2 2"/>
  <path fill="#00e519" stroke="#000" stroke-width=".1" d="M283.3 305.1c-4-2.9-16-4.6-17.7-4.1 8.4 6.6 17 7 17.7 4.1z"/>
  <path fill="#ffe533" stroke="#000" stroke-width=".1" d="M283.3 305.1c-.8 2.8-9.3 2.5-17.6-4a66 66 0 0 0 17.6 4z"/>
  <path fill="none" stroke="#000" stroke-linecap="round" stroke-width=".1" d="M283.3 305.1c-.8 2.8-9.3 2.5-17.6-4a66 66 0 0 0 17.6 4z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M283.3 305.1a42.6 42.6 0 0 0-17.7-4.2c8.4 6.6 17 7 17.7 4.2z"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="m234.1 236.9 26 56.2c1.4 1 2.5-.3 3-.2 1.5 1.9 3.7 2.3 4.2 2.7 1.8 2.6.8 4.7.6 4.9-1.4 1.8 1.6 3.7 1.5 4.3.6 1.1 2.9 1 3.3 2.2.1-.1 4.5 9 4.9 10 .7.5 3.8 6.5 3.8 6.5 2.2 0 11-5.4 11.2-5.3-4.7-7.9-16.2-20-16-20.7-3-5.6-8.2-11.7-10.5-11.7-3.1-1.8-4.6-6.1-4-7-2.4-.2-3.7-1.7-3.9-1.8L239 236.7c-1.7-.6-1.4 0-2 1l-1-1.4c-.9-.5-1.8.2-1.9.6z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m234.1 236.9 26 56.2c1.4 1 2.5-.3 3-.2 1.5 1.9 3.7 2.3 4.2 2.7 1.8 2.6.8 4.7.6 4.9-1.4 1.8 1.6 3.7 1.5 4.3.6 1.1 2.9 1 3.3 2.2.1-.1 4.5 9 4.9 10 .7.5 3.8 6.5 3.8 6.5 2.2 0 11-5.4 11.2-5.3-4.7-7.9-16.2-20-16-20.7-3-5.6-8.2-11.7-10.5-11.7-3.1-1.8-4.6-6.1-4-7-2.4-.2-3.7-1.7-3.9-1.8L239 236.7c-1.7-.6-1.4 0-2 1l-1-1.4c-.9-.5-1.8.2-1.9.6z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M233.3 224.7c.5 1-.3 1-.6 1.2l-1.1.3c-1.3 0-2 .7-2 1.1l30.6 65.8c1.3 1 2.6-.3 3 0l-21-45-10.2-20.2 3-1.2c.8-.2 1.1-.8.7-1.7l-12.9-23.3 10.3 22.5.2.5"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M233.3 224.7c.5 1-.3 1-.6 1.2l-1.1.3c-1.3 0-2 .7-2 1.1l30.6 65.8c1.3 1 2.6-.3 3 0l-21-45-10.2-20.2 3-1.2c.8-.2 1.1-.8.7-1.7l-12.9-23.3 10.3 22.5.2.5"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M274.3 293.2c3.2 0 4.9 2.3 2.8 5m-1.4-2.5c1 .7 1.8-.3 1.8-.3m-16-14.2c1.6 6 4.5 10 5 11.3 2.3 2.3 4.1 7.7 3.8 8.6l8.3 14.4"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M260.3 293.3c1.4-.5 6.2-4.7 10.8-4 3.4 4.2 5.4 8.4 6 9a53.2 53.2 0 0 1-8.3 5.6c-.6-.4-1-1.6-1-1.6-.8-1 .3-1.9.3-1.9 0-2.6-2-4.5-3.9-4.6-2.4-.3-1.7-.4-2-.5-1.1-.6-1.9-2-1.9-2z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M260.3 293.3c1.4-.5 6.2-4.7 10.8-4 3.4 4.2 5.4 8.4 6 9a53.2 53.2 0 0 1-8.3 5.6c-.6-.4-1-1.6-1-1.6-.8-1 .3-1.9.3-1.9 0-2.6-2-4.5-3.9-4.6-2.4-.3-1.7-.4-2-.5-1.1-.6-1.9-2-1.9-2z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M265 293.5c2 0 4.3 1 5 2.8l-5-2.8"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M265 293.5c2 0 4.3 1 5 2.8m3.8.8c-.2.5-.8.7-1.3.5-.5-.2-.8-.7-.6-1.1.2-.5.8-.6 1.3-.5.6.2.8.7.6 1.1zm-2.6-3.7c-.2.5-.8.7-1.3.5-.5-.2-.8-.7-.6-1 .2-.5.8-.7 1.3-.6.5.2.8.7.6 1.1z"/>
  <path fill="#cce5e5" stroke="#000" stroke-width=".1" d="M236.4 243.3a1.6 1.6 0 0 1-.8-2.2l5-1.7s.7 0 1.1.8c.5.7-.2 1.2-.2 1.2l-5 1.9"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M236.4 243.3a1.6 1.6 0 0 1-.8-2.2l5-1.7s.7 0 1.1.8c.5.7-.2 1.2-.2 1.2l-5 1.9"/>
  <path fill="#a05a2c" stroke="#000" stroke-width=".1" d="m251 267.4 37.8-40.5a94.1 94.1 0 0 1-1.4-1l-38 40.5c-.5-.2 2 1.3 1.5 1z"/>
  <path fill="#e7e7e7" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M287.8 226.3c-1.3-1-3.7-2.3-5.3-2-.6-2.2 2.7-4.6 4-4.2-.3 2.5 3.4 4 3.3 4l-2 2.3z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M290.3 224.4c1 .9 1.4 1 3 1.7 1.4.8 3.4-1.2 4.3-1.8 0 0 1 3.6-1.2 6s-4.9 3-7 2.2c0 0 2.8-2.7 1.7-3.9-1.1-1.1-1.5-1.2-2.6-2"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M19.4-370.2h4.4v2.4h-4.4z" transform="matrix(-.67726 .73575 -.82314 -.56784 0 0)"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m243.4 309.7-1 9.6 1.9-2.4c.3-.6 1.6-2.2 1.9-7.9 0 0-1-3-1.5-3-.8-.5-1.3 3.7-1.3 3.7zm2.3-21.5L243 305c0 .4 1.3 1.7 2.3-1.3l1.5-11.2-1-4.4z"/>
  <path fill="#d52b1e" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M251.6 303.5c-.6-.8-1.4-1.7-1.5-2.1l-.4 3.4s2.1 1.5 1.8 4.6l.5-.6.2-1.3s.5-2 .5-3.2c0 0-.5-.2-1.1-.8z"/>
  <path fill="#ffe000" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M242.4 319.3s3.6-3 3.8-10.3l.4-2s0 1.6.8.4c.7-1.6.7-3 .7-3s1.3-1.6 1.7.4l-1.3 10.2a54.8 54.8 0 0 1-.3 2.2s-.7-1.2-1.4 0c-.8 1.3-2 2.9-4.4 2.1zm4.3-26.7-1.5 11.2s1.2.6 1.4 3.2c.1 1.2.6.6.8.4.3-.8 0-2.4 0-2.4l.8-7.8s-1.4-3.6-1.5-4.6z"/>
  <path fill="#ffe000" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m245.5 318.7-.2 2.8s1 0 1.8-1.2c.8-1.3 1-3 1-3s-.7-1.3-1.3 0a4 4 0 0 1-1.3 1.4zm2-11.3a6.3 6.3 0 0 0 .6-3l-.8.6c.3 1.2.1 2.4.1 2.4z"/>
  <path fill="#d52b1e" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M251 306.3c-.6-1-1.4-1.6-1.4-1.6l-1.6 12.7s-.4 3.2-2.4 4c0 0 1.1 11 4.7 8 .5-.5 1.2-3.9 1-5.9l-1-6.4a28.5 28.5 0 0 1 1.2-7.8c.2-.2 0-1.8-.6-3z"/>
  <path fill="#d52b1e" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m252.7 304.3 1.1 1c.2 0-2.5 20.7-2.5 20.7s0-2.2-.7-6.4c-.7-3.4.2-8 1-10.2 0 0 .8-.7 1-5z"/>
  <path fill="#f7e214" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m248 297.4-.6 7.6s1.8-2.6 2.3-.2l.4-3.5s-1.6-2.5-2-4z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M246.7 307s-.6-6.5-3.8-2c0 0-.3 2.7 0 3.3 0 .8.9 1.8 1.3 2.5.7 1 1.4-.3 1.4-.3s.7-1 1-3.5z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M221.7 252.7c-.2-3.7-1.3-9.8-1.4-14l-12.8-13.1s-1.6 10.5-6.2 16.6l20.3 10.5"/>
  <path fill="#ffe000" stroke="#000" stroke-width=".1" d="M222.6 253.2c.5-2.6 1.2-5.5 1.6-11l-8.2-8c0 3.4-3.8 8.6-4.1 15"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M229.7 261c1-4.5-1.4-5.1 2-11.5l-7.6-7.3c-1.4 4.3-2.3 7-2.2 10.8l6.5 4.6"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M200 288c-1.5-4.5.6-13.5.4-19.3-.2-3.7 2.5-17.6 2.5-21.9l-15-9.4s-.7 15.3-2.5 32a66.3 66.3 0 0 0-.4 22.8c1.6 9.3 3.2 13.1 7 17 6.6 7 20.9 3 20.9 3 12-2.6 19-10.2 19-10.2s-4 1-10.3 1.6c-14-1-19.4 2.5-19.8-11.8"/>
  <path fill="#f7e214" stroke="#000" stroke-width=".1" d="m240.4 297.4.2-.1c-2.6 1-6.2 2-6.2 2l-8.5.7c-18.4.4-16.1-11-15.4-29.4.2-7 1.6-15.8 1.2-18.9l-12.3-7c-4 11.3-2.8 19.3-3.6 25-.4 6.4-1.8 18.6.3 24 2.9 12.4 12.6 11.9 25.8 10.8 6.5-.6 10-2.3 10-2.3l8.5-4.9"/>
  <path fill="#007a3d" stroke="#000" stroke-width=".1" d="M240.6 297.1a37.3 37.3 0 0 1-6.3 2.3l-8.6.9c-13.3 1-21.1-8.3-19.4-29.5A66 66 0 0 1 209 250l7.3 4.3v.7c-.4 2.2-1.4 7.5-1.4 9.9 0 17 10.7 30 25.4 32.3l.2-.1"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M192 246c1.2 2 8.6 13.3 12.7 15.5m-11.5-8.2c1.2 2.1 10.3 14.9 14.4 15.6m-16.5 3.9c2 2.5 4.1 7.4 10.3 10.6M194 287c4.1 4 14.4 12.4 24.3 12.8m-24.3-6.4c2 2.5 6.6 14.2 25.6 8.9m-28.5-6.7c1.2 2.8 10.8 18.4 27.7 12.3"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M211 282.5c-1.6-4.6.5-13.6.3-19.4-.2-3.7 1.5-16.5 1.5-20.8l-14.1-10.5s-.7 15.3-2.4 32c-1.6 8.5-2.7 19-1.6 25.5 2 10.6 7 13.6 8 14.5 7.2 6.4 23.4 5.7 25 5.2 11.6-4.2 16.6-11.6 16.6-11.6s-5.5 0-11.8.6c-14-1-21-.4-21.4-14.7"/>
  <path fill="#ffe000" stroke="#000" stroke-width=".1" d="m251.3 291.8.2-.2c-2.6 1-6.2 2.1-6.2 2.1l-8.5.7c-18.4.4-16.1-11-15.4-29.4.2-7 .4-13.3 0-16.4l-11-8c-4 11.3-3 17.8-3.7 23.6-.4 6.3-1.8 18.5.3 23.8 2.8 12.5 12.6 12 25.7 10.9 6.6-.6 10-2.3 10-2.3l8.6-4.9"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M251.6 291.6a37 37 0 0 1-6.3 2.3l-8.6.8c-13.3 1.2-21.2-8.2-19.5-29.4 0-7.5-.2-8 2.4-18 4 2.6 11.9 9.3 11.9 9.3s-2.1 3-1.6 7.2c0 17 6.8 25.7 21.5 27.9l1.6-14"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M202.8 240.3a60.7 60.7 0 0 0 12.8 15.6m-11.5-8.2c1.2 2.2 10.3 14.9 14.4 15.6m-16.5 3.9c2 2.5 4.1 7.4 10.3 10.6m-7.4 3.5c4.1 4 14.4 12.4 24.3 12.8m-24.3-6.4c2 2.5 6.6 14.2 25.6 8.9m-28.5-6.7c1.2 2.8 10.7 18.4 27.7 12.3"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="m188 238.9-.8 6.4c-.3 4.7-.1 8.2.1 10.5 0 .2.9 5.8.6 6.1-1 1.3-1.1 1.4-2.3.5-.1-.2.5-6 .6-6.8l.4-10.5c0-1.1 1-6.8 1-6.8s.1-1.3.3.6"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m188 238.9-.8 6.4c-.3 4.7-.1 8.2.1 10.5 0 .2 1.1 8 .7 6.1-1 1.3-1.3 1.7-2.4.8-.2-.2.5-6.3.6-7l.4-10.6c0-1.1 1-6.8 1-6.8s.1-1.3.3.6z"/>
  <path fill="#f7e214" stroke="#000" stroke-width=".1" d="M187.8 237s-1.2 6.5-1.3 10.2c-.2 4.5-.4 5.8-.3 8.5l-.6 4.8c-.1.7.1.1 0 .2-1 .6-1.6.1-2.1-.3-.2-.2 1.5-4 1.5-4.9.9-11.4 2.5-18.2 2.5-18.2s-.6 4.1.3-.3"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="M187.8 237s-1.2 6.5-1.3 10.2c-.2 4.5-.4 5.8-.3 8.5l-.6 4.8c-.1.7.1.1 0 .2-1 .6-1.6.1-2.1-.3-.2-.2 1.5-4 1.5-4.9.9-11.4 2.5-18.2 2.5-18.2s-.6 4.1.3-.3zm-.5 18.5s-1 .4-1.1.2m0-1.4s.8 0 1-.2m-.1-1.2s-.7.4-.8.2m.7-1.8h-.6m.7-1.6h-.7m.6-2.3s-.4.2-.4 0m.5-1.9h-.5m-.5 10.2s-1 .1-1.1-.2m1.1-2s-1 0-1-.2m1-1.4h-.8m1-1.5h-.7m.7-1.8-.5-.1m.7-1.5s-.5 0-.6-.2m.7-1.7s-.4.3-.4 0m0 9.6s-1 0-1-.3m13.6-21.1-.7 6.4c-.3 4.7-.1 8.3 0 10.5 0 .2 1 5.8.7 6.1-1.1 1.3-1.2 1.4-2.3.5-.2-.2.5-6 .5-6.8.2-.8.3-7.5.5-10.5 0-1.1 1-6.8 1-6.8s.1-1.3.3.6"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m198.8 233.3-.7 6.4a70 70 0 0 0 0 10.5c0 .2 1.2 8 .8 6.1-1 1.3-1.3 1.7-2.4.8-.2-.2.5-6.3.6-7l.4-10.6c0-1.1 1-6.8 1-6.8s.1-1.3.3.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="M198.7 231.4s-1.2 6.5-1.4 10.2c-.1 4.5-.3 5.8-.2 8.5l-.6 4.8c-.1.7 0 .2 0 .2-1 .6-1.6.1-2.2-.3-.1-.2 1.5-4 1.6-4.9.9-11.4 2.5-18.2 2.5-18.2l.3-.3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M198.7 231.4s-1.2 6.5-1.3 10.2c-.2 4.5-.4 5.8-.3 8.5l-.6 4.8c-.1.7 0 .2 0 .2-1 .6-1.6.1-2.2-.3-.1-.2 1.5-4 1.6-4.9.9-11.4 2.5-18.2 2.5-18.2l.3-.3zm-.5 18.5s-1 .4-1.1.2m0-1.4s.7 0 .9-.2m0-1.2s-.7.4-.8.2m.7-1.8h-.6m.7-1.6h-.7m.6-2.3s-.4.2-.5 0m.6-1.9h-.6m-.5 10.2s-1 .1-1-.2m1.1-2s-1 0-1-.2m1-1.4h-.8m1-1.5h-.8m.8-1.8-.5-.1m.7-1.5s-.5 0-.6-.2m.7-1.7s-.5.3-.5 0m0 9.6s-1 0-1-.3"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="M207.3 225.3s.5 5.5.2 8.6c-.4 3.8-.3 4.9-.7 7v4.3c.9.5 1.6.2 2.2-.1.2-.1-1-3.5-1-4.2.4-9.5-.5-15.3-.5-15.3l-.2-.2"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="M207.3 225.3s.5 5.5.2 8.6c-.4 3.8-.3 4.9-.7 7v4.3c.9.5 1.6.2 2.2-.1.2-.1-1-3.5-1-4.2.4-9.5-.5-15.2-.5-15.2l-.2-.4zm-.4 15.7s1 .2 1.1 0m-.8-1.8s.9.1 1-.1m-1-1.3h.9m-.8-1.2h.7m-.5-1.6h.5m-.5-1.3h.5m-.4-1.5s.4.3.4 0m-1 8s1 0 1-.2"/>
  <path fill="#005000" stroke="#000" stroke-width=".1" d="M241 236.4h1-1z"/>
  <path fill="#fff" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M252.5 273.5s-.4-.2-.5 0l.2.2.3-.2zm-1 1.2 2.2-.2"/>
  <path fill="#e8a30e" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M226.3 303.1c-.2 3.3-7.8 7-13.5.2-6-4.8-4.7-12.2 0-13.2l58.3-56.8c2.4-1.3 2.6-2.5 3.8-3.7 2.4 2.6 7.5 7.2 10.2 9.5-1.7 1.4-3 2.7-3.4 3.8l-55.4 60.2z"/>
  <path fill="#e7e7e7" fill-rule="evenodd" stroke="#000" stroke-linejoin="round" stroke-width=".1" d="M275 229.4c2.8-3.8 13.6 6 10.7 9.2-2.9 3-13.3-5.4-10.7-9.2z"/>
  <path fill="#cccccf" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M284.8 237.8c-2 1.6-10-5-8.6-7.6 2.1-2.4 10.8 6.1 8.6 7.6z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M281.6 243a16.8 16.8 0 0 1-10.5-9.6m-24.5 48a17.3 17.3 0 0 1-12.2-12.5m9.7 15.3a17.3 17.3 0 0 1-12.2-12.4m-2.3 27.5a19 19 0 0 1-13-13m10.5 15.8a19.2 19.2 0 0 1-13-13"/>
  <path fill="none" stroke="#000" stroke-linecap="round" stroke-width=".1" d="M212.6 304c-.3 1.5-1 2-2.2 1.5m14.7-2c-2.3 3.6-4.9 2.5-7 2.5"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="M209.5 304.2c0 1 .8 1.8 1.8 1.8a1.8 1.8 0 0 0 1.9-1.8c0-1-.8-1.8-1.9-1.8-1 0-1.8 1.1-1.8 2"/>
  <path fill="none" stroke="#000" stroke-linecap="round" stroke-width=".1" d="M212.8 303.9c-.3 1.4-1 1.9-2.2 1.4m14.5-1.9c-2.3 3.7-4.9 2.6-7 2.6"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m268.6 309.7 1 9.6-1.9-2.4c-.3-.6-1.6-2.2-1.9-7.9 0 0 1-3 1.5-3 .8-.5 1.3 3.7 1.3 3.7zm-2.4-21.5 2.9 16.9c0 .4-1.3 1.7-2.3-1.3l-1.5-11.2 1-4.4z"/>
  <path fill="#d52b1e" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M260.4 303.5c.6-.8 1.4-1.7 1.5-2.1l.4 3.4s-2.2 1.5-1.8 4.6l-.5-.6-.2-1.3-.5-3.2s.5-.2 1.1-.8z"/>
  <path fill="#ffe000" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M269.6 319.3s-3.6-3-3.8-10.3l-.4-2s0 1.6-.8.4c-.7-1.6-.7-3-.7-3s-1.3-1.6-1.7.4a1925.6 1925.6 0 0 0 1.6 12.4s.7-1.2 1.4 0c.8 1.3 2 2.9 4.4 2.1zm-4.3-26.7 1.5 11.2s-1.2.6-1.4 3.2c-.1 1.2-.6.6-.8.4-.3-.8 0-2.4 0-2.4l-.8-7.8s1.4-3.6 1.5-4.6z"/>
  <path fill="#ffe000" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m266.5 318.7.2 2.8s-1 0-1.7-1.2c-.9-1.3-1.2-3-1.2-3s.8-1.3 1.4 0a4 4 0 0 0 1.3 1.4zm-2-11.3a6.3 6.3 0 0 1-.6-3l.7.6c-.2 1.2 0 2.4 0 2.4z"/>
  <path fill="#d52b1e" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M261 306.3c.6-1 1.4-1.6 1.4-1.6l1.6 12.7s.4 3.2 2.4 4c0 0-1.1 11-4.7 8-.5-.5-1.2-3.9-1-5.9l1-6.4a28.5 28.5 0 0 0-1.2-7.8c-.2-.2 0-1.8.6-3z"/>
  <path fill="#d52b1e" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M259.4 304.3s-1 1-1.2 1c-.2 0 2.5 20.7 2.5 20.7s0-2.2.7-6.4c.7-3.4-.2-8-1-10.2 0 0-.8-.7-1-5z"/>
  <path fill="#f7e214" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m264 297.4.6 7.6s-1.8-2.6-2.3-.2l-.4-3.5s1.6-2.5 2-4z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M265.3 307s.6-6.5 3.8-2c0 0 .3 2.7 0 3.3 0 .8-.9 1.8-1.3 2.5-.7 1-1.4-.3-1.4-.3s-.7-1-1-3.5z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M290.4 252.7c0-3.7 1.2-9.8 1.3-14l12.8-13.1s1.6 10.5 6.2 16.6l-20.3 10.5"/>
  <path fill="#ffe000" stroke="#000" stroke-width=".1" d="M289.4 253.2c-.5-2.6-1.2-5.5-1.6-11l8.2-8c0 3.4 3.9 8.6 4.1 15"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M282.3 261c-1-4.5 1.4-5.1-2-11.5l7.6-7.3c1.4 4.3 2.3 7 2.2 10.8l-6.5 4.6"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M312 288c1.5-4.5-.6-13.5-.4-19.3.2-3.7-2.5-17.6-2.5-21.9l15-9.4s.7 15.3 2.5 32c1.5 8.5 1.5 16.3.4 22.8-1.6 9.3-3.2 13.1-7 17-6.6 7-20.9 3-20.9 3-12-2.6-19-10.2-19-10.2s4 1 10.3 1.6c14-1 19.4 2.5 19.8-11.8"/>
  <path fill="#f7e214" stroke="#000" stroke-width=".1" d="m271.6 297.4-.2-.1c2.6 1 6.2 2 6.2 2l8.5.7c18.4.4 16.1-11 15.4-29.4-.2-7-1.6-15.8-1.2-18.9l12.3-7c4 11.3 2.8 19.3 3.6 25 .4 6.4 1.8 18.6-.3 24-2.8 12.4-12.6 11.9-25.7 10.8a31.7 31.7 0 0 1-10.1-2.3l-8.5-4.9"/>
  <path fill="#007a3d" stroke="#000" stroke-width=".1" d="M271.4 297.1a37 37 0 0 0 6.3 2.3l8.6.9c13.3 1 21.1-8.3 19.4-29.5A66 66 0 0 0 303 250l-7.3 4.3v.7c.4 2.2 1.4 7.5 1.4 9.9 0 17-10.7 30-25.4 32.3l-.2-.1"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M320 246c-1.2 2-8.6 13.3-12.8 15.5m11.6-8.2c-1.2 2.1-10.3 14.9-14.4 15.6m16.5 3.9c-2 2.5-4.1 7.4-10.3 10.6m7.4 3.5c-4.2 4-14.4 12.4-24.4 12.8m24.4-6.4c-2 2.5-6.6 14.2-25.6 8.9m28.5-6.7c-1.2 2.8-10.7 18.4-27.7 12.3"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M301 282.5c1.6-4.6-.5-13.6-.3-19.4.2-3.7-1.5-16.5-1.5-20.8l14.1-10.5s.7 15.3 2.4 32c1.6 8.5 2.7 19 1.6 25.5-2 10.6-7 13.6-8 14.5-7.2 6.4-23.4 5.7-25 5.2-11.6-4.2-16.7-11.6-16.7-11.6s5.5 0 11.9.6c14-1 21-.4 21.4-14.7"/>
  <path fill="#ffe000" stroke="#000" stroke-width=".1" d="m260.7 291.8-.2-.2c2.6 1 6.2 2.1 6.2 2.1l8.5.7c18.4.4 16.1-11 15.4-29.4-.2-7-.4-13.3 0-16.4l11-8c4 11.3 3 17.8 3.7 23.6.4 6.3 1.8 18.5-.3 23.8-2.8 12.5-12.5 12-25.7 10.9-6.6-.6-10-2.3-10-2.3l-8.6-4.9"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M260.4 291.6a36.8 36.8 0 0 0 6.3 2.3l8.6.8c13.3 1.2 21.2-8.2 19.5-29.4 0-7.5.2-8-2.4-18-4 2.6-11.9 9.3-11.9 9.3s2.1 3 1.6 7.2c0 17-6.8 25.7-21.5 27.9l-1.6-14"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M309.2 240.3a60.7 60.7 0 0 1-12.8 15.6m11.6-8.2c-1.3 2.2-10.4 14.9-14.5 15.6m16.5 3.9c-2 2.5-4.1 7.4-10.3 10.6m7.4 3.5c-4.1 4-14.4 12.4-24.3 12.8m24.3-6.4c-2 2.5-6.6 14.2-25.6 8.9m28.5-6.7c-1.2 2.8-10.7 18.4-27.7 12.3"/>
  <path fill="#f7e214" stroke="#000" stroke-width=".1" d="m324 238.9.8 6.4c.3 4.7.1 8.2-.1 10.5 0 .2-.9 5.8-.6 6.1 1 1.3 1.1 1.4 2.3.5.1-.2-.5-6-.6-6.8l-.4-10.5c0-1.1-1-6.8-1-6.8s-.1-1.3-.3.6"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="m324 238.9.8 6.4c.3 4.7.1 8.2-.1 10.5l-.8 6.1c1.1 1.3 1.4 1.7 2.5.8a64 64 0 0 0-.6-7l-.4-10.6c0-1.1-1-6.8-1-6.8s-.1-1.3-.3.6z"/>
  <path fill="#f7e214" stroke="#000" stroke-width=".1" d="M324.2 237s1.2 6.5 1.3 10.2c.2 4.5.4 5.8.3 8.5l.6 4.8c.1.7-.1.1 0 .2 1 .6 1.6.1 2.1-.3.2-.2-1.5-4-1.5-4.9-.9-11.4-2.6-18.2-2.6-18.2s.7 4.1-.2-.3"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="M324.2 237s1.2 6.5 1.3 10.2c.2 4.5.4 5.8.3 8.5l.6 4.8c.1.7-.1.1 0 .2 1 .6 1.6.1 2.1-.3.2-.2-1.5-4-1.5-4.9-.9-11.4-2.6-18.2-2.6-18.2s.7 4.1-.2-.3zm.5 18.5s1 .4 1.1.2m0-1.4s-.8 0-1-.2m.1-1.2s.6.4.8.2m-.7-1.8h.5m-.6-1.6h.7m-.6-2.3s.4.2.4 0m-.5-1.9h.5m.5 10.2s1 .1 1.1-.2m-1.1-2s1 0 1-.2m-1-1.4h.7m-1-1.5h.8m-.7-1.8.5-.1m-.7-1.5s.4 0 .5-.2m-.6-1.7s.4.3.4 0m0 9.6s1 0 1-.3"/>
  <path fill="#f7e214" stroke="#000" stroke-width=".1" d="m313.2 233.3.7 6.4c.3 4.7.1 8.3 0 10.5 0 .2-1 5.8-.7 6.1 1.1 1.3 1.2 1.4 2.3.5.2-.2-.5-6-.5-6.8-.2-.8-.3-7.5-.5-10.5 0-1.1-1-6.8-1-6.8s-.1-1.3-.3.6"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="m313.2 233.3.7 6.4a70 70 0 0 1 0 10.5c0 .2-1.2 8-.8 6.1 1 1.3 1.3 1.7 2.4.8a64 64 0 0 0-.6-7l-.4-10.6c0-1.1-1-6.8-1-6.8s-.1-1.3-.3.6z"/>
  <path fill="#f7e214" stroke="#000" stroke-width=".1" d="M313.3 231.4s1.2 6.5 1.4 10.2c.1 4.5.3 5.8.2 8.5l.6 4.8c.1.7 0 .2 0 .2 1 .6 1.6.1 2.2-.3.1-.2-1.5-4-1.6-4.9-.9-11.4-2.5-18.2-2.5-18.2l-.3-.3"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="M313.3 231.4s1.2 6.5 1.3 10.2c.2 4.5.4 5.8.3 8.5l.6 4.8c.1.7 0 .2 0 .2 1 .6 1.6.1 2.1-.3.2-.2-1.5-4-1.5-4.9-.9-11.4-2.5-18.2-2.5-18.2l-.3-.3zm.5 18.5s1 .4 1.1.2m0-1.4s-.8 0-.9-.2m0-1.2s.7.4.8.2m-.7-1.8h.6m-.7-1.6h.7m-.6-2.3s.4.2.4 0m-.5-1.9h.5m.6 10.2s1 .1 1-.2m-1.1-2s1 0 1-.2m-1-1.4h.8m-1-1.5h.8m-.8-1.8.5-.1m-.7-1.5s.5 0 .6-.2m-.7-1.7s.5.3.4 0m.1 9.6s1 0 1-.3m-11.3-23.4s-.5 5.4-.2 8.5c.4 3.8.3 4.9.7 7v4.3c-.9.5-1.6.2-2.2-.1-.2-.1 1-3.5 1-4.2-.4-9.5.5-15.3.5-15.3l.2-.2"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="M304.7 225.3s-.5 5.5-.2 8.6c.4 3.8.3 4.9.7 7v4.3c-.9.5-1.6.2-2.2-.1-.2-.1 1-3.5 1-4.2-.4-9.5.5-15.2.5-15.2l.2-.4zm.4 15.7s-1 .2-1.1 0m.8-1.8s-.9.1-1-.1m1-1.3h-.9m.8-1.2h-.7m.5-1.6h-.5m.5-1.3h-.5m.4-1.5s-.4.3-.4 0m1 8s-1 0-1-.2"/>
  <path fill="#005000" stroke="#000" stroke-width=".1" d="M271 236.4h-1 1z"/>
  <path fill="#fff" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M259.5 273.5s.4-.2.5 0l-.2.2-.3-.2zm1 1.2-2.2-.2"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M225.8 229.8c0-2.2 2-3.5 2.4-3.7 1-.7 1.7-1.3 4-1.6l.1.9c0 .4-.5 1.7-2.2 2.9a12.3 12.3 0 0 1-4.3 1.5z"/>
  <path fill="#a05a2c" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m225.8 229 31.6 41 1.5-1.4-32.3-41.8-.8 2.2z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M225.3 221s3.4-.4 3-2.3c-.6-2-2.9-2-3.8-2-1 0-4.2.6-5 1.6-1 1-3 2.6-2.4 5.3a21.3 21.3 0 0 0 2.5 6.3c1 1.8.7 3.5.5 4.2-.1.3-.4 1.4.4 1.8 1.3.5 1.6.5 2.7-.7s2.6-3.1 2.6-5.4c0-2.2 2-3.5 2.4-3.7 1-.7 1.7-1.3 4-1.6 0 0-.9-1.3-2-1.2a9 9 0 0 1-5-2.3z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M225.3 221s3.4-.4 3-2.3c-.6-2-2.9-2-3.8-2-1 0-4.2.6-5 1.6-1 1-3 2.6-2.4 5.3a21.3 21.3 0 0 0 2.5 6.3c1 1.8.7 3.5.5 4.2-.1.3-.4 1.4.4 1.8 1.3.5 1.6.5 2.7-.7s2.6-3.1 2.6-5.4c0-2.2 2-3.5 2.4-3.7 1-.7 1.7-1.3 4-1.6 0 0-.9-1.3-2-1.2a9 9 0 0 1-5-2.3z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M225.3 221c-.5 0-1.9-.6-2.8-.3-1 .4-2.8 1.5-2.5 3.1m11-.2s-1.9.8-3.3 1.8a42 42 0 0 0-3.7 3.4c-1.1 1.1-1.4 2.6-3.7 4.2m9.5-9.7-1.5 1.1c-.6.4-.8 1-1.3 1.4"/>
  <path fill="#e8a30e" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M285.7 303.1c.2 3.3 7.8 7 13.5.2 6-4.8 4.7-12.2 0-13.2l-58.3-56.8c-2.4-1.3-2.6-2.5-3.8-3.7-2.4 2.6-7.5 7.2-10.2 9.5 1.6 1.4 3 2.7 3.4 3.8l55.4 60.2z"/>
  <path fill="#e7e7e7" fill-rule="evenodd" stroke="#000" stroke-linejoin="round" stroke-width=".1" d="M237 229.4c-2.8-3.8-13.6 6-10.7 9.2 2.9 3 13.3-5.4 10.7-9.2z"/>
  <path fill="#cccccf" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M227.2 237.8c2 1.6 10-5 8.6-7.6-2.1-2.4-10.8 6.1-8.6 7.6z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M230.4 243c4.8-1.5 8.3-4.7 10.5-9.6m24.5 48a17.3 17.3 0 0 0 12.2-12.5m-9.7 15.3a17.3 17.3 0 0 0 12.2-12.4m2.3 27.5a19 19 0 0 0 13-13M285 302.2a19.2 19.2 0 0 0 13-13"/>
  <path fill="none" stroke="#000" stroke-linecap="round" stroke-width=".1" d="M299.4 304c.3 1.5 1 2 2.2 1.5m-14.7-2c2.3 3.6 4.9 2.5 7 2.5"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="M302.5 304.2c0 1-.8 1.8-1.8 1.8a1.8 1.8 0 0 1-1.9-1.8c0-1 .9-1.8 1.9-1.8 1 0 1.8 1.1 1.8 2"/>
  <path fill="none" stroke="#000" stroke-linecap="round" stroke-width=".1" d="M299.2 303.9c.3 1.4 1 1.9 2.2 1.4m-14.5-1.9c2.3 3.7 4.9 2.6 7 2.6"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M277 187.2c1.9 3 4.7 8.5 5.4 12.7a24 24 0 0 1-7.5 22.3c-5.5 5-14 6.5-17.7 7.2-3.5.8-6.1 2-6.7 2.7 0-.6-.1-1.1.5-1.7 1.7-.7 4.4-1.2 8.3-2 7.7-1.6 15.8-4.5 20.2-12.9 5.8-11 2.4-19.7-2.6-28.2z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M279 220a.5.6 49.9 0 1-.6-.7.5.6 49.9 0 1 .7.7z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M284.4 218.6c-1.2.7-2.3.9-3.2 1.2l-2.4.7-1.6.7c-.8.4-1.7 1.5-1.7 1.5s1.3 1.3 2.8 1.1c1.2-.1 1.8-.5 2.4-.8.7-.3.6-.6 1.6-1.3 1-.7 1.6-2.1 2-3.1zm-6 1.3c-.4.6-1.3.5-1.8.4l-.3.3c.7 0 1.7 0 2.1-.6v-.1z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M284.3 218.7a17.7 17.7 0 0 1-4.9 3c-2 .8-4.2 1-5.3 1l-.3.3a19.6 19.6 0 0 0 5.4-1.1 16 16 0 0 0 5.1-3.2zm-2.5 4.8c-2 0-3.2.6-5.2 1-1.7.4-3.9-.5-5 1.2 4.7 3 8 1 10.2-2.2z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M277.6 227.8c-1-.8-8.6-3.4-9.9-.5 1.9 2 7.2 2.5 9.9.5z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M275.7 229.8c-.8 0-1.7-.3-2.7-.4-.9 0-1.3-.2-2-.3-1.1-.2-2.4-1.8-6.4-.6 1.5 3.6 6.8 4.4 11.1 1.4zm1.8-2c-4.1.9-9 0-10.8-1l-.3.1a17.4 17.4 0 0 0 11 1zm4.2-4.3c-2.4 1.6-5.5 2.9-12.1 2l-.2.2c9.2.8 10-.9 12.3-2.2z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M275.7 229.9c-3.2 0-5 1.5-11-1.4-.4-.3-1-.4-1.4-.6l-.6.2c.4.2 1 .2 1.5.3 7.4 3.3 7.2 1.8 11.5 1.5z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M263.7 225.7a.5.6 66.2 1 0 .5.8.5.6 66.2 1 0-.5-.8z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M263.6 226.4c-.7.2-.9 1-1 1.5l-.3.1c.2-.6.5-1.5 1.2-1.8l.1.2z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M283.6 199.3a.5.6 15.8 1 1-.9-.3.5.6 15.8 0 1 1 .3z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M279 216.7c0-2.2-1.2.9-3.3-4.1-.7-1.5-.7-2.4-1.1-4.6 1.2 2 3.2 2.4 4 3.9.8 1.4.6 3.7.5 4.8z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M274.6 208.2s1.1 2.5 2.7 4.3c1.5 1.8 1.8 4 1.8 4"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M275.7 210.3c1.4 1.9 3.2 4 3.3 6.4h.2c-.3-3-2.1-4.4-3.2-5.9l-.3-.5zm11.6 2.9c-1 .8-2 1.1-3 1.5-.5.3-1 .8-1.5 1-.3.2-.9.2-1.4.6-.7.4-2.2 2.1-2.2 2.1s1.4 1.2 2.3 1c2.5-.5 3.2-1.5 4.5-2.4 1-.8 1-2.7 1.3-3.8z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m278 218.5-.2.3c1.5-.1 3.8-1.5 5.3-2.3 2-1 3.2-1.8 4-3.3a9.5 9.5 0 0 1-4.1 3.3c-1.6.8-4 2.1-5 2z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M288.1 208.3c-.8 1-1.8 1.4-2.5 2l-1.4 1.2c-.3.2-.9.4-1.3.8-.6.6-1.6 2.3-1.6 2.3s.7.7 1.5.4c2.5-.3 3.3-1.5 4.2-3.7.5-1 1-1.9 1.1-3z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M279 212.8a.6.5 62 1 0 .8-.4.6.5 62 0 0-.8.3z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m280 215-.2.4c3-1.4 7-4.2 8.4-7-1.9 3-5 5-8.2 6.6zm8.8-11.4c-.7 1-1.6 1.6-2.3 2.1l-1.2 1.3-1.1.9c-.6.6-1.4 2.4-1.4 2.4s1 .8 1.7.5c.8-.4 1.8-1.3 2.3-1.7.5-.5.6-1.6 1.2-2.4.7-1 .8-2 .8-3z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M286.6 206.8a15.4 15.4 0 0 1-5 4v.4c2.7-1.6 3.8-3 5-4.4zm1.2-6c-.5 1-1.3 1.5-1.8 2.1l-1 1.3-.9.9c-.4.6-.8 2.3-.8 2.3s.6.6 1.2.2a12.5 12.5 0 0 0 2-1.8c.4-.4.6-1.5 1-2.3a4 4 0 0 0 .3-2.8zm-4.7-1.2c-.3.5-.4 1.1-.5 1.7l-.1-.4c.1-.5.2-1 .5-1.4h.1z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M286.3 203.8a13.8 13.8 0 0 1-4 4.2l-.1.3c2.3-1.7 3.2-3.1 4.1-4.5zm-6 10.5a3.5 3.5 0 0 0-.6-1.4h-.1c.3.6.4 1 .5 1.7l.2-.3z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M279.4 193.4a.5.3 39.5 0 1-.6.5.5.3 39.5 0 1 .6-.5z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M280.7 194.7a10 10 0 0 0-1.3-1c0 .1-.1.1 0 .2l1.4 1-.1-.2zm5.9.4c-1.2 2.5-4.1 4.3-3 8 3 2.7 3.2-4.8 3-8z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M283.8 189.5c-.5 2.6-2.8 4.8-1.3 8.2 4.3 1 2.3-4.7 1.3-8.2z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M281.3 185.6c2.1 4 2.7 6.3.1 8.9 0 0-1.3-1.3-1.6-3.5-.3-2 1.3-4.3 1.5-5.4z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M277.8 183.3c.5 2.5-1.6 3.7 1.5 7 2.2-2.7 1.1-3.4-1.5-7z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M277 187.7c-3.7.4-2.3-2.7-3.3-5.6 2.1 1.6 5 2.2 3.2 5.6zm2.3 4.8c-1-4.7-4.3-2.9-6-5 .9 3 2.2 5.1 6 5zm1.4 4.3c-2.8-.2-5-1.5-6.6-4.6 3 1.2 6.1 1.4 6.6 4.6z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M281.1 200.9c-1-1.3-1-2.1-1.5-3a9.6 9.6 0 0 0-3.3-3.9c0 3.3.5 7 4.8 6.9z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M281.8 204.3a21.5 21.5 0 0 0-6-6c1.1 2.3.6 6.6 6 6z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M281.3 209.1c-5.3-.1-4.8-5.1-4.8-7.5 1 1.5 2.1 2.7 3 3.7 1 1.2 1.8 2.4 1.8 3.8z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M280.7 212c-.5-1-.1-1.4-1-2.4-1.1-1-3-2.8-4-5-.2 2-.2 4.8 1.2 5.7 1 .8 2 1 3.8 1.8zm-4.6 7.8c-4.2-3.2-1.7-6-1.4-8.4 1.1 2.8 4 5.1 1.4 8.4zm1.6-31.1a59 59 0 0 0-3.9-6.5c2 3 3 4.9 4.1 6.9"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M276.1 220.6c.2-3.3-.7-6.1-1.3-9 .6 3 1.3 6.2 1 9.3l.3-.3zm5-7.9c-.5-2-4.5-3.3-5.4-8 .8 4.7 4.8 5.8 5.2 8.5l.1-.4zm.8-2.7v.5c-.7-3.1-4.4-4.7-5.4-8.9 1.5 4.6 4.5 5.2 5.4 8.4zm.8-4.7c-1.9-2.8-4.4-3.8-6.8-7 2.2 3.1 5 4.6 6.8 7.4v-.4zm-.1-3.6c-2-1-4-3.3-6.3-7.7 1.5 3.3 3.3 6.2 6.3 8.1v-.5zm-.9-4.3c-2.4-1.9-5.4-3.1-7.6-5.3 1.8 2 5.3 3.5 7.6 5.6v-.3zm-1.8-4.6c-2.4-1.6-4.7-2.1-6.6-5.2 1.5 3 4 3.8 6.6 5.4v-.2zm6.7 2.3c-.9 3.3-1.6 6.8-3.8 9v-.5c1-.5 2.6-4 3.8-8.5zm-2.7-5.5c-.2 3.4-.1 7-1.9 9l-.1-.5c1.8-1.4 1.6-5.2 2-8.5zm-2.4-3.8c.6 3 .6 5.7-.2 10.2l-.2-.4c.5-2.6 1-5.3.4-9.8zm-3.7-2.4c1.2 2.5 2.2 5.1 1.4 7.8l-.2-.3c.9-2.5-.2-5-1.2-7.5zm-4.6 33.3c1.4 3.4-.4 5.9-2.7 7.3-1.7-5 1.9-4.4 2.7-7.3z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M273.3 216.7c.2 2-2 4.5-2.8 8l-.3.3c1-4.3 3.3-6 3-8.3z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M281.3 193.3a.3.5 1.9 1 1-.7-.1.3.5 1.9 0 1 .7.1z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M281.1 195.2v-1.7h-.2v1.9l.2-.2z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M280.3 193a.3.4 2 0 1-.5.2.3.4 2 0 1 .5-.3z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M280.7 194.5a8.2 8.2 0 0 1 0 .3v-.3z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M282.4 199.3a.5.3 80.5 0 1-.7 0 .5.3 80.5 1 1 .7 0z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M282.5 201.2a9.9 9.9 0 0 0-.4-1.6l.3 1.8.1-.2z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M281.2 199.7a.5.3 57 1 1-.5.5.5.3 57 0 1 .5-.5z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M282.4 201.2a8.8 8.8 0 0 1 0 .3v-.4z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M281 212.4a.3.5 12.7 1 1-.7-.3.3.5 12.7 0 1 .6.3z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m280.4 214.2.2-1.6h-.1a9.5 9.5 0 0 1-.3 1.8l.2-.2z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M281.6 213.2a.3.5 50.5 0 0 .5.5.3.5 50.5 1 0-.5-.5z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m280.2 214.5 1.4-1v.2a9.4 9.4 0 0 0-1.4 1v-.2z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M278.1 218.6a.3.5 40.4 0 1-.5-.6.3.5 40.4 0 1 .5.6z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M276.8 219.9a10 10 0 0 0 1-1.3h-.2l-1 1.4.2-.1z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M276.1 218.2a.5.6 10 0 0 1 0 .5.6 10 1 0-1 0z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M276.7 218.7c-.3.7-.1 1 0 1.2l-.1.4c-.2-.4-.3-.8-.1-1.6h.2zm-13 10c-.7.1-1-.3-1.2-.7h-.4c.4.5.8 1 1.6 1v-.2z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M263.8 229.5a.6.5 9.5 0 1 .2-.9.6.5 9.5 1 1-.2.9z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M269.5 219.8a5.9 5.9 0 0 1-4.2 6.8c-1-4.2 3-4.4 4.2-6.8z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M269.6 219.8a23 23 0 0 1-5.1 7.7h-.6a20 20 0 0 0 5.7-7.7z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M264.3 227.5a.5.4 9.8 0 1-.4-.8.5.4 9.8 1 1 .4.8z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M262.3 228a8.6 8.6 0 0 0 1.6-.7h-.2l-1.7.7h.3zm2.8-5.3c-.1 1.3-1.2 2.5-2.1 3.5-1 .9-1.1 1.2-2.4 1.6-1.4-3 3-3.5 4.5-5z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M265.1 222.7c-1.5 2.7-3.8 4-5 5.8h-.2c1.8-2.4 3.3-2.9 5.2-5.8zm-30-35.5c-1.9 3-4.7 8.5-5.4 12.7a24 24 0 0 0 7.5 22.3c5.5 5 14 6.5 17.7 7.2 3.5.8 6.1 2 6.7 2.7 0-.6.1-1.1-.5-1.7-1.7-.7-4.4-1.2-8.3-2-7.7-1.6-15.8-4.5-20.3-12.9-5.7-11-2.3-19.7 2.7-28.2z"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M249.7 227.8c-.2.5-4.3 4-8 3.7-2.6-.2-3-.8-3-.8s-.3-.7 2-1.2c2.5-.5 6.7-2.1 9-1.7z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M238.8 230.7c2.8.3 5.8-.8 8-1.7"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M246.6 222.6a11 11 0 0 1 4.9 4c1 1.6.8 2 .8 2s-.3.3-1.4-1c-1.2-1.4-3.6-3.6-4.3-5z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M252.3 228.5c-1-1.8-2.7-3.3-4-4.5"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M235 187.6c-.1-.4.3-3.7 2.1-4.7 1.4-.8 1.9-.6 1.9-.6s.4.3-.5 1.4c-1 1-2.3 3.3-3.6 3.9z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M239 182.3c-1.6.8-2.5 2.4-3.2 3.7"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M234 189.3c-.2-.3-1-3.2-.2-5 .6-1.5 1-1.6 1-1.6s.3 0 .1 1.4c-.2 1.4-.2 4-.9 5.2z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M234.7 182.8c-.7 1.5-.7 3.3-.7 4.7"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M234 189.3a9 9 0 0 0 4.1-2.2c1-1.1.9-1.4.9-1.4s-.1-.2-1.2.6c-1 .8-3 2-3.8 3z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M239 185.7c-1 1.2-2.5 2-3.6 2.8"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M232.7 191.6c-.1-.3-1.4-3.4-.9-5.6.3-1.6.7-1.8.7-1.8s.3 0 .3 1.5c0 1.6.3 4.5 0 5.9z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M232.5 184.3c-.5 1.7-.2 3.7 0 5.3"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M231.8 193.7c-.3-.2-2.4-3.1-2.2-5.6.1-1.8.5-2 .5-2s.5-.2.7 1.5c.3 1.6 1.3 4.5 1 6z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M230.1 186.1c-.2 2 .5 4 1 5.6"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M230.6 196.4a10 10 0 0 1-2.5-5c-.2-1.7 0-2 0-2s.3 0 .8 1.4c.5 1.5 1.7 4.2 1.7 5.6z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M228.2 189.5c0 1.8 1 3.7 1.6 5.1"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M232.8 191.6c.3 0 3.4-.3 4.8-1.8 1-1.2 1-1.6 1-1.6s-.1-.3-1.3.4c-1.3.8-3.7 1.9-4.5 3z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M238.6 188.3c-1.1 1.2-2.8 2-4.2 2.6"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M231.8 193.7c.2 0 3.4 0 5-1.5 1-1 1-1.5 1-1.5s-.1-.3-1.4.4c-1.2.7-3.7 1.6-4.6 2.6z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M237.8 190.8c-1.2 1.2-3 1.8-4.3 2.3"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M230.8 196.4c.3.1 3.6-.1 5.2-1.8 1.2-1.1 1.1-1.6 1.1-1.6s-.1-.4-1.4.4c-1.4.8-4 2-5 3z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M237 193c-1.1 1.4-3 2.2-4.4 2.8"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M231.3 195.2s-.3-.6-.3-1.1l.1-.9h-.2l-.1.8v.3l-.5-.5-.2-.4h-.1l.3.7c.5.4.8 1.2.8 1.2"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M230 192.3a.6.4 83.5 1 1 .1 1.2.6.4 83.5 1 1-.1-1.2z" overflow="visible" style="marker:none"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M231.3 192.3a.4.6 19.3 1 1-.4 1.1.4.6 19.3 1 1 .4-1z" overflow="visible" style="marker:none"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="m231.2 195.2 1-.7.4-.8h.2l-.5.8-.2.3.7-.1.4-.3.1.2-.7.3c-.6 0-1.4.4-1.4.4"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M234 193.7a.4.6 45.6 1 0-.8.9.4.6 45.6 1 0 .8-.8z" overflow="visible" style="marker:none"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M233 192.9a.4.6 19.8 1 0-.4 1.1.4.6 19.8 1 0 .4-1.1z" overflow="visible" style="marker:none"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M229.8 199.3a11 11 0 0 1-3-5c-.3-1.8 0-2 0-2s.3-.2.8 1.3c.7 1.5 2 4.2 2.2 5.7z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M226.8 192.3c.2 1.9 1.2 3.8 2 5.2"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M230 199.3c.3.1 3.8-.4 5.3-2.2 1.1-1.3 1-1.7 1-1.7s-.1-.4-1.4.5c-1.4 1-4 2.2-5 3.5z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M236.3 195.4c-1.2 1.5-3 2.4-4.5 3.1"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M229.5 202.3c.3 0 3.8-1 5.4-2.9 1.2-1.3 1-1.7 1-1.7s0-.3-1.4.7-4 2.6-5 3.9z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M236 197.8c-1.3 1.4-3.2 2.5-4.6 3.4"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M229.4 202.3c-.3-.1-3.6-2.4-4-4.9-.4-1.8 0-2.1 0-2.1s.4-.3 1.1 1.3c.8 1.5 2.8 4 3 5.7z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M225.4 195.4a12 12 0 0 0 2.7 5.1"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M229.5 206c.3-.1 3.6-1.8 5-4 .9-1.5.7-2 .7-2s-.2-.2-1.4 1.1c-1.1 1.3-3.6 3.4-4.3 4.8z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M235.2 200.2c-1 1.7-2.7 3.2-4 4.3"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M229.4 206c-.4 0-3.9-1.7-4.8-4.2-.6-1.8-.4-2.2-.4-2.2s.4-.3 1.4 1.1c1 1.5 3.4 3.8 3.8 5.4z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M224.3 199.7c.6 2 2.2 3.6 3.5 4.8"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M229.4 204.4s-.5-.6-.6-1.1c-.2-.6 0-1 0-1h-.4l.2 1v.3c.3.4-.4-.3-.6-.4l-.3-.5-.2.2.6.6c.6.3 1.2 1 1.2 1"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M227.2 201.7a.6.4 69.4 1 1 .5 1.2.6.4 69.4 1 1-.5-1.2z" overflow="visible" style="marker:none"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M228.6 201.3a.4.6 5.2 1 1-.1 1.3.4.6 5.2 1 1 .1-1.3z" overflow="visible" style="marker:none"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M229.4 204.3s.5-.4.8-1c.3-.5.3-.8.3-.8h.2l-.3.8a4.2 4.2 0 0 1-.1.4l.7-.3.4-.4.1.2-.6.5c-.7.2-1.4.8-1.4.8"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M232 202a.4.6 31.5 1 0-.6 1.2.4.6 31.5 1 0 .6-1.1zm-1.3-.5a.4.6 5.7 1 0-.1 1.2.4.6 5.7 1 0 .1-1.2z" overflow="visible" style="marker:none"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M229.8 209.3c-.4 0-4-1.9-5.5-4.3-1-1.8-.9-2.2-.9-2.2s.3-.4 1.6 1c1.3 1.5 4 3.9 4.8 5.5z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M223.5 202.8c1 2 3 3.6 4.4 5"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M230 209.2c.4 0 4.3-2 5.2-4.6.8-2 .4-2.4.4-2.4s-.4-.4-1.5 1.2c-1.1 1.5-3.6 4-4 5.8z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M235.6 202.3c-.7 2.1-2.5 3.9-3.8 5.3"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M231 212.5c.4 0 4-2.3 4.9-5 .6-2 .3-2.5.3-2.5s-.3-.3-1.3 1.4c-1.1 1.6-3.5 4.4-3.9 6.1z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M236.2 205.1c-.6 2.2-2.3 4-3.5 5.6"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M230.8 212.5c-.5 0-5-1.3-6.7-4-1.1-2-.9-2.6-.9-2.6s.4-.5 1.9 1c1.6 1.5 4.8 3.8 5.7 5.6z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M223.3 206c1.1 2.2 3.4 3.8 5.2 5"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M234.8 219.4a12 12 0 0 0 3-6c.1-1.9-.2-2.2-.2-2.2s-.4-.1-.9 1.6c-.5 1.8-1.9 5-1.9 6.6z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M237.6 211.3c0 2.1-1 4.3-1.8 6"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M234.6 219.3c-.4.2-5.6 0-8-2.2-1.9-1.7-1.8-2.4-1.8-2.4s.3-.5 2.3.5c2 1.1 6.1 2.5 7.5 4.1z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M224.9 214.8c1.9 1.9 4.7 2.9 7 3.6"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M232.7 216.6c-.4 0-5-1-7.3-3.4-1.6-1.7-1.5-2.2-1.5-2.2s.2-.4 2 .9c1.9 1.2 5.5 3.1 6.8 4.7z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M224 211c1.6 2 4.2 3.3 6.2 4.3"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M233 216.5c.3-.2 3.8-3 4.2-6 .2-2.1-.2-2.6-.2-2.6s-.5-.2-1.2 1.6c-.8 1.9-2.8 5-2.8 7z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M237 208c-.2 2.4-1.6 4.6-2.7 6.4"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M232 214.9s-.8-.3-1.2-.9c-.4-.5-.5-.9-.5-.9h-.3l.5 1 .3.3-.8-.1-.6-.4v.3s.5.4.8.4a4 4 0 0 1 1.6.5"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M228.5 213.1a.7.5 45.9 1 1 1 1 .7.5 45.9 1 1-1-1z" overflow="visible" style="marker:none"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M229.8 212.1a.7.5 71.6 1 1 .4 1.4.7.5 71.6 1 1-.4-1.4z" overflow="visible" style="marker:none"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M232 214.9s.4-.8.5-1.4c0-.7-.2-1-.2-1l.3-.2v1.5l.6-.6.3-.6.2.1s-.2.7-.4.9a4 4 0 0 0-1 1.4"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M233.7 211.4a.5.7 8 1 0-.2 1.4.5.7 8 1 0 .2-1.4z" overflow="visible" style="marker:none"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M232.1 211.3a.7.5 72.2 1 0 .5 1.4.7.5 72.2 1 0-.5-1.4z" overflow="visible" style="marker:none"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M236.6 221.4c-.4.2-4.6 1.2-7.3-.2-2-1-2-1.6-2-1.6s0-.5 2 0c2 .4 5.6.8 7.3 1.8z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M227.3 219.7c2.1 1.1 4.7 1.4 6.7 1.6"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M236.8 221.4c.2-.2 2-2.8 2-5.2 0-1.8-.4-2.1-.4-2.1s-.3-.2-.6 1.4c-.3 1.6-1.2 4.3-1 5.9z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M238.4 214.2c.2 1.9-.5 3.8-1 5.3"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M240.6 224.4c-.4.2-5.5 1.5-8.5.2-2.3-1-2.4-1.5-2.4-1.5s0-.6 2.4-.2c2.3.4 6.6.4 8.5 1.5z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M229.8 223.1c2.4 1.1 5.4 1.2 7.8 1.3"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M240.8 224.3c.2-.3 1.3-4 0-6-1-1.4-1.5-1.4-1.5-1.4s-.5.1-.1 1.7c.4 1.6.6 4.6 1.6 5.7z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M239.3 217c1.1 1.4 1.3 3.6 1.4 5.2"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M238.2 222.6s-.6.4-1.3 0c-.6-.3-.9-.7-.9-.7l-.3.2a10 10 0 0 0 1.4 1l-1 .2-.6-.2v.3l1 .1 1.6-.5"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M234.1 222.7a.8.6 24.1 1 1 1.5.6.8.6 24.1 1 1-1.5-.7z" overflow="visible" style="marker:none"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M235 221a.8.6 49.9 1 1 1 1.3.8.6 49.9 1 1-1-1.3z" overflow="visible" style="marker:none"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M238.3 223s.6-.6.2-1.3a2.8 2.8 0 0 0-.7-1l.2-.3.7 1 .2.5.3-1a17.5 17.5 0 0 0 0-.6h.2v1c0 .3-.6 1.6-.6 1.6"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M238.6 218.8a.8.6 69.5 1 0 .6 1.5.8.6 69.5 1 0-.6-1.5zm-1.6.8a.8.6 43.7 1 0 1.1 1.2.8.6 43.7 1 0-1.1-1.2z" overflow="visible" style="marker:none"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M243.5 226c-.2.3-4.5 3.1-7.8 2.4-2.5-.5-2.8-1.1-2.8-1.1s-.2-.6 2-.8c2.4-.2 6.5-1.2 8.6-.5z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M233 227.3c2.6.7 5.5 0 7.7-.6"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M246.2 226.7s-.5.8-1.4.6c-.9-.2-1.3-.5-1.3-.5l-.3.3 1.4.5h.5s-.6.6-1 .6l-.7.2v.3l1.2-.3c.3 0 1.6-1.2 1.6-1.2"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M241.7 228.3a1 .6 5.4 1 1 1.8.2 1 .6 5.4 1 1-1.8-.2zm.4-2a1 .6 31.2 1 1 1.6.9 1 .6 31.2 1 1-1.6-1z" overflow="visible" style="marker:none"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M244.8 226.4c.2-.4.8-4.2-1-6-1.3-1.3-2-1.2-2-1.2s-.5.2.2 1.7c.8 1.5 1.5 4.5 2.8 5.5z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M242 219.3c1.4 1.3 2 3.4 2.3 5"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M246.8 227.3s.2-.9-.5-1.4c-.7-.6-1.2-.7-1.2-.7v-.3l1.3.6.4.4s0-.8-.2-1.1a20 20 0 0 0-.4-.7l.3-.2.6 1.1.1 2"/>
  <path fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M245 222.9a1 .6 42.7 1 0 1.4 1.2 1 .6 42.7 1 0-1.4-1.2zm-1.3 1.7a1 .6 17 1 0 1.8.5 1 .6 17 1 0-1.8-.5z" overflow="visible" style="marker:none"/>
  <path fill="#452c25" d="M255 223s-2.5 5.7-1.6 6.3c0 0 2.5-4.5 4.8-6.2 1.1-1.1 1.8 0 2-1 .1-1-3-2.3-3-2.3l-2.1 2.9"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M255 223s-2.5 5.7-1.6 6.3c0 0 2.5-4.5 4.8-6.2 1.1-1.1 1.8 0 2-1 .1-1-3-2.3-3-2.3l-2.1 2.9"/>
  <path fill="#452c25" d="M246 227.3s-3.7 6.4-2.7 6.4c1 .1 4.8-8 4.8-8l-1.3.2-.9 1.4z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M246 227.3s-3.7 6.4-2.7 6.4c1 .1 4.8-8 4.8-8l-1.3.2-.9 1.4z"/>
  <path fill="#452c25" d="M247 225.6s-3.8 6.2-2.8 6.3c1 0 5-8 5-8l-1.3.3-.9 1.4z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M247 225.6s-3.8 6.2-2.8 6.3c1 0 5-8 5-8l-1.3.3-.9 1.4z"/>
  <path fill="#452c25" d="M247.8 224.5s-4.3 5.8-3.4 6c1 .2 5.7-7.4 5.7-7.4h-1.3l-1 1.4z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M247.8 224.5s-4.3 5.8-3.4 6c1 .2 5.7-7.4 5.7-7.4h-1.3l-1 1.4z"/>
  <path fill="#452c25" d="M249 223.5s-5.1 5.2-4.2 5.5a35 35 0 0 0 6.7-6.6l-1.4-.1-1.1 1.2z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M249 223.5s-5.1 5.2-4.2 5.5a35 35 0 0 0 6.7-6.6l-1.4-.1-1.1 1.2z"/>
  <path fill="#452c25" d="M249.1 221.6s-4.4 5.8-3.4 6c.9.2 5.8-7.4 5.8-7.4h-1.3l-1 1.4z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M249.1 221.6s-4.4 5.8-3.4 6c.9.2 5.8-7.4 5.8-7.4h-1.3l-1 1.4z"/>
  <path fill="#452c25" d="M248 226.5s-4.3 5.9-3.4 6c1 .3 5.7-7.4 5.7-7.4l-1.3.1-1 1.3z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M248 226.5s-4.3 5.9-3.4 6c1 .3 5.7-7.4 5.7-7.4l-1.3.1-1 1.3z"/>
  <path fill="#452c25" d="M250.4 225.4s-2.5 4.7-2.2 5a17 17 0 0 0 4.9-5.6c1.5-2.8-2.8.5-2.8.5"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M250.4 225.4s-2.5 4.7-2.2 5a17 17 0 0 0 4.9-5.6c1.5-2.8-2.8.5-2.8.5"/>
  <path fill="#452c25" d="M250.7 225s-2.5 5.7-1.6 6.3c0 0 3.1-3.5 4-6.3.7-2.8 0-.2 0-.2l-.3-3-2 2.9"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M250.7 225s-2.5 5.7-1.6 6.3c0 0 3.1-3.5 4-6.3.7-2.8 0-.2 0-.2l-.3-3-2 2.9"/>
  <path fill="#452c25" d="M249.4 224.4s-5 5.2-4.1 5.5c.9.3 6.6-6.6 6.6-6.6h-1.3l-1.2 1.1z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M249.4 224.4s-5 5.2-4.1 5.5c.9.3 6.6-6.6 6.6-6.6h-1.3l-1.2 1.1z"/>
  <path fill="#452c25" d="M249.8 225.1s-5 5.2-4.1 5.5c.9.3 6.6-6.5 6.6-6.5l-1.3-.2-1.2 1.2z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M249.8 225.1s-5 5.2-4.1 5.5c.9.3 6.6-6.5 6.6-6.5l-1.3-.2-1.2 1.2z"/>
  <path fill="#452c25" d="M250.2 226s-5 5.1-4.1 5.4c.9.4 6.6-6.5 6.6-6.5l-1.3-.2-1.2 1.2z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M250.2 226s-5 5.1-4.1 5.4c.9.4 6.6-6.5 6.6-6.5l-1.3-.2-1.2 1.2z"/>
  <path fill="#452c25" d="M250.6 218.8s-3.8 4.8-3.2 5.6c.5.9 4-2.2 5-4.3 1.1-2.1-1.8-1.5-1.8-1.5"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M250.6 218.8s-3.8 4.8-3.2 5.6c.5.9 4-2.2 5-4.3 1.1-2.1-1.8-1.5-1.8-1.5"/>
  <path fill="#452c25" d="M250.5 223.9s-3.3 6.2-2.4 5.8c.8-.3 4-5 4.4-6 .4-1 .3-2.1.3-2.1l-2.5 1.5.2 1.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M250.5 223.9s-3.3 6.2-2.4 5.8c.8-.3 4-5 4.4-6 .4-1 .3-2.1.3-2.1l-2.5 1.5.2 1.2"/>
  <path fill="#452c25" d="M250.5 221.9s2.7-5 0 .9c-2.7 5.8-3.7 4.9-3.7 4.9-.2-.4 2.3-4.3 2.3-4.3s2-3 2.4-3.3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M250.5 221.9s2.7-5 0 .9c-2.7 5.8-3.7 4.9-3.7 4.9-.2-.4 2.3-4.3 2.3-4.3s2-3 2.4-3.3"/>
  <path fill="#452c25" d="M253.4 221.2s3-4.9 0 1c-3 5.7-4.2 4.8-4.2 4.8-.2-.4 2.6-4.3 2.6-4.3s2.1-3 2.6-3.3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M253.4 221.2s3-4.9 0 1c-3 5.7-4.2 4.8-4.2 4.8-.2-.4 2.6-4.3 2.6-4.3s2.1-3 2.6-3.3"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M252.3 219.2s-3.8 4.8-3.2 5.6c.5.8 4-2.2 5-4.3 1.1-2.2-1.8-1.5-1.8-1.5"/>
  <path fill="#e8a30e" d="M291 267.8a35 39.4 0 1 1-70 0 35 39.4 0 1 1 70 0z"/>
  <path fill="none" stroke="#390" stroke-width=".9" d="M228 267.8c0-18.3 12.8-32.3 28-32.3s28 14 28 32.3" color="#000" font-family="Sans" font-weight="400" overflow="visible" style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;marker:none"/>
  <path fill="#007934" stroke="#eee" stroke-width=".1" d="M221 269.9c1 20.8 16.3 37.3 35 37.3s34-16.5 35-37.3h-70z"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M291 267.8a35 39.4 0 1 1-70 0 35 39.4 0 1 1 70 0z"/>
  <path fill="#d52b1e" stroke="#000" stroke-width=".1" d="M250.1 240.4c-.3 1.5 0 2.7.8 3.9a5 5 0 0 1 1 2.9 8.4 8.4 0 0 0-.8.4l-6-3.9 4 5.9a8.6 8.6 0 0 0-.2.3 5.2 5.2 0 0 0-3.2-.4 5.3 5.3 0 0 1-3.9-.8 4.8 4.8 0 0 0 3.3 2.2c1 .2 2 .6 2.7 1.4l-.2.8-7 1.4 7 1.4a9 9 0 0 0 .1.3 5.2 5.2 0 0 0-2.5 2 5.3 5.3 0 0 1-3.4 2.2c1.5.4 2.8 0 4-.8.8-.5 1.8-1 2.8-.9l.5.7-4 6 6-4 .2.2a5.2 5.2 0 0 0-.4 3.2 5.3 5.3 0 0 1-.8 3.9 4.8 4.8 0 0 0 2.2-3.3 5.2 5.2 0 0 1 1.4-2.7l.9.2 1.4 7 1.3-7h.4a5.2 5.2 0 0 0 2 2.5 5.3 5.3 0 0 1 2.2 3.3 4.8 4.8 0 0 0-.8-4 5.2 5.2 0 0 1-1-2.8l.8-.5 6 4-4-5.9a8.6 8.6 0 0 0 .2-.3 5 5 0 0 0 3.2.4 5.3 5.3 0 0 1 3.9.8 4.8 4.8 0 0 0-3.4-2.2 5.2 5.2 0 0 1-2.7-1.4l.2-.9 7-1.4-7-1.3a8.3 8.3 0 0 0 0-.4 5.2 5.2 0 0 0 2.5-2 5.3 5.3 0 0 1 3.3-2.1 4.8 4.8 0 0 0-3.9.7 5.2 5.2 0 0 1-2.8 1 8.4 8.4 0 0 0-.5-.8l4-5.9-6 4a8.6 8.6 0 0 0-.2-.2c.5-1.2.6-2.2.4-3.2a5.3 5.3 0 0 1 .8-4 4.8 4.8 0 0 0-2.2 3.4 5.2 5.2 0 0 1-1.4 2.7 8.5 8.5 0 0 0-.9-.2l-1.4-7-1.3 7h-.4a5.2 5.2 0 0 0-2-2.5 5.3 5.3 0 0 1-2.2-3.3z" overflow="visible" style="marker:none"/>
  <use width="330" height="330" fill="#fcbf49" stroke-width="1.1" transform="rotate(22.5 -488.5 805) scale(.15213)"/>
  <use width="330" height="330" fill="#fcbf49" stroke-width="1.1" transform="matrix(-.15213 0 0 .15213 270.9 248.2)"/>
  <path d="M262.2 252.5c-1.7-1.5-4-1.8-5.1-.6-1 1.2-.8 2.5.2 4a.6.6 0 0 0-.3.2 5.2 5.2 0 0 1-.4-4.4c1.7-1.3 4-1.5 5.6.8"/>
  <path d="M259.5 252c-1 0-1.2.3-1.7.6-.4.4-.7.3-.7.4-.1 0 0 .3.1.2.2 0 .5-.2 1-.6s.8-.3 1.3-.3c1.4 0 2.1 1.1 2.3 1 .1 0-.8-1.3-2.3-1.3"/>
  <path d="M261.3 253.3c-1-1-2.9-1.1-3.6.1h.3c.7-1.2 2.6-.7 2.7-.2v.2"/>
  <circle cx="259.4" cy="253.3" r=".7"/>
  <path d="M257.7 253.4c.7.7 2.4.8 3.6 0l-.6-.2c-.7.9-2 .8-2.7.2v-.2"/>
  <path d="M261.3 253.7c-1.3 1-2.6 1-3.3.5-.8-.5-.8-.6-.6-.6l.9.4c.6.3 1.5.3 3-.3m-3.7 2.3a.5.5 0 1 1-.6.4c0 .2-.4.6-1 .6h-.1l.1.3c.1 0 .6 0 1-.2a.7.7 0 1 0 .6-1.1m1 3.2c-.8-.5-1-1.2-1.8-1.2a2 2 0 0 0-.8.3h-.1l.1.2c.3 0 .8-.4 1.3 0l1.2.7m-.2 0c-1.5-.5-1.8-.2-2.3-.2h-.1l.1.3c.6 0 1-.4 2.3-.1"/>
  <path d="M258.5 259.2c-1.7-.2-1.1.8-2.5.8h-.1l.1.2c1.7 0 1-.9 2.5-1m-8.7-6.7c1.7-1.5 4-1.8 5.1-.6 1 1.2.8 2.6-.2 4 0 0 .2 0 .3.2a5.2 5.2 0 0 0 .4-4.4c-1.7-1.3-4-1.5-5.6.8"/>
  <path d="M252.5 252c1 0 1.2.3 1.7.6.4.4.7.3.7.4.1 0 0 .3-.1.2-.2 0-.5-.2-1-.6s-.8-.3-1.3-.3c-1.4 0-2.1 1.1-2.3 1-.1 0 .8-1.3 2.3-1.3"/>
  <path d="M250.8 253.3c1-1 2.8-1.1 3.5.1h-.3c-.7-1.2-2.6-.7-2.7-.2v.2"/>
  <circle cx="-252.7" cy="253.3" r=".7" transform="scale(-1 1)"/>
  <path d="M254.3 253.4c-.7.7-2.4.8-3.5 0l.5-.2c.7.9 2 .8 2.7.2v-.2"/>
  <path d="M250.7 253.7c1.3 1 2.6 1 3.3.5.8-.5.8-.6.6-.6l-.9.4c-.6.3-1.5.3-3-.3m3.7 2.3a.5.5 0 1 0 .6.4c0 .2.4.6 1 .6h.2l-.2.3c-.1 0-.6 0-1-.2a.7.7 0 1 1-.6-1.1m-1 3.2c.8-.5 1-1.2 1.8-1.2l.8.3h.2l-.2.2c-.3 0-.8-.4-1.3 0l-1.2.7m.2 0c1.5-.5 1.8-.2 2.3-.2h.1l-.1.3c-.6 0-1-.4-2.3-.1"/>
  <path d="M253.5 259.2c1.7-.2 1.1.8 2.5.8h.1l-.1.2c-1.7 0-1-.9-2.5-1"/>
  <path fill="#007934" stroke="#000" stroke-linecap="round" stroke-width=".1" d="M259.4 275.6c1.7.3 3.5.2 5-.3a10.5 10.5 0 0 1 4.6-.6c0-.2.4-.4.2-.6-.6-.3-1.3-.3-2-.6-1.1-.5-1.8-1.4-3-2 0-.1-.5-.4-.5-.7 2.3 3.4 8 1.7 12.7 1.3.5.1 1.6-.2 2.6-.5 1.2-.4 4 0 4.7-.6l-1.5-1c-.6-.9-2.4-.8-3.2-1.7-1.4-1.5-3.5-2-5.1-3.2-.4-.2-1.2-.1-1.7-.3-.7-.5 0-.5-5.4-4.9-4.8-2-4.5-3.5-7.5-4.6-1-.6-2-1.5-3-1.2-1.5.4-5 2.2-6.6 3l-4 3.1c-.3.3-3.7 3.1-7.5 5.2a121 121 0 0 1-9.9 5c8.7-.4-7.7 2.5 31.1 5.2z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M238.2 265.7a59 59 0 0 0 13.2-9c-.4 0 .7 1 .6 1.4.8 0 .4-1 1-1s1-.2 1.4-.3c.5-.1.2.2.2.4-.7 1.3-2.2 2-3.4 3 .1.2.3.3.2.4.4.1 1 .1 1.2-.1l.1-.4c.5.2.3.5.1.8-.3.7-1.5.6-2 1.2a6.6 6.6 0 0 1-1.5 1.7c.5-.4 1.1-1 1.8-1 1-.1 1.4-.8 2.3-1 1-.2 1.6-1 2.4-1.6-.3.5-1 .9-.7 1.4a.6.6 0 0 0 .6.1c-.7.9-2.1 1.6-2.6 2.6-.4-.1-.7.2-1 .2-.5.2-.4.9-.7 1-1.2.8-1.9 2-2.4 3l-1.5.8c-.7.2-4.9 3.5-5 3-.3-2.2-4.6 1.8-14.1-1.6m32.6-.1-.2-.2c.1-.3-.5-.4-.5-.7 1 0 2 1.3 2.6.5.2-.1-.3-.4.4-.6.2 0-.1-.2 0-.3h-1l-.8-.3c-.3-.1-.5-.5 0-.6 1-.2 2 .5 2.8.2l1.8-.6c.3 0 1.3 0 1 .3-.3.2-.8.1-1 .2-.6.1-1 .4-1.6.6.4 0 .3.4.7.3.7-.2 1.4-.5 2.1-.5l.2-.5h.2c-.3-.5.7-.3 1-.7l.2.1c-.5.2-.3.6-.4.8l-.3.3c.3.2.3-.2.6 0h.6c.4 0 .8-.1.6-.4-.3-.3-.6-.5-.6-.9h-.2c.6 0 1 .1 1.2.4.3.2.4.6.8.7.9.2.8-.2.8-.7.7 0 1.7.4 1.5.7 0 .3-.6.5-1.1.5-.4 0-.2.3-.4.3-.4 0-1 0-1.1.3-.2.2 0 .7.3 1h2c.1-.4.6-.5 1-.8.4-.2-.3-.4-.6-.6-.3-.1-.1-.2 0-.4.3-.3 1 0 1-.2.2-.3-.1-.7.2-.8.2-.2.5.1.4.3l.7-.2c.4 0 .6.3.4.3-.4.3-.8.5-.7 1 0 .2-.5.2-.3.4.5.3.4.6.6 1 .1.4 1 .5 1.7.3-.3-.7 1.4-.3 2.2-.5v-.2c-.4-.2-.5-.3-.4-.6l-.2-.2c1.1.4 3 1 3.9 1.6-1 .2-3-.3-4 0-1.4.2-2.6.6-4 .6-.6 0-1.2-.3-1.8-.4m-12-.7-.3-.1"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M257.3 276.4c2 0 2.3 1.5 3.7.1 1.2.2 2.4-.2 2.4-.4 2.9.6 11.9-.2 11.3-.8-1-1-2.5-1.5-3.7-2.4l-1.2-.4c-.7-.2-1.6 0-2.1-.3-1-.5-2-1-2.8-1.6-.5-.4-.7-1-1.3-1.5-.6-.4-1.4-.5-2-.8-1-.3-1.5-1.3-2.4-2-.3-.2-.8-.1-1.2-.4-.7-.3-1.3-1.2-2-1-1.2.1-1.9 1.1-3 1.6-1 .5-1.5 1.3-2.3 1.8-.2.1-2.8 1.9-5.7 3a76.7 76.7 0 0 1-7 2.7s2.5 1.9 8.5 1.6l3.6 1.2 2-.4h5.1z"/>
  <path fill="#007934" stroke="#000" stroke-width=".1" d="M245 271.8c1.4-.6 6.5-3 8-4.8-.2 0 .5.5.4.8.5 0 .3-.5.7-.6l.8-.1c.3-.1.1 0 .1.2-.4.7-1.3 1-2 1.6 0 0 .1.1 0 .2h.8l.1-.3c.3.1.2.3 0 .4-.1.4-.9.4-1.1.7l-1 1c.3-.3.7-.6 1.1-.6.7 0 .9-.4 1.4-.5.6-.2 1-.6 1.5-.9-.2.2-.6.4-.5.7l.4.2c-.4.4-1.2.7-1.5 1.3-.3-.1-.5 0-.7.1-.2 0-.2.5-.3.6-.8.3-1.2 1-1.5 1.5 0 0-.7.4-1 .4-.3.2-2.9 2-3 1.7-.2-1.2-2.6.5-8.5-1.3"/>
  <path fill="#00a6de" stroke="#000" stroke-width=".1" d="M256 228.4c-19.3 0-35 17.7-35 39.4 0 21.8 15.7 39.4 35 39.4s35-17.6 35-39.4-15.7-39.4-35-39.4zm0 8.8c14.1 0 26.3 13.1 26.3 30.6s-12.2 30.6-26.3 30.6c-14.1 0-26.3-13.1-26.3-30.6s12.2-30.6 26.3-30.6z" color="#000" font-family="Sans" font-weight="400" overflow="visible" style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;marker:none"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261 284.6c0 .2 0 .2-.4.2-.4.1-.5.1-.5-.1s0-.2.5-.3c.3 0 .4 0 .4.2z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="m261.1 284.6-.5.2h-.6c0-.2.3-.3.6-.3h.5zm-3 9.5c.9-2.2 1-4-.1-6.4 2-1.9 3.5-1.2 4.8.1-1.3 2.4-1 4.1-.2 6.4a4.3 4.3 0 0 1-4.5 0z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.3 286.5v8.3c0-2.8.2-5.5 0-8.3z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.7 286.6a47.4 47.4 0 0 0-.4 8.2h.2c0-3.1 0-5.7.4-8.2a3 3 0 0 0-.2 0zm.7-2.7c-.4.4-.5.4-.4 1 .4-.2.4-.5.4-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.6 284.2c.2.2.6.4.4 1-.5-.3-.4-.4-.4-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.5 284.9c.3.2.6.3.4.8-.3-.3-.4-.3-.4-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.4 285.2c.3.3.6.4.4 1-.4-.3-.4-.3-.4-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.3 285.8c.3.2.7.3.4 1-.4-.4-.2-.5-.4-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.3 286.3c.2.2.6.4.4 1-.4-.4-.4-.4-.4-1zm1.3-1.8c-.2.1-.6.1-.6.8.5-.3.5-.2.6-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.6 285c-.2.1-.7 0-.7.7.6-.3.6-.2.7-.7z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.5 285.4c-.2.1-.6.1-.7.8.6-.3.6-.2.7-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.5 286c-.2 0-.7-.1-.7.7.4 0 .4-.3.7-.7z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.3 286.5c-.3.1-.5 0-.6.8.5-.4.5-.3.6-.8zm.3.4c-.8 2.2-1 4.2-.9 7.9a6.8 6.8 0 0 0 .2 0c0-3.7.1-5.7.8-7.8a3 3 0 0 0-.1-.1zm1.2-2.4c-.4.3-.6.2-.5.9.4-.2.4-.4.5-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262 284.6c.2.2.5.4.1 1-.3-.4-.2-.4-.1-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.8 285.2c.2.3.5.4.2 1-.2-.5-.3-.5-.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.6 285.5c.2.3.5.5.2 1.1-.4-.4-.3-.5-.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.4 286c.2.3.6.5.2 1-.4-.4-.1-.5-.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.2 286.5c.2.3.6.5.2 1-.3-.3-.3-.4-.2-1zm1.8-1.4c-.3 0-.7 0-.8.6.5-.2.5-.1.8-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.8 285.5c-.2.1-.7 0-.8.6.6-.2.6-.1.8-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.7 286c-.3 0-.7 0-.9.6.6-.2.6-.2.9-.7z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.5 286.5c-.2 0-.7-.2-.9.6.5 0 .5-.3 1-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.2 287c-.4 0-.5 0-.7.6.5-.2.5-.2.7-.7zm.1.4c-1 2-1.2 3.8-.7 7.2a5 5 0 0 0 .2 0c-.5-3.3-.3-5.2.6-7.1a3.5 3.5 0 0 0 0-.1zm1.7-2.4c-.5.2-.7.2-.7.8.4-.1.5-.3.7-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.1 285c.2.3.4.5 0 1-.3-.4-.2-.4 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.8 285.6c.2.3.5.5.1 1-.1-.5-.3-.5 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.6 285.9c.2.3.4.6 0 1-.3-.4-.2-.4 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.3 286.4c.2.3.5.5 0 1-.2-.5 0-.5 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262 286.8c.2.3.6.6.2 1-.3-.4-.3-.4-.1-1zm2-1.2c-.2 0-.6 0-.9.5.6 0 .6 0 .9-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.8 286c-.2.1-.7 0-.9.5.7 0 .6 0 1-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.6 286.4c-.2 0-.7 0-1 .5.7 0 .7 0 1-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.4 287c-.3 0-.7-.4-1 .4.5 0 .5-.2 1-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263 287.4c-.3 0-.5-.1-.8.5.5-.1.5 0 .8-.5zm-3.2-.8h-.1a44 44 0 0 0 .1 0zm-.7-2.7c.4.4.6.4.4 1-.4-.3-.4-.5-.4-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.9 284.2c-.2.2-.6.3-.4 1 .5-.3.4-.4.4-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260 284.9c-.3.2-.6.2-.4.8.3-.3.4-.3.4-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260 285.2c-.2.3-.5.4-.3 1 .4-.3.4-.3.4-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.2 285.8c-.3.2-.7.3-.4 1 .4-.4.2-.6.4-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.2 286.3c-.2.2-.6.3-.4 1 .4-.4.4-.4.4-1zm-1.3-1.9c.2.2.6.2.6.9-.5-.4-.5-.3-.6-.9z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.9 284.9c.2.1.7.1.7.8-.6-.3-.6-.3-.7-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259 285.3c.2.2.6.2.7.9-.6-.4-.6-.3-.7-.9z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259 286c.2 0 .7-.1.7.7-.4-.1-.4-.4-.7-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.2 286.4c.3.2.5.2.6.8-.5-.3-.5-.2-.6-.8zm-.2.6a4 4 0 0 0-.2 0c.7 2.2 1 4.2 1 7.7a20 20 0 0 0-.8-7.8zm-1.3-2.7c.4.4.6.3.6 1-.5-.2-.5-.4-.6-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.5 284.5c-.2.3-.5.5-.1 1 .3-.4.3-.4.1-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.7 285.1c-.2.3-.5.4-.2 1 .2-.4.3-.4.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.9 285.5c-.2.3-.5.4-.2 1 .4-.4.3-.4.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.1 286c-.2.3-.6.4-.2 1 .4-.4.1-.5.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.3 286.5c-.2.3-.6.5-.3 1 .3-.4.4-.4.3-1zm-1.8-1.6c.3.2.7 0 .8.7-.6-.2-.5-.1-.8-.7z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.7 285.4c.2.1.7 0 .8.6-.6-.2-.6-.1-.8-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.8 285.8c.3.1.7 0 .9.7-.6-.2-.6-.2-.9-.7z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258 286.4c.2 0 .7-.2.9.6-.5 0-.5-.3-1-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.3 286.8c.3.1.5 0 .7.7-.5-.2-.5-.2-.7-.7zm0 .7h-.2c1 2 1 3.8.8 7h.2c.3-3.2.1-5-.8-7zm-1.8-2.7c.5.3.7.2.7.9-.4-.2-.5-.4-.7-.9z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.4 284.9c-.1.3-.4.5 0 1 .3-.4.2-.4 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.7 285.5c-.2.3-.5.4-.1.9.1-.4.3-.4 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.9 285.8c-.2.3-.4.5 0 1 .3-.4.2-.4 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.2 286.3c-.2.3-.5.5-.1 1 .3-.5 0-.5 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.4 286.8c-.2.2-.5.5 0 1 .2-.4.2-.5 0-1zm-1.9-1.4c.2.1.6 0 .9.6-.6-.1-.6 0-.9-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M256.7 285.9c.2 0 .7-.1.9.5-.7-.1-.6 0-1-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M256.9 286.3c.2 0 .7-.1 1 .5-.7 0-.7 0-1-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.1 286.8c.2 0 .7-.3 1 .5-.5 0-.5-.2-1-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.5 287.2c.3 0 .5 0 .8.6-.6-.1-.5-.1-.8-.6zm2.3-3.4c.4.5.6.5.3 1-.3-.2-.3-.5-.3-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.6 284.2c-.2.2-.6.3-.4 1 .4-.3.4-.4.4-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.6 284.9c-.3.2-.6.2-.4.8.3-.3.4-.3.4-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.7 285.2c-.3.3-.6.3-.4 1 .4-.3.4-.3.4-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.8 285.8c-.3.2-.7.3-.5 1 .5-.4.3-.6.5-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.8 286.3c-.2.2-.7.3-.5 1 .4-.4.5-.4.5-1zm-1.2-2c.1.2.6.3.5 1-.5-.4-.5-.4-.5-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.6 284.8c.2.2.6.2.6.9-.6-.4-.5-.3-.6-.9z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.6 285.3c.2.1.7.2.7.8-.6-.3-.6-.3-.7-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.6 285.9c.2 0 .7 0 .7.8-.4-.2-.4-.4-.7-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.8 286.4c.3.1.5.1.5.8-.4-.3-.4-.3-.5-.8zm-.4.3h-.1c.6 2.6.7 5 .7 8h.1c.1-2.7 0-5.3-.7-8zm-1-2.5c.4.3.6.3.5 1-.5-.3-.5-.5-.6-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.2 284.4c-.2.2-.5.4-.2 1 .3-.4.3-.4.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.3 285c-.2.3-.5.4-.2 1 .2-.4.3-.4.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.5 285.4c-.2.2-.5.4-.2 1 .3-.4.3-.4.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.7 285.9c-.2.3-.6.4-.3 1 .4-.4.2-.5.3-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M259.8 286.4c-.2.3-.6.4-.3 1 .3-.4.4-.4.3-1zm-1.6-1.6c.2 0 .6 0 .7.7-.5-.3-.5-.2-.7-.7z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.3 285.2c.2.1.7 0 .8.7-.6-.2-.6-.2-.8-.7z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.4 285.6c.2.2.7.1.8.8-.6-.3-.6-.2-.8-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.5 286.2c.3 0 .7-.1.9.7-.5 0-.5-.3-.9-.7z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.8 286.7c.4 0 .5 0 .7.7-.5-.2-.5-.2-.7-.7zm-.8 1a6.7 6.7 0 0 1 .8 4c0 .8-.2 1.7-.4 2.6h.2c.6-2.7.5-4.7-.6-6.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.6 287.2c.8 2.3.9 4.4.7 7.5h.2a16 16 0 0 0-.9-7.5zm-1.5-2.6c.5.3.7.2.7.9-.5-.2-.5-.4-.7-.9z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258 284.6c-.2.3-.5.5 0 1.1.2-.4.1-.4 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.2 285.3c-.2.3-.5.4-.1.9.2-.4.3-.4.1-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.4 285.6c-.1.3-.4.5 0 1 .3-.4.2-.4 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.7 286c-.2.4-.6.6-.1 1.1.3-.5 0-.5.1-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258.9 286.6c-.2.3-.5.5-.1 1 .2-.4.2-.5.1-1zm-1.9-1.4c.3 0 .7 0 .9.6-.6-.2-.6-.1-.9-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.2 285.6c.2.1.7 0 .9.6-.7-.1-.6 0-.9-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.4 286c.2.1.7 0 .9.6-.6-.1-.6 0-.9-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.6 286.6c.2 0 .7-.3 1 .5-.5 0-.6-.2-1-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258 287c.3 0 .5 0 .7.6-.5-.2-.5-.1-.7-.6zm-2-1.7c.5.2.6 0 .8.7-.5 0-.6-.3-.9-.7zm.8-.1c-.1.3-.4.6.1 1 .3-.4.2-.5-.1-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.2 285.8c-.2.3-.4.4 0 .9.1-.4.2-.4 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.4 286c-.1.4-.3.6.1 1.1.3-.5.2-.5-.1-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.8 286.5c-.2.3-.5.6 0 1 .3-.5 0-.5 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M258 287c0 .2-.4.5 0 1 .3-.5.3-.5 0-1zm-2-1.1c.2 0 .6-.2 1 .4-.7 0-.7 0-1-.4z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M256.2 286.3c.3 0 .7-.2 1 .4-.7 0-.6 0-1-.4z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M256.5 286.6c.2 0 .7-.1 1 .5-.7 0-.7 0-1-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M256.8 287.1c.2 0 .6-.3 1 .4-.5.1-.6-.1-1-.4z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M257.2 287.5c.4 0 .5 0 .8.5-.5-.1-.5 0-.8-.5zm4-.8a27.5 27.5 0 0 0-.7 8h.2c0-3 0-5.4.7-8h-.1zm1.1-2.4c-.4.3-.6.3-.5.9.4-.2.5-.4.5-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.5 284.4c.2.3.5.5.2 1-.4-.3-.3-.4-.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.3 285c.3.3.6.4.3 1-.3-.4-.4-.4-.3-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.2 285.4c.2.3.5.5.2 1-.4-.3-.3-.4-.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261 286c.2.2.6.4.3 1-.5-.5-.2-.6-.3-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M260.8 286.4c.3.3.6.5.3 1-.3-.3-.3-.4-.3-1zm1.7-1.5c-.2 0-.7 0-.8.7.6-.3.6-.2.8-.8z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.4 285.3c-.2.1-.7 0-.8.6.6-.1.6 0 .8-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.3 285.7c-.3.2-.8 0-.9.7.7-.2.6-.1.8-.7z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.1 286.3c-.2 0-.7-.2-.8.6.4 0 .5-.3.8-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.8 286.8c-.3 0-.5 0-.6.6.5-.2.4-.1.6-.6zm.2.3c-1 2.3-1.1 4.4-.9 7.6h.2c-.2-3.2 0-5.3.8-7.5zm1.5-2.4c-.4.3-.6.2-.6.9.5-.2.5-.4.7-.9z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.7 284.8c.2.3.5.5 0 1-.2-.4-.2-.5 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.4 285.4c.3.3.5.4.2.9-.2-.4-.3-.4-.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.3 285.7c.1.3.4.5 0 1-.3-.4-.2-.4 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262 286.2c.2.3.5.5 0 1-.3-.5 0-.5 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M261.8 286.6c.1.3.5.6 0 1.1-.2-.4-.2-.5 0-1zm1.8-1.3c-.2.1-.6 0-.8.6.6-.1.5 0 .8-.6z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.4 285.8c-.2 0-.6-.1-.8.5.6-.1.6 0 .8-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.3 286.2c-.3 0-.7-.1-1 .5.7 0 .7 0 1-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263 286.7c-.2 0-.6-.3-.9.5.5 0 .5-.2 1-.5z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.7 287.1c-.4 0-.5 0-.8.6.5-.1.5-.1.8-.6zm0 .6c-1.2 2-1 4.2-.6 6.7h.2c-.2-1.2-.4-2.1-.3-3a6.4 6.4 0 0 1 .8-3.6 11.8 11.8 0 0 0-.1 0zm2-2.2c-.5.2-.7 0-.8.7.5 0 .6-.3.8-.7z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.9 285.3c0 .4.3.6-.2 1.1-.2-.5-.1-.5.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.5 285.9c.2.3.4.5 0 1-.2-.5-.3-.5 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.3 286.2c0 .3.3.6-.2 1-.2-.5-.1-.5.2-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.9 286.6c.1.3.4.6 0 1-.3-.5 0-.5 0-1z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M262.6 287c.1.3.4.6 0 1-.2-.4-.3-.5 0-1zm2-1c-.2.1-.6-.1-.9.5.6 0 .6 0 1-.4z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M264.4 286.5c-.2 0-.6-.2-1 .3.7 0 .7 0 1-.3z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M264.2 286.8c-.3 0-.7-.2-1 .4.6 0 .6 0 1-.4z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.9 287.3c-.3 0-.6-.4-1 .3.4.1.5 0 1-.3z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="M263.4 287.6c-.3 0-.4 0-.8.5.5 0 .5 0 .8-.5zm-3.7 3h1.2c.8 0 1.3.2 1.3.4s-.5.3-1.3.3h-1.2c-.7 0-1.3-.2-1.3-.4s.6-.3 1.3-.3z"/>
  <path fill="#e8a30e" stroke="#000" stroke-width="0" d="m258.9 290.6-.4.6a.3.3 0 0 0 .2 0h.2l.4-.6h-.4zm1 0-.5.7h.5l.4-.7h-.5zm.9 0-.5.7h.5l.4-.7h-.4zm.9 0-.4.7h.5l.3-.6a.3.3 0 0 0-.2 0h-.2z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="m252.3 286.7.5 2.9.2.2v1l.1.2c.3.5.3 1.2.4 1.7 0 .2 0 0 .4.6h.4l.1.2-.2.3h-.7l-.3-.2v-.2l-.2-.1-.1-.6-.8-1c-.1-.2-.1-.5-.3-.6 0-.2-.2-.2-.3-.3-.5-1.1-1-3.1-1-3.1m-6.9-1.2 2 .4-.6 2.8c-.3.9-.3 1-.2 1.2.2.4.4 1.2 1.2 2.3.2.3.5.3.6.4l.5.4h.6l.1-.2c0-.2-.3-.1-.5-.3-.1-.3-.6-.8-.6-1.2-.3-.8-.2-.8-.2-1.6 0-.4.4-1.3.5-1.8a4.6 4.6 0 0 0 .5-2l-.8-2-.5-.6m-1.8-1.2c-3 1-1.7 3.8-.9 3.8m9.8-8.7.5-1v-.4l-.8 1"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M255.1 279.9h.5v-.3l-.1-.4c-.5-.4-1-.4-1-.7v-.2c0-.2-.9-.3-1-.5l-.5-.2h-.3c-.7 0-1 .8-1.2 1.3 0 0-.2 2.3-.6 3.3a.8.8 0 0 1-.1.3l-.2.2-4.5-.3a4 4 0 0 0-2 .8s-1 .7-1.2 1.7c0 .4 0 .8.2 1.2 1 2.7 2 0 2.3 0h.4c.5 0 1.4 1.6 2.8 2 4.3.9 5.5-1.4 5.4-6.3v-.2l.2-.5v-.5l-.1-.3 1.2-.2.2-.1"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="m253 278.5.6-1.2v-.5l-1 1.1v.1m-9.5 8c.3.9.8 1.7.7 2 0 .4-.3.6-.3.7l-.1.1c-.2.1-.2.4-.3.6l-.1.6c0 .8.5 2.4.6 2.4l.3.3v.5l-.1.7v.2l.4.2h.6l-.4-.4a.4.4 0 0 1 0-.3l.3-.4v-.4l-.1-.2a8.8 8.8 0 0 1-.1-1v-1.2l.2-.1.1-.3 1-.6 1-1.1.1-.5a.6.6 0 0 0 0-.2 4 4 0 0 0-.3-1 3.4 3.4 0 0 0-.6-.8m6.3 2c-.6.3-2 .6-2 .9 0 0 0 1.7-.2 2.4l-.3.6-.2.7c-.1.3-.3.6-.3 1v.5l.4.2-.4.2-.7-.3v-.6l.1-.7-.1-.5-.1-1.4v-5m5-5.7c.2.3.5.4 1.3.1.2.1.4.3.7-.2m-.4-.6.3.1c0-.1 0-.2-.1-.1h-.2z"/>
  <path d="m253.6 278.8.1.1c.1.2.4.3.6 0-.3-.3-.5-.1-.6 0z"/>
  <path fill="#e7e7e7" fill-rule="evenodd" stroke="#000" stroke-width=".1" d="M265.7 291.1a2 2 0 0 0 0 .8 2 2 0 0 0 0 .8 2 2 0 0 0 0 .8 2.1 2.1 0 0 0 0 .7c.3.2 1 .2 1.3 0v-.7a2 2 0 0 0 0-.8 2 2 0 0 0 0-.8 2 2 0 0 0 0-.8 2.4 2.4 0 0 0 0-.8 2.2 2.2 0 0 0 0-.8 2.4 2.4 0 0 0 0-.8v-.9a2.5 2.5 0 0 0 0-.8 2.6 2.6 0 0 0 0-.9 2.3 2.3 0 0 0 0-.8 2 2 0 0 0 0-.8 2.7 2.7 0 0 0 0-.9 2.5 2.5 0 0 0 0-.8v-.8a3.1 3.1 0 0 0 0-.9 3.1 3.1 0 0 0 0-.8v-2.5a2.4 2.4 0 0 0-.1-.8v-.8a2.1 2.1 0 0 0 0-.3h-.8v.3c-.1.1-.1.6 0 .8a2.5 2.5 0 0 0 0 .8 2.7 2.7 0 0 0-.1.8 2.9 2.9 0 0 0 0 .8v.9a3.1 3.1 0 0 0 0 .8 3.1 3.1 0 0 0 0 .9 3.5 3.5 0 0 0 0 .8 2.5 2.5 0 0 0-.1.8 2.6 2.6 0 0 0 0 .9c0 .2-.1.5 0 .8a2.4 2.4 0 0 0 0 .8 2.6 2.6 0 0 0 0 .9c-.1.2-.1.5 0 .8a2.8 2.8 0 0 0-.1.9v.8a2.2 2.2 0 0 0 0 .8 2.4 2.4 0 0 0 0 .8z"/>
  <path fill="#e7e7e7" fill-rule="evenodd" stroke="#000" stroke-linejoin="round" stroke-width=".1" d="M265.7 291.9h1.3m-1.3-.8h1.3m-1.2-.8h1.2m-1.2-.8h1.2m-1.2-.9h1.2m-1.2-.8h1.2m-1.2-.8h1.2m-1.1-.9h1m-1-.8h1m-1-.8h1m-1-.9h1m-1-.8h1m-1-.9h1m-1-.8h1m-1-.8h1m-.9-.9h1m-1-.8h1m-1-.8h.9m-.8-.9h.8m-.9-.7h.9m-1.2 16.5h1.3m-1.3.7a2.5 2.5 0 0 0 1.3 0"/>
  <path fill="#007934" fill-rule="evenodd" stroke="#e7e7e7" stroke-width=".1" d="m268.3 274.2 2.2-.1a14.6 14.6 0 0 0-.9-.3h2.4a5.2 5.2 0 0 0-1-.5c.7-.1 1.7 0 2.3.1l-1-.5 2 .1a2.8 2.8 0 0 0-.9-.5 8.6 8.6 0 0 1 2.7-.1 9.2 9.2 0 0 0-8.6.8 6.5 6.5 0 0 1 1-1.2 2.7 2.7 0 0 0-.7 0l1.3-1a3.1 3.1 0 0 0-.8 0l1.5-1a3.3 3.3 0 0 0-.9 0 5 5 0 0 1 1.7-1.1 4.2 4.2 0 0 0-1 0c.5-.4 1.2-1 2.1-1.4-3.5.4-5.5 3-5.7 5.1-.9-2-3.5-4-7-3.8 1 .3 1.9.7 2.5 1.1a4.6 4.6 0 0 0-1 .1c.7.2 1.5.6 2 1a3.6 3.6 0 0 0-.9.1l1.8.8-.8.1 1.6.8a3 3 0 0 0-.8 0l1.4.8c-2.2-.5-5.4.3-7.9 3.1.4-.3 1.9-.8 2.4-1a4 4 0 0 0-.6.9 8.9 8.9 0 0 1 2.2-1.2 5 5 0 0 0-.4.8l2-1-.5.8 1.8-.7-.5.7 1-.3a6.6 6.6 0 0 0-3 6.1c0-.4.6-1.6.9-2v1a9 9 0 0 1 1-2.1l.1 1 1-2.1v1a14.2 14.2 0 0 1 1.2-2v.8l.3-.6.7-1 .3.4c.2.4.5 1.1.5 1.9a3.4 3.4 0 0 0 .3-1c.3.8.7 2 .7 2.6l.2-1c.3.5.7 1.8.7 2.4l.3-1 .6 2.4c.8-3.1-.4-5.2-2-6.7.4.2 1 .6 1.4 1.1a5.2 5.2 0 0 0-.3-1l1.6 1.6a2.9 2.9 0 0 0-.2-1c.7.5 1.2 1.3 1.6 1.7l-.2-1c.6.5 1.2 1.4 1.4 2l-.1-1.2c.8.7 1 1.4 1.3 1.9 0-2.9-3.3-5.4-6.3-5.7z"/>
  <path fill="none" stroke="#e7e7e7" stroke-linecap="round" stroke-linejoin="round" stroke-width=".1" d="M267 274.2c3.4-.4 7.6 2.4 7.6 5.7-.2-.4-.5-1.2-1.4-1.9l.2 1.1a6.5 6.5 0 0 0-1.4-1.9l.2 1c-.4-.4-1-1.2-1.6-1.6l.2.8a15.3 15.3 0 0 0-1.6-1.4l.3 1a6 6 0 0 0-1.3-1.2m-2-1.6c-2-1.3-6.2-1-9.3 2.5.4-.3 1.9-.8 2.4-1a4 4 0 0 0-.5.9 8.9 8.9 0 0 1 2.1-1.2 5.1 5.1 0 0 0-.4.8l2-1-.5.8 1.8-.7-.5.7 1-.4"/>
  <path fill="none" stroke="#e7e7e7" stroke-linecap="round" stroke-linejoin="round" stroke-width=".1" d="M266.4 273.7c-.4-2.4-3.3-5-7.4-4.9 1 .3 1.9.7 2.5 1.1a4.6 4.6 0 0 0-1 .1c.7.2 1.5.6 2 1a3.6 3.6 0 0 0-.9.1l1.8.8-.8.1c.5.1 1.2.5 1.6.8a3 3 0 0 0-.8 0l1.4.8m1.6 1c-2.8.9-5.5 3.6-5.1 7.2 0-.4.6-1.6.9-2v1a9 9 0 0 1 1-2.1l.1 1 1-2.1v1a14.1 14.1 0 0 1 1.2-2v.8c0-.2.9-1.4 1-1.5m-1.7.1a9.3 9.3 0 0 0-.4 1.6m-.6-.9a10.4 10.4 0 0 0-.5 2m-.5-1a9.5 9.5 0 0 0-.6 2"/>
  <path fill="none" stroke="#e7e7e7" stroke-linecap="round" stroke-linejoin="round" stroke-width=".1" d="M266.5 275.9v-.7" class="fil1 str2"/>
  <path fill="none" stroke="#e7e7e7" stroke-linecap="round" stroke-linejoin="round" stroke-width=".1" d="m269.4 278.7.1 1.5m-1.1-3.3.1 1.7m-1.1-2.8.2 1.4m5-.5a3.7 3.7 0 0 1 .6 1.3m-2-2.3.8 1.6m-2.1-2 .7 1.3m-11.3-.9a5 5 0 0 1 1.8-1.2m-.2 1c.4-.6.7-1 1.7-1.4m-.2 1.2c.4-.5 1-1 1.8-1.3m-.4 1.3c.5-.5 1-.8 1.7-1m-4-4.4c.8.1 1.7.3 2.3.7m-1.2.4a5 5 0 0 1 2 .5m-1.2.4c.7 0 1.5.3 2.2.7m-1.4.2a4.1 4.1 0 0 1 1.9.6m.8.2a9.1 9.1 0 0 1 9.2-1.2 8.6 8.6 0 0 0-2.7.1c.5.1.9.4 1 .5-.9-.1-1.2-.2-2.2-.1.5.1.8.3 1.1.5a7.8 7.8 0 0 0-2.3-.1l1 .4h-2.4l1 .4-2.3.1m5.1-1.7a6.4 6.4 0 0 0-2.2-.3m1 .7a6.2 6.2 0 0 0-2.7-.3m1.5.7a7.3 7.3 0 0 0-2.7-.2m1.3.7a5.3 5.3 0 0 0-2.1-.1m.9 1.1c.3.3.6.7.8 1.2"/>
  <path fill="none" stroke="#e7e7e7" stroke-linecap="round" stroke-linejoin="round" stroke-width=".1" d="M266 272.6c.2-2.1 2.2-4.7 5.7-5a9 9 0 0 0-2 1.3h1c-.7.2-1.4.7-1.8 1.2h1c-.6.2-1.2.6-1.5 1h.8c-.4 0-1 .6-1.3.9a2.7 2.7 0 0 1 .7 0c-.5.3-1 .8-1.1 1.2m2.1-4.3c-.5.2-1.1.4-1.6.8m1 .4a4.8 4.8 0 0 0-1.6.5m1 .5c-.6 0-1.1.3-1.6.7m1 .2a3.4 3.4 0 0 0-1.5.8m-.5 2.6a6.4 6.4 0 0 0-.3 1.2m1.3-2.1c2 1.7 4.4 4 3.3 8a8.8 8.8 0 0 0-.6-2.3c0 .4-.2.7-.3 1a7.2 7.2 0 0 0-.7-2.6l-.2 1c0-.6-.4-1.7-.7-2.5a3.4 3.4 0 0 1-.3 1c0-1-.4-1.8-.8-2.2"/>
  <path fill="#e8a30e" stroke="#000" stroke-width=".1" d="m227.5 249 1.4.8.3-.6c.2-.3.2-.5.1-.7 0-.2-.2-.4-.5-.5-.3-.2-.6-.3-.8-.2-.2 0-.3.2-.4.4l-.3.6c0 .1 0 .2.2.3m1.8 1 1.7.9h.3c.1 0 .3-.2.4-.5l.3-.6a.6.6 0 0 0 0-.5.8.8 0 0 0-.2-.2 2 2 0 0 0-.4-.3c-.8-.4-1.4-.3-1.7.4l-.4.7m-2.8-.8a31.7 31.7 0 0 0 .7-1.2c.1-.4.3-.7.6-.9l.6-.4h.9l.5.6.1.8c.3-.3.7-.5 1-.6a1.3 1.3 0 0 1 1 .1c.4.2.7.6.8 1 0 .6 0 1.2-.5 1.9a28 28 0 0 1-.8 1.4l-.3.7a12 12 0 0 0-1.5-1l-1.9-1a12.3 12.3 0 0 0-1.6-.7l.4-.7m9.5-11.5c-.8.6-.7 1.5.4 2.8.5.6 1 1 1.5 1 .5.2 1 0 1.4-.3.4-.3.6-.7.5-1.1a3.3 3.3 0 0 0-.8-1.6c-.6-.7-1.1-1.1-1.6-1.2-.5-.2-1 0-1.4.4m4-.2c.5.6.7 1.4.7 2.1a3 3 0 0 1-1.2 2 3.1 3.1 0 0 1-2.2.9 2.6 2.6 0 0 1-2-1 3 3 0 0 1-.7-2.2 2.9 2.9 0 0 1 1.1-2 3.1 3.1 0 0 1 2.3-1c.7.1 1.4.5 2 1.2m8.5-2.8.3 1a15.2 15.2 0 0 0 2-.7l.4-.1a5.3 5.3 0 0 0 .3.9l-.6.1-2.5.7-.7.2-.4-1.7-.6-2a15 15 0 0 0-.5-1.7l.6-.2.7-.2.4 1.7.6 2m9.8-3 .1-1.8h.8l.7.1-.3 1.8-.2 2-.1 1.8a12 12 0 0 0-.7 0h-.8v-.1l.3-1.7.2-2.2m10.5 5.6a38.2 38.2 0 0 0 3.4-2.8l.4.2.4.2-5 3.8-.5-.3a292.6 292.6 0 0 1 .5-4.7 28.2 28.2 0 0 0 .1-1.4 7.9 7.9 0 0 0 1.4.7 37.1 37.1 0 0 0-.6 4.3m9 4.1a13 13 0 0 0 1.2-1.2l.5.5.5.5-1.4 1.1-1.5 1.5-1.3 1.2a12.3 12.3 0 0 0-.5-.5l-.5-.5 1.4-1.1 1.6-1.5m5.3 10.7a46.2 46.2 0 0 0 1.4-1.5h-2a22.2 22.2 0 0 0 .6 1.5m-1.2-1.5-2 .2a2 2 0 0 0-.2-.4 2.8 2.8 0 0 0-.2-.4 326.8 326.8 0 0 0 6.2 0l.4.6a87.3 87.3 0 0 0-4.2 4.6l-.3-.7a5.7 5.7 0 0 0-.3-.6l1.5-1.4a35.3 35.3 0 0 0-1-1.9" font-family="Linux Biolinum" font-size="100" font-weight="700" letter-spacing="60" style="line-height:125%;text-align:center" text-anchor="middle" word-spacing="0"/>
  <path fill="#e8a30e" stroke="#000" stroke-linecap="square" stroke-linejoin="round" stroke-width=".1" d="m261.3 299.3-.9 2.4H258l2 1.5-.7 2.4 2-1.4 2.1 1.4-.7-2.4 2-1.5H262zm9.7-4.1-.8 2.3h-2.5l2 1.6-.7 2.4 2-1.5 2 1.5-.7-2.4 2-1.5h-2.5zm15-26.7-.8 2.4h-2.5l2 1.6-.7 2.3 2-1.4 2.1 1.4-.7-2.4 2-1.4-2.5-.1zm-7.1 19 .8 2.4h2.5l-2 1.5.8 2.4-2.1-1.4-2 1.4.7-2.4-2-1.4 2.5-.1zm5-8.7.9 2.4h2.5l-2 1.6.7 2.3-2-1.4-2.1 1.4.7-2.3-2-1.5h2.5zm-33.1 20.5.8 2.4h2.5l-2 1.5.7 2.4-2-1.4-2.1 1.4.7-2.4-2-1.5h2.5zm-9.8-4.1.8 2.3h2.5l-2 1.6.8 2.4-2.1-1.5-2 1.5.7-2.4-2-1.5h2.5zm-15-26.7.8 2.4h2.5l-2 1.5.7 2.4-2-1.4-2 1.4.6-2.4-2-1.5h2.5zm7.1 19-.8 2.4h-2.5l2 1.5-.7 2.4 2-1.4 2 1.4-.7-2.4 2-1.5H234zm-5-8.7-.9 2.4h-2.5l2 1.6-.7 2.3 2-1.4 2.1 1.4-.7-2.3 2-1.5h-2.5z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M257.1 264.6v-.5h.1l-.9-.5h-.7l-.8.5v.5h2.3"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M257.1 264.6v-.5h.1l-.9-.5v-.8h-.6v.8l-1 .5h.1v.5h2.3zm.3.7v.2h-2.8v-.2h2.8"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M257.4 265.3v.2h-2.8v-.2h2.8zm-2.6 0v-.6.6-.7h2.5v.1h-.2v.6-.6h.1v.6"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M254.8 265.3v-.6.6-.7h2.5v.1h-.2v.6-.6h.1v.6"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M255.3 265.2v-.4h-.3v.4h.3"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M255 264.9v.2h.2v-.2h-.1m1.9.3v-.4h-.4v.4h.4"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M256.7 264.9v.2h.2v-.2h-.2m.3-.3v-.4h-.4v.4h.4z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M256.7 264.3v.2h.2v-.2h-.2m-1.4.2v-.3h-.3v.3h.3z"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M255 264.3v.2h.2v-.2h-.1m.8.2v-.3h-.3v.4h.3"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M255.7 264.3v.2h.1v-.2h-.1m.7.2v-.3h-.3v.4h.3"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M256.1 264.3v.2h.2v-.2h-.2"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M256.5 264.4v1h-1v-1h1"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M256.5 264.4v1h-1v-1h1zm-1 .3h1m-.9.6v-.6m.8.6v-.6m.5-.6-.6-.4h-.6l-.6.4h1.8m-1.2-.5h.5m-.3-.2v.2h.2v-.2h-.2m-.3 1v.1m.3 0zm.1 0h.1zm.4 0"/>
  <path fill="#e7e7e7" fill-rule="evenodd" stroke="#000" stroke-width="0" d="M255.8 262.4h.4v.4h-.4v-.4z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M256 262v.4m-.2-.3h.4"/>
  <path fill="#452c25" d="M253 224.3s-2.6 5.8-1.7 6.4c0 0 3.1-3.5 4-6.3.8-2.8 0-.2 0-.2l-.3-3-2 2.9"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M253 224.3s-2.6 5.8-1.7 6.4c0 0 3.1-3.5 4-6.3.8-2.8 0-.2 0-.2l-.3-3-2 2.9"/>
  <path fill="#452c25" d="M253.5 221.6s-3 6.4-2.3 6.8c0 0 2.5-2.9 3.1-5.1.7-2.3 0-.2 0-.2l.8-4.1"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M253.5 221.6s-3 6.4-2.3 6.8c0 0 2.5-2.9 3.1-5.1.7-2.3 0-.2 0-.2l.8-4.1"/>
  <path fill="#452c25" d="M256.6 220.1s-3 6.4-2.4 6.9c0 0 2.6-2.9 3.2-5.2.7-2.3 0-.1 0-.1l.8-4.1"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M256.6 220.1s-3 6.4-2.4 6.9c0 0 2.6-2.9 3.2-5.2.7-2.3 0-.1 0-.1l.8-4.1"/>
  <path fill="#452c25" d="m295.3 208.7 3.6 2s.8.7-1 .3c-2-.5-6-1.9-13.7-6.8-3.5-2.2-4.6-2.2-4.6-2.2l4.8.2 10.9 6.5z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m295.3 208.7 3.6 2s.8.7-1 .3c-2-.5-6-1.9-13.7-6.8-3.5-2.2-4.6-2.2-4.6-2.2l4.8.2 10.9 6.5z"/>
  <path fill="#452c25" d="m296.5 207.8 3.5 2s.9.7-1 .3c-2-.4-6-1.8-13.7-6.8-3.4-2.2-.7 1.9-.7 1.9l.6-2.7 11.3 5.3z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m296.5 207.8 3.5 2s.9.7-1 .3c-2-.4-6-1.8-13.7-6.8-3.4-2.2-.7 1.9-.7 1.9l.6-2.7 11.3 5.3z"/>
  <path fill="#452c25" d="M302.4 209.7s-4.3-.8-5.8-2c0 0 .3.6-1.8-.4 0 0 .8 1.9-5-2.1-6-4-3.9-2-3.9-2l1.7-.4 10 4c1 .3 4.8 3 4.8 3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M302.4 209.7s-4.3-.8-5.8-2c0 0 .3.6-1.8-.4 0 0 .8 1.9-5-2.1-6-4-3.9-2-3.9-2l1.7-.4 10 4c1 .3 4.8 3 4.8 3z"/>
  <path fill="#452c25" d="m280.1 211.3 1.5 2s-.5 2-5.4-1.8l-4.7-3.4 2.7-.3 6 3.4"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m280.1 211.3 1.5 2s-.5 2-5.4-1.8l-4.7-3.4 2.7-.3 6 3.4"/>
  <path fill="#452c25" d="M273.7 212.3s2.3 3 1.8 3.4c-.5.4-3.2.2-5.2-2.7-1.9-3 0-.2 0-.2l.2-4.7 3.3 4"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M273.7 212.3s2.3 3 1.8 3.4c-.5.4-3.2.2-5.2-2.7-1.9-3 0-.2 0-.2l.2-4.7 3.3 4"/>
  <path fill="#452c25" d="M276 211s2.3 2.8 2 3.2c-.2.5-3.3.2-5.8-2.6-2.5-2.8-.4-3.7-.4-3.7l4.2 2.9"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M276 210.9s2.3 2.9 2 3.3c-.2.5-3.3.2-5.8-2.6-2.5-2.8-.4-3.7-.4-3.7l4.3 3z"/>
  <path fill="#452c25" d="M288.7 209.3s6.3 2.7 1.6 2.5c0 0-9.1-2.5-13.9-6.5l1.4-1.8 10.8 5.6"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M288.7 209.3s6.3 2.7 1.6 2.5c0 0-9.1-2.5-13.9-6.5l1.4-1.8 10.8 5.6"/>
  <path fill="#452c25" d="M292 208.5s3.4 2 3.7 2.8-10.6-2-16.4-6.8l2.6-1.2 10.1 5.2z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M292 208.5s3.4 2 3.7 2.8-10.6-2-16.4-6.8l2.6-1.2 10.1 5.2z"/>
  <path fill="#452c25" d="M282.1 210.3s2.5 2 2.2 2.3a17 17 0 0 1-9.2-3.5l.4-1.8 6.6 3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M282.1 210.3s2.5 2 2.2 2.3a17 17 0 0 1-9.2-3.5l.4-1.8 6.6 3"/>
  <path fill="#452c25" d="M286.3 210.2s2.4 1.7 2 1.8c-.6.2-2.5 1.7-11.5-3.6l-1.1-.6 1.4-2.2 9.2 4.4"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M286.3 210.1s2.4 1.8 2 2c-.6.1-2.5 1.6-11.5-3.7l-1.1-.6 1.4-2.2 9.2 4.5z"/>
  <path fill="#452c25" d="M277 205.2s3 2.6 2.6 3c-.4.4-3.9-.4-5.5-1.6-1.5-1.1-2.6-2.6-2.6-2.6l3.3-.7 2.2 2z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M277 205.2s3 2.6 2.6 3c-.4.4-3.9-.4-5.5-1.6-1.5-1.1-2.6-2.6-2.6-2.6l3.3-.7 2.2 2z"/>
  <path fill="#452c25" d="m273.5 200.8 5.4 3.2s4.4 3.1 3.9 3.4c-.5.2-4-.8-6.4-2.2a29.5 29.5 0 0 1-5.3-4.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m273.5 200.8 5.4 3.2s4.4 3.1 3.9 3.4c-.5.2-4-.8-6.4-2.2a29.5 29.5 0 0 1-5.3-4.2"/>
  <path fill="#452c25" d="M270.1 216s1 2.5.4 2.7c-.6.2-2-.2-3.3-2.5-1.1-2.4 1-1.4 1-1.4l2 1.1z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M270.1 216s1 2.5.4 2.7c-.6.2-2-.2-3.3-2.5-1.1-2.4.9-1.3.9-1.3l2 1z"/>
  <path fill="#452c25" d="M271.9 214.3s1.5 2.4 1.2 2.7c-.4.3-2.3 1.2-4.5-2s2.2-2.5 2.2-2.5l1 1.8z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M271.9 214.3s1.5 2.4 1.2 2.7c-.4.3-2.3 1.2-4.5-2s2.2-2.5 2.2-2.5l1 1.8z"/>
  <path fill="#452c25" d="M267.4 203s5.1 10 4.7 10.5c-.4.5-2.5 0-3.6-2.6a53.3 53.3 0 0 1-2-6l1-1.8z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M267.4 203s5.1 10 4.7 10.5c-.4.5-2.5 0-3.6-2.6s-2-6-2-6l1-1.8z"/>
  <path fill="#452c25" d="M273.4 205.6s4.2 3.6 3.4 4c-1 .5-2.6-.1-5.1-2.6-2.5-2.5 1.6-1.6 1.6-1.6"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M273.4 205.5s4.3 3.7 3.4 4.2c-1 .5-2.6-.2-5.1-2.7-2.5-2.5 1.7-1.5 1.7-1.5z"/>
  <path fill="#452c25" d="M271.3 205.7s3 5.6 2.7 6c-.4.6-2.7-1.3-3.8-2.7s-2-3.5-2-3.5"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M271.3 205.7s3 5.6 2.7 6c-.4.6-2.7-1.3-3.8-2.7s-2-3.5-2-3.5"/>
  <path fill="#452c25" d="M248.4 217.2v3.5c.1.2 1.9.3 2-2.2 0-2.5-.4-2.6-.4-2.6l-1.6 1.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M248.4 217.2v3.5c.1.2 1.9.3 2-2.2 0-2.5-.4-2.6-.4-2.6l-1.6 1.2"/>
  <path fill="#452c25" d="M249.4 213.2s-1.1 3.7 0 4.4c1.1.8 2-3.6 2-4.6.1-1-2 .2-2 .2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M249.4 213.2s-1.1 3.7 0 4.4c1.1.8 2-3.6 2-4.6.1-1-2 .2-2 .2z"/>
  <path fill="#452c25" d="M250.2 218s.3 3.4.9 3.5c.6.2 1.7-1 1.7-1.9 0-.9-1.1-3-1.1-3l-1.5 1.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M250.2 218s.3 3.4.9 3.5c.6.2 1.7-1 1.7-1.9 0-.9-1.1-3-1.1-3l-1.5 1.2"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M250.3 213.8s-1.2 3.7 0 4.4c1 .8 2-3.6 2-4.6 0-1-2 .2-2 .2z"/>
  <path fill="#452c25" d="M250.4 207.8s-1.8 1.8-1.7 2.8c0 1 2.5-1.3 2.8-1.8.2-.4-1.1-1-1.1-1"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M250.4 207.8s-1.8 1.8-1.7 2.8c0 1 2.5-1.3 2.8-1.8.2-.4-1.1-1-1.1-1z"/>
  <path fill="#452c25" d="M249.2 206.8s-1.4 2.6-1 3.3c.3.8 1.7-.5 2.3-1.4.6-1-1.3-1.8-1.3-1.8"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M249.2 206.8s-1.4 2.6-1 3.3c.3.8 1.7-.5 2.3-1.4.6-1-1.3-1.8-1.3-1.8z"/>
  <path fill="#452c25" d="M268.3 203.5s2.1 4.1 1.5 4.3c-.6.2-1.5-.8-2.4-2-.9-1.2.9-2.3.9-2.3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M268.3 203.5s2.1 4.1 1.5 4.3c-.6.2-1.5-.8-2.4-2-.9-1.2.9-2.3.9-2.3z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M268.3 211.9s.8 3.4.1 3.7c-1.3.7-2-2.4-2.2-3.6 0-1.2 2.1-.1 2.1-.1zm-2.7 5.4s.2 2.6-.2 2.8c-.3.3-1.2.3-2.3-1.8-1-2.2-.5-1.4-.5-1.4l2.5-1.2.5 1.4"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M268.1 216.7s.3 2.8-.2 2.8c-.6.1-2-.8-2.7-2.4-.7-2 2.6-1.4 2.6-1.4l.3 1z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M265.6 208.4s2.7 6.2 2.3 7.1c-.9 1.8-3.4-3.8-4.2-6-.8-2.4 1.9-1.1 1.9-1.1z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M264.3 209.4s3.8 7 2.1 7c-1.5.2-4.5-5-5-6.1-.5-1.2 2.9-.9 2.9-.9z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M264 210.8s1.9 6.6.7 6c-1.2-.5-2.7-5.5-2.9-6.6-.2-1 2.2.7 2.2.7zm6.6-9.4s3 4.5 2 4.6c-1 .1-4.4-3-4.4-3.5s2.4-1 2.4-1z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M268.8 201.7s3.7 5 2.6 5.2c-1.1.3-1.2-.5-1.2-.5s-3-2.7-3.1-3.3c-.3-.7 1.6-1.5 1.6-1.5m3.8.1s2.5 2.6 1.8 3.5c-.6 1-4.2-3.3-4.6-3.8-.5-.6 3 .2 3 .2m-6.4 3.8s4.1 8 3.3 8.7c-.7.8-5.3-6-5.4-7-.2-.9 2.2-1.9 2.2-1.9"/>
  <path fill="#452c25" stroke="#000" stroke-width=".2" d="M264 206s1.6 2.6 1.5 4c0 1.3-2.5-2-2.7-2.6-.2-.6 1.2-1.3 1.2-1.3z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M267.3 204.8s1.3 2.6.9 3.3c-.4.8-2.1-1.5-2.7-2.4-.6-1 1.8-1 1.8-1z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".2" d="M261.4 207.3s2 2.2 2 3.4c-.2 1.2-3-1.7-3.3-2.3-.3-.5 1.3-1 1.3-1z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M274.3 201s3 2.6 2.6 3c-.5.5-4.6-2.4-5.2-3-.6-.6 2.6 0 2.6 0z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="m271.8 200.7 2.3 2s2.2 1.5 1.8 1.9c-.3.3-3.8-1.2-4.4-2-.6-.6-.5-1.4-.5-1.4l.8-.5zm7.7.7s9 3.6 8.6 4.5c-.3.8-9.3-3-10.8-4s2.1-.6 2.1-.6"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M279.9 202.5s6.7 3.8 5.9 4.1c-.8.4-5.6-.9-8-2.6a38.4 38.4 0 0 1-3.6-2.6l3-.7 2.7 1.8zm-16.6 4.6s1.3 2.6 1 3.3c-.5.8-1.7-.6-2.3-1.5-.6-1 1.3-1.8 1.3-1.8zm.3 5.8s1.1 3.7 0 4.4c-1.2.7-2-3.7-2-4.7s2 .3 2 .3z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M258.4 206.7s3.8-1.6 4.5-1.5c0 0 .7-.2 1.1-.5l1.4-1.1s-.6-4.5 4.1-4l12.3 1.2a48 48 0 0 1 7 2c1 .5 8.1 3.7 9.6 4.2.8.3 2.7 1.5 4.1 2.4 1 .7 0 .2 0 .2s-11.5-6-15.5-6.9c-1-.2 0 1.2 0 1.2l-3.6-1.5a6.3 6.3 0 0 0-3-.6 6.2 6.2 0 0 1-2.4-.3c-.6-.2-4-.3-4.7-.4a7.8 7.8 0 0 1-1-.2l.2.4-1.7-.3-.5.8s-1.6.3-1.7-.2c-.2-.6-1 2.3-1.4 3.2-.4.8-2 .8-2.5 1.3a5.4 5.4 0 0 1-1 1c-.2.2-1.5.9-1.9.9l-3 .2-.7-1 .3-.5zm5 10.6s0 3.3-.2 3.6c-.2.2-1.8.1-1.8-2.3 0-2.5.4-2.6.4-2.6l1.6 1.2"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M263.8 214.8s-.4-1.4-.6-1.6c-.2-.2.1-.4.1-.4s-.6-1.5-1-1.7c-.3-.3.1-.5.1-.5s-.6-1-1-1.2c-.5-.3 0-.4 0-.4s-.6-1.3-1.7-2c0 0-.7-.7-1.4-1-.8-.1-2.6-.3-4.9-.3a4 4 0 0 0-3.3 1.7l-.2 1.9.4-.2-.5 2.3c-.1.6.4 1.5.4 2.6a11 11 0 0 0 .9 4.2l.1.3c.1-.2.4.6.6 1 0 0 .1 1.1.2.7.1-.2.5.6.7 1.2 0 .2.5 1.5.5.9 0-.7.4 1.3.4 1.6l.6-.8.2 1 .5-.1-.2.8s1.3-1 1.3-1.4l.1-.7.4-.4.7-1s1.6 1.2 1.8 1.7l.3.8.4-.4.4 1 .2-.5.2.6.2.4c.1 0 .4.1.8-.7.7-1.1.7-2 .7-2.2 0-.2.3.4.3.4s.6-1.1.5-1.8c0-.7.4-.5.4-.5V218c-.1-.5.3-.4.3-.4s-.1-2.2-.3-2.4c0-.3.4-.3.4-.3z"/>
  <path d="M260.6 209.8c.3 0 .5.4.6.7v-.1c-.1-.3-.3-.7-.6-.8v.2m.3 1.3c.6.5.6 1.2.6 2 0 0 0 .1 0 0 0-.8 0-1.6-.6-2.1v.1m1.2.7a3.2 3.2 0 0 1 .4 1.8c0-.7 0-1.3-.4-2v.2m.4 2.6-.1 1.1a.5.5 0 0 0 0 .2 11.8 11.8 0 0 0 .1-1.3m-.4 2v.7a4.1 4.1 0 0 0 0-.8m-.7-2.4a15.3 15.3 0 0 0 0 1.2 14.3 14.3 0 0 1 0-1.2m1.5 2.4a1.2 1.2 0 0 1 .3.6 1.2 1.2 0 0 0-.3-.7v.1m-.1-2.8.4.5a3.3 3.3 0 0 0-.4-.6v.1m-1.5 2.1a6.4 6.4 0 0 1-.1 1.1.4.4 0 0 0 0 .1 6.9 6.9 0 0 0 0-1.2m-.7.8a5.7 5.7 0 0 1 0 1.1 6.6 6.6 0 0 0 0-1.2v.1"/>
  <path fill="#452c25" d="M246.1 207.3s-.9 3.4-.2 3.7c1.3.7 2.2-2.3 2.3-3.5.1-1.3-2-.2-2-.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M246.1 207.3s-.9 3.4-.2 3.7c1.3.7 2.2-2.3 2.3-3.5.1-1.3-2-.2-2-.2z"/>
  <path fill="#452c25" d="M248 207.3s-1.6 1.7-1.6 2.7c0 1 2.5-1.3 2.8-1.8.2-.4-1.1-1-1.1-1"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M248 207.3s-1.6 1.7-1.6 2.7c0 1 2.5-1.3 2.8-1.8.2-.4-1.1-1-1.1-1z"/>
  <path fill="#452c25" d="M218.7 207.5s-3.5 1.8-3.8 2.5c-.4.8 10.7-1.1 16.7-5.4l-2.4-1.4-10.5 4.3z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M218.7 207.5s-3.5 1.8-3.8 2.5c-.4.8 10.7-1.1 16.7-5.4l-2.4-1.4-10.5 4.3z"/>
  <path fill="#452c25" d="M222.9 208.2s-6.5 2.4-1.8 2.5c0 0 9.3-2 14.2-5.7l-1.2-1.9-11.1 5"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M223 208.2s-6.6 2.4-1.9 2.5c0 0 9.3-2 14.2-5.7l-1.2-1.9-11.2 5z"/>
  <path fill="#452c25" d="M232.4 201.7s-6.8 3.5-6 3.9c.7.4 5.6-.7 8.1-2.3 2.6-1.6 3.6-2.5 3.6-2.5l-3-.8-2.7 1.7z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M232.4 201.7s-6.8 3.5-6 3.9c.7.4 5.6-.7 8.1-2.3 2.6-1.6 3.6-2.5 3.6-2.5l-3-.8-2.7 1.7z"/>
  <path fill="#452c25" d="M229.8 209.4s-2.4 2-2.1 2.2c.3.3 5.3-.5 9.2-3.6l-.5-1.8-6.6 3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M229.8 209.4s-2.4 2-2.1 2.2c.3.3 5.3-.5 9.2-3.6l-.5-1.8-6.6 3"/>
  <path fill="#452c25" d="M225.6 209s-2.3 1.9-1.8 2c.5.2 2.5 1.6 11.2-4.2l1-.6-1.5-2.2-9 4.9"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M225.6 209s-2.3 1.8-1.8 2c.5.2 2.5 1.6 11.2-4.2l1-.6-1.5-2.2-8.9 5z"/>
  <path fill="#452c25" d="M223.8 202.2A72.3 72.3 0 0 0 209 210l19-7.6m12 11.4s-1.6 2.4-1.3 2.7c.3.3 2.3 1.2 4.6-1.9 2.2-3-2.2-2.6-2.2-2.6l-1.1 1.8z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M240 213.8s-1.6 2.4-1.3 2.7c.4.3 2.3 1.2 4.6-1.9 2.2-3.1-2.2-2.6-2.2-2.6l-1.1 1.8z"/>
  <path fill="#452c25" d="M241.7 215.5s-1 2.5-.5 2.8c.6.2 2.1-.2 3.4-2.5s-.6-1-.6-1l-2.3.7zm-3.5-3.8s-2.4 3-1.9 3.4c.5.4 3.2.3 5.3-2.6 2-2.8 0-.1 0-.1l-.6-2.6-2.8 1.8"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M241.7 215.5s-1 2.5-.5 2.8c.6.2 2.1-.2 3.4-2.5s-.6-1-.6-1l-2.3.7zm-3.5-3.8s-2.4 3-1.9 3.4c.5.4 3.2.3 5.3-2.6 2-2.8 0-.1 0-.1l-.6-2.6-2.8 1.8"/>
  <path fill="#452c25" d="M236 210.3s-2.4 2.7-2.2 3.2c.3.4 3.4.3 6-2.4 2.6-2.8.5-3.7.5-3.7L236 210"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M236 210.3s-2.4 2.7-2.2 3.2c.3.4 3.4.3 6-2.4 2.6-2.8.5-3.7.5-3.7L236 210"/>
  <path fill="#452c25" d="m231.8 210.5-1.5 2s.5 1.9 5.5-1.6l4.8-3.2-2.7-.5-6.1 3.1"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m231.8 210.4-1.4 2s.4 2 5.4-1.5l4.8-3.2-2.7-.5-6 3.2z"/>
  <path fill="#452c25" d="m215.7 207.4-3.3 1.5s-.7.6 1.2.7a41.8 41.8 0 0 0 17.6-7.7l-2.5-1-13 6.5z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m215.7 207.4-3.3 1.5s-.7.6 1.2.7a41.8 41.8 0 0 0 17.6-7.7l-2.5-1-13 6.5z"/>
  <path fill="#452c25" d="M210.2 209.5s4.6-.5 6.4-1.7c0 0-.3.5 2-.4 0 0-1.2 2.1 5.7-2 7-4.3 0-.2 0-.2l7.8-4.4-.5-.8-15.7 6.6a58 58 0 0 0-5.7 2.9"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m224.4 205.3 7.6-4.5-.4-.8-15.7 6.6c-1.1.3-5.7 2.9-5.7 2.9s4.6-.5 6.4-1.7c0 0-.3.5 2-.4 0 0-1.1 2 5.8-2.1z"/>
  <path fill="#452c25" d="M243.8 215.4s-.5 3.7 0 3.8c.6.1 2.1-1 2.8-3.3.6-2.2-2.5-2-2.5-2l-.5 1.4"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M243.8 215.4s-.5 3.7 0 3.8c.6.1 2.1-1 2.8-3.3.6-2.2-2.5-2-2.5-2l-.5 1.4"/>
  <path fill="#452c25" d="M246.2 217s-.3 2.6 0 2.9c.4.2 1.3.3 2.4-1.8l.6-1.3-2.5-1.4-.5 1.4"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M246.2 217s-.3 2.6 0 2.9c.4.2 1.3.3 2.4-1.8l.6-1.3-2.5-1.4-.5 1.5z"/>
  <path fill="#452c25" d="M246.8 212.3s-2 4.3-.8 4.3c1.1 0 2.6-3.3 2.9-4 .2-.8-2-.3-2-.3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M246.8 212.3s-2 4.3-.8 4.3c1.1 0 2.6-3.3 2.9-4 .2-.8-2-.3-2-.3z"/>
  <path fill="#452c25" d="M246.7 212.3s-.8 4.7.3 4.3c1-.4 1.7-4 1.7-4.8 0-.7-2 .4-2 .4"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M246.7 212.3s-.8 4.7.3 4.3c1-.4 1.7-4 1.7-4.8 0-.7-2 .4-2 .4z"/>
  <path fill="#452c25" d="M248.3 212.7s-1.2 3.7 0 4.5c1 .7 2-3.7 2-4.7s-2 .2-2 .2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M248.3 212.7s-1.2 3.7 0 4.5c1 .7 2-3.7 2-4.7s-2 .2-2 .2z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M243.7 211.5s-1.2 3.4-.5 3.8c1.3.6 2.4-2.4 2.5-3.5.2-1.3-2-.3-2-.3zm-8.5-7s-3 2.5-2.7 2.9c.4.4 4-.3 5.5-1.4 1.6-1 2.2-1.6 2.2-1.6l-2.7-1.7-2.3 1.8z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M237.9 202s-2 1.5-1.6 1.9c.3.4 3.8-1 4.5-1.7.6-.7.6-1.4.6-1.4l-3.5 1.1z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M239.9 201.7s-2.7 2.2-2 3c.6.7 4.3-2.8 4.8-3.2.5-.5-3.1 0-3.1 0"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="m238.7 200.7-5.3 2.5s-4.5 3-4 3.2c.4.3 3.9-.6 6.4-1.9 2.5-1.2 5.2-3.3 5.2-3.3m-.8 2.4s-5.8 4.9-5 5.4c1 .5 4.8-1.6 7.4-4"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M240.9 205.2s-3.3 5.5-2.9 6c.4.6 2.7-1.3 3.9-2.7 1.2-1.3 2.1-3.4 2.1-3.4"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M242.8 205.7s-3.6 6.5-3.2 7c.4.6 2.5.2 3.7-2.4 1.2-2.6 1.1-4.2 1.1-4.2l-1.6-.4z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M244.8 206s-3.9 8-3.1 8.8c.7.8 5-6 5.3-7 .3-1.8-2.2-2-2.2-2m-8.2-5.2s-3.6 1.7-2.8 2c.7.4 4-1 4.4-1.2.5-.2-1.6-.8-1.6-.8z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M237.1 201.2s-2.2 1.7-1.7 2.2c.4.4 3.7-1.4 4.4-2 .6-.5-2.7-.2-2.7-.2zm4.6.1s-3 4-2.1 4.2c1 .1 4.4-2.6 4.4-3 0-.5-2.3-1.2-2.3-1.2z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M243 202.2s-3.2 4-2.3 4.3c1 .2 1-.4 1-.4s2.5-2.1 2.7-2.6c.2-.6-1.3-1.3-1.3-1.3"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M244 203.2s-2.3 4-1.7 4.2c.6.2 1.5-.7 2.5-2 1-1.1-.8-2.2-.8-2.2z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M244.6 205s-1.4 2.5-1 3.3c.3.8 1.7-.6 2.3-1.5.6-.9-1.3-1.8-1.3-1.8zm.6 7s-1 3.4-.3 3.7c1.4.7 2.2-2.3 2.3-3.5.2-1.3-2-.2-2-.2z"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M251.4 207.4s-1-.3-1.6-.3c0 0-2-1.6-3-1.8-1.2-.1-.3-.1-.3-.1s0-2.6-.4-2.8c0 0-.2-2.7-1.8-2.9-1.7-.2-5.5.2-6.2 0-.6-.3-2.7-1.2-6.7-.1-4 1-12 4.6-12.3 4.7-.4.1 9-2 11.8-3.2 0 0 2.6-.2 3.4-.5 0 0-3 1.5-.2.9 2.8-.7 2.2 0 2.2 0s-.3.6 1.3.2c1.6-.3 1.6 0 1.6 0s1.8.7 3.2-.2c0 0 .7 2.6 1.6 3 0 0 1.1 2.2 3.4 2.7l1.3.9 1.3.4 1.3-1"/>
  <path fill="#452c25" stroke="#000" stroke-width=".1" d="M232.8 200.6s-9 3.2-8.7 4c.3 1 9.4-2.4 10.9-3.4 1.4-.9-2-.7-2-.7"/>
  <path d="m257.9 207.6.6.2a1.6 1.6 0 0 0-.4-.4l-.7-.3.1.2.4.3m-7 6.8c0 .3 0 .6.2.8v-.1c-.1-.3-.1-.6-.3-.8v.1m1.3-7 .9-.1v-.2c-.3 0-.6 0-1 .2v.1m1.9-.1.9-.2v-.1a2 2 0 0 0-1 .2m-3 1.7h-.1a.3.3 0 0 0 0 .2v-.2m-.2 4.9v.7a.3.3 0 0 0 0-.1 4.3 4.3 0 0 1 0-.6c0-.1 0-.1 0 0"/>
  <path fill="#bd8759" d="m252.4 228.2-1.2 1.1a4 4 0 0 0-.1.7s.9 0 .8.4c0 0 .3.2.8-.9.4-1 .9-1.6 1.2-1.5.3 0 .8.3 1 .6.2.2.5.4.9.3 0 0-.4-.6-.2-.8h.7s-.4-.8-1-1c-.7 0-1.2-.2-1-.5l1-2.6-1.1-1.6-.5 1.4.2 1c0 .3-1 2.2-1 2.3l-3 1.2c-.2 0-.8.8-.8.8v.5s.3-.3.5-.1c0 0 .2-.4.5-.3l.2.2.5-.4.1-.1.6-.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m252.4 228.2-1.2 1.1a4 4 0 0 0-.1.7s.9 0 .8.4c0 0 .3.2.8-.9.4-1 .9-1.6 1.2-1.5.3 0 .8.3 1 .6.2.2.5.4.9.3 0 0-.4-.6-.2-.8h.7s-.4-.8-1-1c-.7 0-1.2-.2-1-.5l1-2.6-1.1-1.6-.5 1.4.2 1c0 .3-1 2.2-1 2.3l-3 1.2c-.2 0-.8.8-.8.8v.5s.3-.3.5-.1c0 0 .2-.4.5-.3l.2.2.5-.4.1-.1.6-.2"/>
  <path fill="#bd8759" d="M259.3 223.1v2.3c0 .4 0 .9-.2 1.2-.2.3-.4.5-.7.5s-1.2 0-1.4.3a5.4 5.4 0 0 1-.3.5s.6-.4.6 0c.1.3-.2.5-.2.5s.5.1 1-.1c.4-.3.7-.4.9-.4.2 0 .4.3.4.3v1c0 .5 0 1.3.4 1.3 0 0 .1-.4.3-.5.2 0 .6.4.5.6v-1.4l-.3-1s1.4.5 1.5.7l.6.4c.1 0 0-.5.3-.5h.3s-.4-.9-1-1.2l-1.3-.5c-.2-.3-.3-.6-.3-1v-3l-1-.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M259.4 223v2.4c0 .4 0 .9-.3 1.2-.2.3-.4.5-.7.5s-1.2 0-1.4.3a5.2 5.2 0 0 1-.3.5s.6-.4.6 0c.1.3-.2.5-.2.5s.5.1 1-.1c.4-.3.7-.4.9-.4.2 0 .4.3.4.3v1c0 .5 0 1.3.4 1.3 0 0 .1-.4.3-.5.2 0 .6.4.5.6v-1.4l-.3-1s1.4.5 1.5.7l.6.4c.1 0 0-.5.3-.5h.3s-.4-.9-1-1.2l-1.3-.5c-.2-.3-.3-.6-.3-1v-3l-1-.1z"/>
  <path fill="#dcddde" d="M250.7 210.5s-.1-1.4.3-1.6c0 0 .1-1.2 1.8-1 0 0 .6-1 1.5-.5 0 0 .8-.4 1.3-.2a5 5 0 0 1 1.2.8s.7-.1 1 .1c.4.3.2 1.2.2 1.2s.9.6 1 1.2c0 .5 0 .7-.2.9 0 0 .4.3.3.7 0 .4-.4 1-.5 1s0 1.1-.3 1.5c-.4.4-.7.4-.9.5-.1 0-.5.6-1 .7-.3 0-.8-.6-.9-.8 0-.2-.5-.4-.5-.4s-1.2 1.3-2 1a2 2 0 0 1-1.2-1l-.3-1s-1-.5-.8-1c0-.5.4-1 .4-1l-.4-1.1z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M253.7 226a.3.3 0 0 1-.3 0m.7-1a.8.8 0 0 1-.4 0m0 .6h.2m-1 1.5a.3.3 0 0 0 .1.1m6.9-1 .5.1m-.2-.6h-.4m.4-.6a1 1 0 0 1-.4 0m-.1 2 .4.1m-.4.5a.2.2 0 0 1 .2 0m0 1.7a.4.4 0 0 1 .2 0m-5.4-2.2a.4.4 0 0 0-.3.3m1.1-.2c-.2.1-.3.3-.3.5m-4.9.4.5.3m10.5-1a.4.4 0 0 0-.2.3m.8 0a.2.2 0 0 0-.1.1"/>
  <path fill="#d9c0b9" d="m249 229.4.6-.1s-.3.7-.2 1c0 0-.6-.4-.4-.9"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m249 229.4.6-.1s-.3.7-.2 1c0 0-.6-.4-.4-.9z"/>
  <path fill="#d9c0b9" d="M251.3 229.8s-.7 1.1.1 1.7c0 0 0-1 .6-1.3l-.8-.3z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M251.3 229.8s-.7 1.1.1 1.7c0 0 0-1 .6-1.3l-.8-.3z"/>
  <path fill="#d9c0b9" d="m255.6 228.8-.2-.6.2-.2h.6s.4.9 0 1.3c0 0 0-.5-.2-.5h-.4"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m255.6 228.8-.2-.6.2-.2h.6s.4.9 0 1.3c0 0 0-.5-.2-.5h-.4z"/>
  <path fill="#d9c0b9" d="M257 227.6h.4l.1.4v.3l-.4.2s-.5-.2-.4.5c0 0-.2-1.2.3-1.4"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M257 227.6h.4l.1.4v.3l-.4.2s-.5-.2-.4.5c0 0-.2-1.2.3-1.4z"/>
  <path fill="#d9c0b9" d="m259.7 230.3.4-.5.4.3-.2 1.2v.1l-.3-.3-.3-.8"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m259.7 230.3.4-.5.4.3-.2 1.2v.1l-.3-.3-.3-.8z"/>
  <path fill="#d9c0b9" d="M262.3 229.1s.7.8.6 1c0 0 .7-.6-.2-1.5l-.4.5z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M262.3 229.1s.7.8.6 1c0 0 .7-.6-.2-1.5l-.4.5z"/>
  <path d="M259.5 209c.1 0 .2 0 .3.2v-.1c0-.2-.2-.3-.3-.3v.1m.1 2.3.5.7v-.1a1.8 1.8 0 0 0-.5-.8v.2m-.4-1.7.5.6v-.1l-.5-.6v.1m.5 3.7-.1 1a2 2 0 0 0 .1-1.1.4.4 0 0 0 0 .1m.5 1.2v-.1m2 4.1a5.1 5.1 0 0 1 .1 1.4l-.1-1.5v.1m-.3 1a7.9 7.9 0 0 1-.4.9v.1a7.8 7.8 0 0 0 .4-1m-11-3.2.8 1.3v-.1l-.8-1.3v.1m2 0c-.3.1-.4-.3-.6-.4v.2c.2 0 .3.4.5.4v-.1m-1 1.8.5 1-.5-1.1v.1m1.2.5c.3.2.5.5.6.8v-.1a2.9 2.9 0 0 0-.6-.9v.2m0 1.3.3.7v-.2l-.4-.7v.2m1.2.2a3 3 0 0 1 .1.8 3.5 3.5 0 0 0 0-.9s-.1.1 0 .1m-.6 1.1c0 .4.2.7.4 1v-.1l-.4-1a.4.4 0 0 0 0 .1m.3-4.6.9.2a8.6 8.6 0 0 1-.9-.4v.1m.2 1.3 1 .5v-.2l-1-.5v.2m.3 1.3.6.6v-.1a4.8 4.8 0 0 1-.6-.6v.1m.4 1.7.3.8a.3.3 0 0 0 0-.1 1.9 1.9 0 0 0-.3-.8v.1m1-4.2.1.5v-.1a10.8 10.8 0 0 1 0-.5.3.3 0 0 0 0 .1m2.4-1-.2.5v.2a3.8 3.8 0 0 0 .3-.6m1-.1v.8a.4.4 0 0 0 0 .1 4.4 4.4 0 0 0 0-1m.2 1.7a3 3 0 0 1 0 .7.6.6 0 0 0 0 .1 4 4 0 0 0 0-.8m.8 1.5a1.4 1.4 0 0 1-.5.8v.2c.3-.3.5-.6.5-.9a.5.5 0 0 0 0-.1m-2.6-1.5-.2.4v.1l.2-.4v-.1m.3 2a2 2 0 0 1-.3.4v.2a2 2 0 0 0 .3-.4v-.1m-.9 1c-.3-.4-.5-.8-.3-1.3v-.1c-.2.5-.1 1.1.3 1.5v-.1m-1.2-1.1v.7a2 2 0 0 0 0-.9.3.3 0 0 0 0 .2m2.8 1.3-.3.7v.1l.3-.7m1.8.7-.5.7v.2a9.7 9.7 0 0 0 .5-.8v-.1m.8.9a18 18 0 0 0 0 .1.5.5 0 0 0 0-.1m1.1-1.7v.5c0 .1 0 0 0 0v-.5c0-.1 0 0 0 0m-11.8-5.2v1.4s.1-.1 0-.1v-1.2"/>
  <path fill="#fff" d="M254.7 209.4c.8-.7 1.8-1.4 2.9-1.1v-.2c-1-.2-2.1.5-2.9 1.2v.1m3.7.9c-.8-.6-2-.7-2.8-.1v.1c.7-.6 2-.4 2.8.1v-.1m-3 1.1a6 6 0 0 1 .6 3.2.5.5 0 0 0 0 .1c.2-1.2-.2-2.3-.5-3.4v.2m-1.2.6c.2 1 0 2 0 3v.1c0-1 .2-2.2 0-3.2m1.6-.7c1 .3 2 1 2.5 1.8v-.1a4.1 4.1 0 0 0-2.5-1.8v.1m-.9 1.4-.1 1.9v.1c.2-.6.1-1.3.1-2m1.6-.1c.6.5 1.1 1.3 1.2 2a3.4 3.4 0 0 0-1.2-2.2v.2m-4.6 1.7c.2-.3.4-.6.8-.8v-.1c-.4.1-.6.5-.8.8m1.5-5.3a2 2 0 0 0-1-1.2v.1c.4.3.8.7 1 1.2v-.1m-1 0a3.7 3.7 0 0 0-1.6-.3v.1c.6 0 1.1 0 1.7.3v-.1m1.6-.1c0-.5 0-1-.5-1.4v.1c.4.3.6.7.5 1.2m2 .7c.5-.2 1-.2 1.5-.2v-.1c-.5 0-1 0-1.5.2v.1m.9 1.4c.7 0 1.3.4 1.8 1v-.3a2.8 2.8 0 0 0-1.8-1v.3m-3.4 2c-.2.8 0 1.7-.9 2v.3c.9-.3.7-1.3 1-2v-.3"/>
  <path fill="#fff" d="M255.5 212.3c.3.7.7 1.5.5 2.4a1 1 0 0 0 0 .2c.2-1-.2-2-.5-2.9v.3m1-.2a2 2 0 0 1 1.6 1.6v-.1a1 1 0 0 0 0-.2 1.8 1.8 0 0 0-1.5-1.5v.2m0 1.1c0 .7.3 1.3 0 2v.2c.3-.8.1-1.6 0-2.4a1 1 0 0 0 0 .2m-.4-2.7c.8-.2 1.6-.3 2.3.3v-.3c-.7-.6-1.5-.4-2.3-.3v.3m-1.5-1.6c0-.7.7-1.2 1.3-1.4v-.3c-.7.2-1.2.7-1.3 1.4a1 1 0 0 0 0 .2m-.8.5c0-.8-.3-1.4-.6-2v.2c.2.6.6 1.2.6 1.8 0 .2 0 0 0 0m-.7.4a2 2 0 0 0-1.1-1.4v.2c.5.3 1 .8 1.1 1.4a.8.8 0 0 0 0-.2m-1-.3a3 3 0 0 0-1.3-.6v.2c.5.1.9.4 1.3.6v-.2m2.3 3.1c0 .7.2 1.4-.2 2v.3c.5-.7.3-1.6.3-2.5v.2"/>
  <path fill="#fff" d="M255.3 212.1c.3.7.6 1.4.5 2.1v.2c0-1-.2-1.7-.5-2.5v.2m.6-1c.7.3 1.3.5 1.8 1v-.2a3.8 3.8 0 0 0-1.8-1v.3m-1.8-1.5a16 16 0 0 0 .1-1.8c0-.2 0-.2 0 0 0 .5 0 1-.2 1.6v.2m-1.2-.4a6 6 0 0 1-1.3-.9v.3l1.3.9v-.3m-.2 3.5c-.3.2-.5.5-.7.9v.2l.7-.8v-.3m.9.6c0 .4-.3.8-.6 1.2v.2c.4-.4.6-.8.6-1.4 0 0 0-.2 0 0m2.3-3.8c.4-.7 1.3-.7 2-1v-.2c-.7.2-1.6.2-2 .9v.2m-4.5 0a2.2 2.2 0 0 1-.4-.2v.2l.4.2v-.2m.1 3.3a1 1 0 0 0-.4.2v.3l.4-.2v-.2a.8.8 0 0 0 0-.1m.6.1-.7.7v.2l.7-.7v-.2m1.1.3c-.2.6-1 1.3-.4 2v-.3c-.4-.5.2-1 .4-1.4v-.3m.8 0-.2 1.8a1 1 0 0 0 0 .3 10.5 10.5 0 0 0 .2-2.1m2-.7c.5.6.9 1.2 1 2v-.3a5.7 5.7 0 0 0-1-2v.3m.2-.5c.8.5 1.6 1 2.1 1.9v-.3c-.5-.8-1.3-1.3-2-1.9v.3"/>
  <path fill="#fff" d="M256.6 211h.8l.6.5c.2.1.5.2.6.4.3.3.3.7.3 1a.8.8 0 0 0 0-.2l-.1-.8-.5-.5-.8-.5c-.3-.2-.6-.2-1-.1v.2"/>
  <path fill="#fff" d="m258.4 212.5.3.8v-.2l-.3-.7v.1m-2.1-3.8 1.6-.4v-.3l-1.6.4v.3m-2.2.3a2.4 2.4 0 0 1 .4-.8l.4-.9v-.3l-.4.8c0 .3-.3.6-.4 1v.2m-1.8 5 .1 1.3v-.3a1.5 1.5 0 0 1 0-.8v-.2m1 .8c-.2.2-.2.6 0 1v-1m.8-.5-.2.8v.2l.2-1s0-.1 0 0m0-1.5v.5-.6.1m-.3.2a.9.9 0 0 1 0 .1.8.8 0 0 0 0 .3v-.7.3m-.6-.2a3.7 3.7 0 0 0 0 .5.8.8 0 0 0 0 .2v-.6m-.4 0-.9.6v.3l1-.7v-.2m-.8 0c-.1.2-.3.3-.5.3v.3c.2 0 .4-.1.5-.3v-.1a3.3 3.3 0 0 0 0-.1m-1-.3-.4.2v.2l.4-.2v-.2m3-.1.1.5a.8.8 0 0 0 0-.2v-.4.1m.4-.2.1.6a.4.4 0 0 0 0-.1v-.2a1 1 0 0 1 0-.3v-.2.2m.3 0 .1.3v-.1a.9.9 0 0 0 0-.5h-.1v.2m.4-.1a.8.8 0 0 1 .4.2v-.4a.8.8 0 0 0-.4-.2v.3m.3-.4.6.3v-.3a1.3 1.3 0 0 1-.6-.3v.4m.5-1.2h.4v-.2a2.5 2.5 0 0 0-.4 0v.2m-.3-.6.4-.4a5.7 5.7 0 0 0 0-.2l-.4.4v.2m-.4-.5a1 1 0 0 1 .2-.5v-.2a1.1 1.1 0 0 0-.2.6s0 .1 0 0m-.4-.2.5-.8v-.2l-.5.8v.2"/>
  <path fill="#fff" d="m254.4 208.3.1 1v-.1a.7.7 0 0 0 0-.2v-.8.1m-1.4.2.2.4a2 2 0 0 1 .1.3c0-.1 0 0 0 0v-.3l-.3-.6v.2m-.2.6a4.8 4.8 0 0 0-.6-.5 1.6 1.6 0 0 0 0 .1v.2l.6.4v-.2m.8.3a3 3 0 0 0-.1-1.8v.3c.2.4.2.8.1 1.2v.2m1.3-.7v-.3.3"/>
  <path fill="#fff" d="m253.6 209.4.1-1v-.3l-.2 1a1.6 1.6 0 0 0 0 .3m3.8 2.1c.3.1.6.3.7.6v-.4c-.1-.3-.4-.5-.7-.6v.4m-1 2v.6a1.2 1.2 0 0 0 0 .3s0 .1 0 0a2.8 2.8 0 0 0 0-1.2.7.7 0 0 0 0 .1v.3m-.9-.6v1.3s0 .2 0 0v-1.5.2m-.4.4a22.6 22.6 0 0 0-.3 1.7l.3-1.3v-.4m.6.3v1.1a1.5 1.5 0 0 0 0 .3c0 .1 0 .1 0 0v-1.6.2m-2.8.2a.7.7 0 0 1 0 .1v-.5.1a1.4 1.4 0 0 0 0 .3m1.2-.8.1.4v-.8.4m.3-.2a.4.4 0 0 1 .1.2s0 .1 0 0a.7.7 0 0 0 0 .2v-.3l-.1-.5a1.4 1.4 0 0 0 0 .2v.2m.4-.3.2.4a1 1 0 0 0 0-.2v-.2l-.2-.4a2.8 2.8 0 0 0 0 .3m.9-.3.5.7v-.4a10 10 0 0 1-.5-.7v.4m.4-.7.5.6v-.5a4.4 4.4 0 0 1-.4-.6v.5m-4.6-2.1a1.8 1.8 0 0 0-.5-.3v.4c.2 0 .3.2.5.3v-.4m1.4-.5a.5.5 0 0 1 0 .1v.1l.1-.2a1 1 0 0 0 0-.4 1 1 0 0 0 0 .1v.3m1-1.1-.1.8v.3s0 .1 0 0c.2-.3.2-.8.2-1.2a.6.6 0 0 0 0-.1v.2m.2 1.5.5-.6v-.4l-.5.6v.4m.7 0 .2-.3v-.3l-.2.2a1.4 1.4 0 0 0 0 .2v.2m1 .2a8.3 8.3 0 0 1-.7 0v.4a8 8 0 0 0 .8 0v-.4m-.3 1c.4.1.7.4 1 .6 0 0 .2-.4 0-.4l-1-.7v.4"/>
  <path fill="#fff" d="m256 211.2.9.6v-.5l-1-.6a2.3 2.3 0 0 0 0 .2v.2m-2-1.5v-.6.6m-2.4-1c.2.3.6.5 1 .8l.6.7s.1-.4 0-.4l-.6-.6-1-1c0 .1-.1.4 0 .4m.6 1.2a8.2 8.2 0 0 1-.5-.6 1.8 1.8 0 0 0 0 .2v.2a8 8 0 0 0 .5.6v-.4m-.4 2.7-.3.6v.4l.3-.6v-.4m.3.4v.7a1.4 1.4 0 0 0 0 .3v-1.1a.7.7 0 0 0 0 .1m1.1 2c.2-.8.2-1.4.2-2.1 0-.3 0 0 0 0 0 .6 0 1.1-.2 1.6v.4m.6-1.6.1.7a1.4 1.4 0 0 0 0 .3s0 .1 0 0v-1.4a.7.7 0 0 0 0 .2v.2m.6-.2c.2.3.3.6.2 1v.2c.1-.5.1-1.2-.2-1.6v.4"/>
  <path fill="#fff" d="m254.5 212.6.4 1.8v-.3a14.2 14.2 0 0 0-.3-1.9v.4m.5-.1.7 1.1a.7.7 0 0 0 0-.1v-.3a4 4 0 0 0-.7-1.1v.4m1.2-1c0-.2-.3-.3-.5-.2v.4c.2 0 .4 0 .5.2v-.4"/>
  <path fill="#fff" d="M255.7 211.3h1.2v-.5h-1.2v.5m.7-3.1a3 3 0 0 0-.5 1.3v.3s0 .1 0 0c0-.4.2-.9.5-1.2v-.4m-1.6.3c0 .4.2.7.3 1a.8.8 0 0 0 0-.1v-.3l-.3-1v.1a1.3 1.3 0 0 0 0 .3m-.3.6a1.6 1.6 0 0 1-.4-.5 1 1 0 0 0 0 .1v.3a1.7 1.7 0 0 0 .4.5v-.4m-.6.3c-.5-.1-.9-.3-1.3-.6v.4c.4.3.8.5 1.3.6v-.4"/>
  <path fill="#dba05f" d="m254.4 209.3-2.3.4-2 .2-1.3-.4c-.4 0-1.7-.2-2.2.3l-1 .8c-.1.2-.7.7-.7 1 0 .2.1.6.4.6.3 0 1 .6 1 .8 0 .2.8.4 1.6.4 1.4 0 2.1-.7 4.2-.4 1.2 0 3.3-.8 3.7-1.4.4-.5.6-1.1.2-1.7-.3-.7-1.5-.6-1.6-.6"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m254.4 209.3-2.3.4-2 .2-1.3-.4c-.4 0-1.7-.2-2.2.3l-1 .8c-.1.2-.7.7-.7 1 0 .2.1.6.4.6.3 0 1 .6 1 .8 0 .2.8.4 1.6.4 1.4 0 2.1-.7 4.2-.4 1.2 0 3.3-.8 3.7-1.4.4-.5.6-1.1.2-1.7-.3-.7-1.5-.6-1.6-.6z"/>
  <path d="M246.8 211.3v-.1l.1-.2.2-.2a.9.9 0 0 1 .4-.3h-.1.7l-.7.1h.6-.5c-.3.1-.3.5-.7.7"/>
  <path fill="none" d="m246.7 211.2.4-.4.7-.3h.3"/>
  <path fill="none" d="m247.4 210.6-.4.3-.3.3m.8-.6h.5m-.6.1h.5"/>
  <path d="m247.9 211-.2.1-.1.1-.3.2-.4.1.5-.1-.4.1.4-.1-.4.1h.1s.4 0 .8-.4"/>
  <path fill="none" d="m247.8 211-.3.2s-.3.3-.4.2l-.2.1m.4-.1.3-.2.2-.2m-.4.4-.4.1m.4-.1-.3.1"/>
  <path fill="#c6262c" d="M248.4 209.6s0-.6-.6-.8a3.4 3.4 0 0 0-1.4-.2l-.6.1a2.7 2.7 0 0 0-.6.2v.3c-.2.2-.5.4-.4.6.2.3 0 .3.2.4.2 0 0-.1 0-.1s-1 .3-.8.9c.2.6.5.4.6.4l.5-.3.8-.7 1-.4h.6l.7-.4z"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M248.4 209.6s0-.6-.6-.8a3.4 3.4 0 0 0-1.4-.2l-.6.1a2.7 2.7 0 0 0-.6.2v.3c-.2.2-.5.4-.4.6.2.3 0 .3.2.4.2 0 0-.1 0-.1s-1 .3-.8.9c.2.6.5.4.6.4l.5-.3.8-.7 1-.4h.6l.7-.4z"/>
  <path d="m247.7 211-.3.4-.4-.1.4-.5.3.1"/>
  <path fill="#d9c0b9" d="M243.8 213.6s-.7-1.3 1.4-2l.8.6s-.4.6-1.6.8c0 0-.6.2-.6.6"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M243.8 213.6s-.7-1.3 1.4-2l.8.6s-.4.6-1.6.8c0 0-.6.2-.6.6z"/>
  <path fill="#d9c0b9" d="M244 213.4s.9.1 1.5-.3c.4-.3.6-.2.7-.1 0 0 0-.5-.2-.8l-1 .7c-.5 0-.8 0-1 .5"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M244 213.4s.9.1 1.5-.3c.4-.3.6-.2.7-.1 0 0 0-.5-.2-.8l-1 .7c-.5 0-.8 0-1 .5z"/>
  <path fill="#7a2e26" d="M246.4 213h.5v-.2h-.5v.1m-.3-2.2c-.1 0 0 .2-.2.3v.1c.1 0 0-.2.2-.2v-.2m.5.3.3-.2v-.1c-.2 0-.3 0-.4.2v.1m.6.8a.3.3 0 0 0 .3-.1v-.1a.3.3 0 0 1-.3 0v.2m.5-.2a.8.8 0 0 0 .4-.3v-.1a.8.8 0 0 1-.4.3v.1m-.7-.7-.4.4v.1l.4-.4v-.1m.3 2.2 1-.1v-.2a3.3 3.3 0 0 1-1 .2m1.6 0c.5-.3 1-.6 1-1.2v-.1c0 .6-.5.9-1 1.2v.1m.3-.8c.4-.2.6-.5.7-.9v-.1c-.1.4-.4.7-.7.9v.1m-.1-2c.2-.1.5.1.7.3v-.2l-.7-.3v.1m6.6 1c.3-.4.2-1-.1-1.4v.1c.2.4.4.8.1 1.2v.2m-5-.7c.2.2 1 .8.8 1.2v.1c.3-.6-.4-1.2-.9-1.5v.2m2.3 2.2a1.6 1.6 0 0 0 .1-.4.5.5 0 0 0 0-.1v.5"/>
  <path fill="#5e3f17" d="m253.7 212.5.6-.3m-9-.2c-.4.2-1 .2-1 .7 0-.5.6-.5 1-.7"/>
  <path fill="#842116" d="M245 210.4c.1 0 .3.1.3.3a.5.5 0 0 0 0 .1.7.7 0 0 0 0-.3c0-.2-.2-.2-.3-.2v.1m.7.3a.7.7 0 0 0 0-.6v.6m.6-.6c0-.2-.1-.5-.4-.6v.1c.3.1.3.4.4.6a.3.3 0 0 0 0-.1m.5-.1c0-.2 0-.5-.2-.6v.1l.2.4m-.9-.7c.5-.2 1.6-.3 2 .2v-.2c-.4-.5-1.5-.4-2-.1v.1"/>
  <path fill="#7a2e26" d="M244.8 211.3v-.5s-.1 0 0 0v.5m5 1.5a.7.7 0 0 0 .3-.5v-.1a.7.7 0 0 1-.3.4v.2m.8-.1a.4.4 0 0 0 .1-.3l-.1.2v.1m4.6-2.5a1 1 0 0 1 .1.7.4.4 0 0 0 0 .1v-1s-.1.1 0 .2m-.6.4.1.7v-.8.1m-.5.4"/>
  <path fill="#452c25" d="m260.5 224.5.1.3h.1l-.1-.3z"/>
  <path fill="#dcddde" d="M250 208c-1.7 0-3.5-1.2-3.5-1.2-2.3-.4-2.4-2.5-2.4-2.5-1-.3-1.7-2.6-1.7-2.6-1.4.8-3.2 0-3.2 0s0-.4-1.6 0c-1.6.3-1.3-.3-1.3-.3s.6-.7-2.2 0c-2.8.6.3-.9.3-.9-.9.3-3.5.5-3.5.5-1 0-2 .5-3 .8-.8.2-2 .4-2.5.7l-7.3 3.1-5.9 2.3c.3 0 3.7-2.3 8-4.2a93.5 93.5 0 0 1 11-4.2c3.1-1 5.6-.5 7 0 .7.2 4.4-.1 6 0 1.8.3 2 3 2 3 .2.2.4 2.8.4 2.8s-1 0 .1.2 3.1 1.7 3.1 1.7h.8s.4-.5.9-.7l1.6-.5h2.1l2.2.3c.9.1 1 .2 1.3.3h.5c1-.5 3.2-1.3 3.6-1.2 0 0 .8-.2 1.2-.5a112 112 0 0 0 1.4-1.1s-.6-4.7 4.1-4.3l12.3 1.3a47.8 47.8 0 0 1 12.5 4.5l4.3 1.9c2.4 1 4.1 2.5 4.1 2.5l-3.8-1.9c-1-.4-2-.6-2.8-1l-3.9-1.8c-3.7-1.7-3.6-1.8-5.1-1.9-1 0 .7 1.2.7 1.2l-4.4-1.7a6.3 6.3 0 0 0-3-.6 6.2 6.2 0 0 1-2.4-.3c-.6-.2-4-.4-4.7-.4a7.8 7.8 0 0 1-1-.2l.2.4-1.7-.3-.5.7s-1.6.3-1.7-.2c-.2-.5-1 2.4-1.4 3.2-.4.9-2.4.6-2.9 1.1-.4.6-1.5 1-1.7 1-.2.2-1 .1-1.4.1-.6 0 0 0-1.1.2l-1.2-.1-1.5-.5-3.8-.2a6 6 0 0 0-1.5.4l-1.3.8"/>
  <path fill="#e7e7e7" stroke="#000" stroke-width=".1" d="M250 208c-1.7 0-3.5-1.2-3.5-1.2-2.3-.4-2.4-2.5-2.4-2.5-1-.3-1.7-2.6-1.7-2.6-1.4.8-3.2 0-3.2 0s0-.4-1.6 0c-1.6.3-1.3-.3-1.3-.3s.6-.7-2.2 0c-2.8.6.3-.9.3-.9-.9.3-3.5.5-3.5.5-1 0-2 .5-3 .8-.8.2-2 .4-2.5.7l-7.3 3.1-5.9 2.3c.3 0 3.7-2.3 8-4.2a93.5 93.5 0 0 1 11-4.2c3.1-1 5.6-.5 7 0 .7.2 4.4-.1 6 0 1.8.3 2 3 2 3 .2.2.4 2.8.4 2.8s-1 0 .1.2 3.1 1.7 3.1 1.7h.8s.4-.5.9-.7l1.6-.5h2.1l2.2.3c.9.1 1 .2 1.3.3h.5c1-.5 3.2-1.3 3.6-1.2 0 0 .8-.2 1.2-.5l1.4-1.1s-.6-4.7 4.1-4.3l12.3 1.3a47.8 47.8 0 0 1 12.5 4.5l4.3 1.9c2.4 1 4.1 2.5 4.1 2.5l-3.8-1.9c-1-.4-2-.6-2.8-1l-3.9-1.8c-3.7-1.7-3.6-1.8-5.1-1.9-1 0 .7 1.2.7 1.2l-4.4-1.7a6.3 6.3 0 0 0-3-.6 6.2 6.2 0 0 1-2.4-.3c-.6-.2-4-.4-4.7-.4a7.8 7.8 0 0 1-1-.2l.2.4-1.7-.3-.5.7s-1.6.3-1.7-.2c-.2-.5-1 2.4-1.4 3.2-.4.9-2.4.6-2.9 1.1-.4.6-1.5 1-1.7 1-.2.2-1 .1-1.4.1-.6 0 0 0-1.1.2l-1.2-.1-1.5-.5-3.8-.2a6 6 0 0 0-1.5.4l-1.3.8"/>
  <path fill="#452c25" d="M250.3 207.4s-.2.1-.3.5v.2"/>
  <path fill="#574f4c" d="m259.5 206.9.7.5s0 .1 0 0a7 7 0 0 0-.8-.7.6.6 0 0 0 .1.2"/>
</svg>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gr" viewBox="0 0 512 512">
  <path fill="#005bae" fill-rule="evenodd" stroke-width=".8" d="M0 0h512v57H0z"/>
  <path fill="#fff" fill-rule="evenodd" stroke-width=".8" d="M0 57h512v57H0z"/>
  <path fill="#005bae" fill-rule="evenodd" stroke-width=".8" d="M0 114h512v57H0z"/>
  <path fill="#fff" fill-rule="evenodd" stroke-width=".8" d="M0 171h512v57H0z"/>
  <path fill="#005bae" fill-rule="evenodd" stroke-width=".8" d="M0 228h512v56.9H0z"/>
  <path fill="#fff" fill-rule="evenodd" stroke-width=".8" d="M0 284.9h512v57H0z"/>
  <path fill="#005bae" fill-rule="evenodd" stroke-width=".8" d="M0 341.9h512v57H0z"/>
  <path fill="#fff" fill-rule="evenodd" stroke-width=".8" d="M0 398.9h512v57H0z"/>
  <path fill="#005bae" stroke-width="3" d="M0 0h284.9v284.9H0z"/>
  <g fill="#fff" fill-rule="evenodd" stroke-width="1.3">
    <path d="M148 0h74v370h-74z" transform="scale(.77)"/>
    <path d="M0 148h370v74H0z" transform="scale(.77)"/>
  </g>
  <path fill="#005bae" fill-rule="evenodd" stroke-width=".8" d="M0 455h512v57H0z"/>
</svg>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icons-mm" viewBox="0 0 512 512">
  <defs>
    <path id="a" fill="#fff" d="M.2 0h-.4L0-.5z" transform="scale(8.844)"/>
    <g id="b">
      <use xlink:href="#a" width="18" height="12" transform="rotate(-144)"/>
      <use xlink:href="#a" width="18" height="12" transform="rotate(-72)"/>
      <use xlink:href="#a" width="18" height="12"/>
      <use xlink:href="#a" width="18" height="12" transform="rotate(72)"/>
      <use xlink:href="#a" width="18" height="12" transform="rotate(144)"/>
    </g>
  </defs>
  <path fill="#fecb00" d="M0 0h512v170.7H0z"/>
  <path fill="#ea2839" d="M0 341.3h512V512H0z"/>
  <path fill="#34b233" d="M0 170.7h512v170.6H0z"/>
  <use xlink:href="#b" width="18" height="12" x="9" y="6.4" transform="translate(-127.7) scale(42.66667)"/>
</svg>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-sm" viewBox="0 0 512 512">
  <g fill-rule="evenodd" stroke-width="1pt">
    <path fill="#19b6ef" d="M0 256h512v256H0z"/>
    <path fill="#fff" d="M0 0h512v256H0z"/>
  </g>
  <path fill="#fd0" fill-rule="evenodd" stroke="#7d6c00" stroke-width="2.4" d="M252.9 361.8C308.8 320 369 234.6 298.5 189.7c-13.2-2.6-27.9-1.8-35 3.8-3.7-2.2-6.6-2-10.4 2-2.6-3.2-5.2-4.7-10.7-3a43.6 43.6 0 0 0-33.6-3.4c-61.5 37-23.9 124.6 44 172.7z"/>
  <g stroke="#3a9d4f">
    <path fill="#4fd46b" fill-rule="evenodd" stroke-linejoin="round" stroke-width="2.4" d="M356.3 266.8s6.3-8.5 6.5-8.5c6.3-3.7 7-8.5 7-8.5 6.3-2 4.3-7.1 4.8-7.8a6.9 6.9 0 0 0 1.5-7.6c0-.9 2.2-8.9-.9-10 .2-8.5-5.1-7.7-9.3-2.1-4.5 1.3-5.5 5-4 9-5.8 0-6 8.5-4.3 13.3-7.8-.2-3.4 8.5-3.7 9-2.6 1.2 2 13.6 2.4 13.2zM307 339.5l4 2.4c.7 3 3.5 4.8 5.6 4.3 1 4.6 6 4 9.5 1.3 3 4.2 6.5 4.3 11.3 2.9 4.4 3.2 10 1.8 13.7-1.6 4 3.3 6.7 1 8.7-2.6 3.1.8 5.6.3 6.7-2.8 6.1-.5 3-6.2-2-8.7 4-3.4 8.5-10.6 2.2-11.7-2-1.4-5.6-1.1-8.4.2-.7-3.2-5.2-4-10-.4-1.7-3.6-7.5-1.9-10.2.6-3.5-3-7.6-3-13.7.5L307 339.5zm0-9.3c.7-4-2-11.2 2.2-12-.8-6.6.4-14.1 8-13.4 1.3-6.3 1-12.2 8.3-13 0 0 5.9-20.5 12-6.3 2.3 4 1.9 10.8-2.9 9.5 1 5-.7 9.5-6.3 9.3 2.5 3.6 1.7 8.4-1 10.7L307 330.2zm35.4-25.4 6.3-1.3c6.5-4.4 9.1-6.1 12.4-1.3 5.4-1.2 10.6-.6 10.4 3.7 6.5.4 6.4 4.5 5.7 7.8 1 5.7-1.5 13.2-5.5 4.1-12.6-7.7-19.7-6.7-39.7-2.2l10.4-10.8zm3.3-6.3c.2-.2 18.7-5 16.7-10.7 5.2-.8 6.3-6 6.5-6 10.9-3.5 10.2-9.8 10.2-9.8 3.1-3.4 8.6-6.7 7.4-12.6.4-6.7 1-10.9-8-6.5-6.8-.7-9.1 3.2-11.1 9-3.2-3.7-8.3 2.3-8.9 7.7 0 0-8.3 8-8.3 8.2l-6.9 12.8 2.4 7.9z"/>
    <path fill="#4fd46b" fill-rule="evenodd" stroke-linejoin="round" stroke-width="2.4" d="M346.1 284.1c-4.4-3.3-6.9-7.3-6-11.3-3-3.9-5-6.3-2.2-9.7l-2.2-8c-5.7-2.2-3.3-7-1.7-8.7-2.7-3.7-2.8-7.6-.3-11.1 0-7 4.9-4.4 9 0 0 0 6.7 4.8 1.7 9.1 5 1.7 6.5 6 3.7 7.8 4.3 2 5 5.9 2.6 8.5 4.4 3.5 2.7 8 4.1 12l-8.7 11.4z"/>
    <path fill="#4fd46b" fill-rule="evenodd" stroke-linejoin="round" stroke-width="2.4" d="M354 251.8c-.3-.2-7.5-9.4-5.5-10-.4-2.8-2.6-5.9-1.3-8.7-3.5-3.5-3.6-7.7-.9-11-2.4-3.3-1.3-7.7 2-10.5-1-5.3 2.7-6.6 6-7.6 2.5-8.6 6.5-6.4 8.8.2 3.4 3 2.9 7.5 1.7 10.9 4 2.7 1.6 6.1-.2 7.6l-10.7 29.1z"/>
    <path fill="#4fd46b" fill-rule="evenodd" stroke-linejoin="round" stroke-width="2.4" d="m352.9 206-6.1-6.1c1.5-3.2 2.8-9-1.8-11.5-2.5-6.2-15-13.8-17.1.8-2-4.4-6-8.7-9-3.6-6.5-5.7-10-4-6.6 3.2 0 0-3 4.8 5 8.5.6.6-2.7 8.7 6.9 8.9-1.8 2.7 1.2 6.6 5 6.3-2.8 3.4 1.9 7 4.8 5.6-1.3 3.8-1.2 5.6 4 6.1l6 6.7 4.7 6.6 4.1-31.5z"/>
    <path fill="none" stroke-linecap="round" stroke-width="2.2" d="M356.6 263c.2-.4 11.6-26.5 13.1-34.5m-12-12s2 21.3-3.3 37M322.8 195s23.3 22.4 25.5 31.6m-9.3-34s1.6 18.4 8 36.5m33.2 30.4s-23.3 19.6-34.7 36.8m12.6 32s-30.7 4.2-44.2 4.5m34 8.7s-38-1-40.8-3.7M329 292c0 .3-19.3 32.2-20 42.7"/>
  </g>
  <path fill="#65c7ff" fill-rule="evenodd" stroke="#7d6c00" stroke-width="2.4" d="M252.7 355.7c-40.3-38-81.6-109.4-40.5-145.4 7.2 4.1 15.9.4 27.7-4.2 3.6 3.9 8.2 4.9 12.7 2 5.2 2.1 9 .4 11.5-2.4 11.6 6.8 26.5 10.3 30 3.6 40.4 38.4-.5 110-41.5 146.4z"/>
  <path fill="#8fc753" fill-rule="evenodd" d="M252.9 354.6a227.1 227.1 0 0 1-45.2-61.5c2-1.8 3-2.3 4.1-5.4a46 46 0 0 0 17.7-.3c1.6 6.1 2 11.2 5.8 16.3l8.2-16a36 36 0 0 0 17.6 0c3.4 4.6 2.2 11.5 8.2 16.7 3.6-10.6 7.2-11.3 10.8-17 5.3 1.9 8.7 1 13-.3 2.3 2.6 1.2 2.5 5.4 6.4a206.4 206.4 0 0 1-45.6 61z"/>
  <path fill="#fff" fill-rule="evenodd" stroke="#000" stroke-width="1.1" d="M205.5 175.3a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0zm-3.7-8.3a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0zm-4.4-7.6a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0zm-3-7.4a3.6 3.6 0 1 1-7 0 3.6 3.6 0 0 1 7 0zm.5-8.1a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0zm18.9-13.3a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0zm-7.1 1.2a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0zm-7.7 4.7a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0zm23.9-5.8a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0zm9.9.8a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7 0zm8.8-.5a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0z"/>
  <path fill="#fd0" fill-rule="evenodd" stroke="#7d6c00" stroke-width="1.1" d="M262.3 125.3a9.2 9.2 0 1 1-18.4 0 9.2 9.2 0 0 1 18.3 0z"/>
  <path fill="#fff" fill-rule="evenodd" stroke="#000" stroke-width="1.1" d="M271.9 130.9a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0zm9.3.7a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0zm9-.4a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0zm7.6-.3a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0zm9.5 1a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0zm7.4 4.7a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0z"/>
  <path fill="#e40000" fill-rule="evenodd" stroke="#ac0000" stroke-width="2.4" d="m202 161.8 9.2 17.6h84.5l9.7-17c-5.7-3.9-9.6-6.9-17.7-5-4.7-6.7-9.7-8-17.2-7.2a12.3 12.3 0 0 0-8-4.2l-17.8.5c-4.6.4-8.2 4-8.4 4-7.6-1-14.5-.7-16.3 6.6-6.9-1.7-11.7.2-18 4.7z"/>
  <path fill="#fff" fill-rule="evenodd" stroke="#000" stroke-width="1.1" d="M317.8 144.4a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0zm.6 8.3a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0zm-2.6 7.8a3.6 3.6 0 1 1-7.1 0 3.6 3.6 0 0 1 7.1 0zm-3.3 6.4a3.6 3.6 0 1 1-7 0 3.6 3.6 0 0 1 7 0zm-3.8 8a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0zm-50-10.2a5.3 5.3 0 1 1-10.5 0 5.3 5.3 0 0 1 10.5 0zm1-12.1a6.4 6.4 0 1 1-12.7 0 6.4 6.4 0 0 1 12.8 0z"/>
  <path fill="#fff" fill-rule="evenodd" stroke="#000" stroke-width="1.1" d="M258.9 140.8a5.7 5.7 0 1 1-11.5 0 5.7 5.7 0 0 1 11.5 0z"/>
  <path fill="#fd0" fill-rule="evenodd" stroke="#7d6c00" stroke-width="1.1" d="M251.2 116.3v-4.6h-3.8l.1-3.4h3.3v-3h4.7v2.7h3.7v3.6h-3.9v4.8h-4.1z"/>
  <path fill="none" stroke="#fd0" stroke-width="3.3" d="M210.7 179.4c-7.5-12.9-18.7-30.3-11.8-37.8 9.6-10.9 32-1 46.3-7.4 1 12.3-2.4 32.5 3.1 36.7l-5.1 4.5c-3.1-4-9-9.4-16.3.2-4.1-3.6-8.8-3-11 1.8-2.2.3-2 1.2-5.2 2zm85.5-.5c7.5-12.8 18.7-30.2 11.8-37.8-9.6-10.8-32-1-46.3-7.3-1 12.2 2.4 32.4-3.1 36.7l5.1 4.4c5-6.9 11-7.1 16.2.3 4.2-3.7 8.5-3.2 11.1 1.8 2.2.3 2 1.1 5.2 2z"/>
  <path fill="#fd0" fill-rule="evenodd" stroke="#7d6c00" stroke-width="2.4" d="M210.5 189a466 466 0 0 1 84.5 0l3.3-9.6c-29.5-5.4-49.9-6-88.5-.7l.7 10.2z"/>
  <path fill="#c76e2e" fill-rule="evenodd" d="m249.7 351.3.7-4.5c3 .9 5.3.5 7.8-.4l2.6-3.9-2-2.3c-1.7.4-3 2-4.2 3.4-1.7 0-3.2-.8-4.9-1.1l-1.6-6.9c-1.6-1.9-5-1.7-4.3 1.7l.4 2.6c.6 1.6.9 3.9 2 5v2.8l3.5 3.6zm1.3-19.5c-2.3 1.1-5-.8-7.8-2-2.6-.1-4.7 2-7.9 1.4.6-1.7 2-2 3-3-.7-4.4 1.6-5.9 2.3-5.9.6 0 3.2.7 3.2.7l2.6.3c1.6 2.8 3.7 5.4 4.6 8.5z"/>
  <path fill="#ffe100" fill-rule="evenodd" stroke="#e9bf00" stroke-width="2.4" d="M235.5 390.5c7.5-12.3 60-36.8 109.2-89.9-50 48.3-81.4 60.1-122.4 89.6l13.2.3z"/>
  <path fill="#9d4916" fill-rule="evenodd" stroke="#68300e" stroke-width="1.1" d="M307.6 334a3.8 3.8 0 1 1-7.6 0 3.8 3.8 0 0 1 7.6 0zm36.7-37.1a4.3 4.3 0 1 1-8.7 0 4.3 4.3 0 0 1 8.7 0zm12.2-31.6a3.8 3.8 0 1 1-7.6 0 3.8 3.8 0 0 1 7.6 0zm-12-41a3.8 3.8 0 1 1-7.6 0 3.8 3.8 0 0 1 7.6 0z"/>
  <path fill="#fff" fill-rule="evenodd" stroke="#a9a9a9" stroke-width="1.1" d="M212.4 287.6v-16.2l-1.7-1.4v-3.8l3-.3.6-18-2-1.1-.2-3s2.2.8 2.2.2l.5-3.5s-1.3-.3-1.3-.9 1.6-1.9 1.6-1.9-.8-.8-1-1.3l-.9-3 .8-3-.5-1.7-1.4-2.5 2-1.9-.6-3c0-.5 1.3-2.8 1.6-3l2.5-3.3 4.6-1.1 5.5.8 3 2 .6 4.9s-.6 3-.8 3l-2.5 1s-2.7.3-3 0 .8 3.3.8 3.3v3.3l-.3 4.1s0 2-.2 2.2l-.9 1.1-.2 4.1 4.3 1.1-.2 2.5-3 .3.5 16.7 4.4.8v4.7l-2 1-.5 16.8h-15.3zm66.5.2v-16.1l-1.6-1.4v-3.8l3-.3.6-18-2-1.2-.2-3s2.2.8 2.2.3l.5-3.6s-1.4-.2-1.4-.8 1.7-1.9 1.7-1.9-.8-.8-1.1-1.4-.8-3-.8-3l.8-3-.6-1.6-1.3-2.5 1.9-2-.6-3a10 10 0 0 1 1.7-3l2.4-3.2 4.7-1.1 5.5.8 3 2 .5 4.8s-.5 3-.8 3-2.5 1.2-2.5 1.2-2.7.2-3 0 .9 3.2.9 3.2v3.3l-.3 4.1s0 2-.3 2.2l-.8 1.1-.3 4.1 4.4 1.1-.3 2.5-3 .3.6 16.7 4.3.8v4.6l-1.9 1.1-.5 16.7h-15.4zm-33.6.6v-16.2l-1.7-1.3V267l3-.2.6-18.1-2-1.1-.2-3s2.2.8 2.2.3l.5-3.6s-1.4-.3-1.4-.8 1.7-2 1.7-2l-1.1-1.3c-.3-.5-.8-3-.8-3l.8-3-.6-1.7-1.3-2.4 1.9-2-.6-3a10 10 0 0 1 1.7-3l2.5-3.3 4.6-1 5.5.8 3 1.9.5 4.9s-.5 3-.8 3-2.4 1.1-2.4 1.1-2.8.3-3 0 .8 3.3.8 3.3v3.3l-.3 4s0 2-.3 2.3c-.3.2-.8 1-.8 1l-.3 4.2 4.4 1-.3 2.5-3 .3.6 16.7 4.4.8v4.7l-2 1-.5 16.8h-15.3z"/>
  <path fill-rule="evenodd" d="M216.4 287.4v-12.7h7.2V288l-7.2-.6zm33.6 1 .3-13h6.4v12.8l-6.6.3zm33.2-.2-.5-12.2 6.8-.3v12.8l-6.3-.3zm-65-38.5h4v6.7h-4zm32.4.3h5.6v6.4h-5.6zm33 .5h5v6.1h-5z"/>
  <path fill="none" stroke="#a8a8a8" stroke-width="1.1" d="M220.3 220.8c4.4 4.9 4.7 4.9 4.7 4.9m28-5c.7 1.7 2.1 5.3 3.8 5.5m31.2-4.6s1.3 3.8 3.3 4.3"/>
  <path fill="#b97700" fill-rule="evenodd" d="M215.7 207c12.8-4.2-3-12.5-5.6 0-4.2.6-4.7 3.7-13.7 2.3-21.7 35.4-5.6 92.3 57.8 151.3-113.6-96.6-67.4-168-36-165.4 17.1 1.2 8.5 22.5-2.5 11.8z"/>
  <path fill="none" stroke="#7d6c00" stroke-width="2.4" d="M219.2 188.8s10.5 2.8 10.5 7.3m0-8s7.2 3.1 8.8 6m48.1-4.8s-9.2 1.1-11.2 4m-2.8-3.3s-5.2 4.5-4.8 5.7m3.6 13.6c-.8-.4-4.4-5.2-3.6-11.2m-31.7 8s2.4-2.8 2.4-8m14.4-2 .4 11.6m10-1.6c0-.8 3.3-8.4-.3-12m-21.7-1.6s-2.8 7.6-.8 14m21.3-7.2s-4.4 1.2-6.4 3.2m-12.5-2c0-.4 4.8-1.2 6.4 1.6"/>
  <path fill="#c76e2e" fill-rule="evenodd" d="M235.3 322c.2 0 4-.7 4-2.6 2-1.2.5-4.7.5-4.7l-3.6-.7-4.9-5.6c-.2-1.7.4-3.3-.7-5-3.4.8-5.3 3.6-6.5 6.9.9 1 1 2.1 2.5 3 1.6.3 2.7-.6 4.2-.3.8 1.3.6 2.5.8 3.7 2 1.5 2.5 3.5 3.7 5.3zm-4.4-23.7v-6.6l-4.7-.1c-.6 1-1.7 1.4-2.4 2.3l-3.2 1.6c1.3 1.7 3 2.6 4 3.4 2.5.7 4.4.7 6.3-.6zm-14.8 9.7-2.5-4.3a7.7 7.7 0 0 1 5 .3s1.1 2.7.3 3.7c-.4 1-2.9.5-2.8.3zm39 4.4a4.7 4.7 0 0 0 2.9-3.5l-4.8-5.5H249c-1-1.1-2.6-1.3-3.9-1.3 0 0 1.4 2 3.1 2.5 1.3 2.7 6.6 7.8 7 7.8zm4.6.7a16 16 0 0 1 6.5-1.4c-.2-1.7 3.1-5.7 3.1-5.7l6 7.8c-1.1.9-3 .6-4.5.9 0 0-2.9 2.8-3.2 2.9s-5.5 1.3-8-.2c-1.2-2.2.2-4.7.1-4.3zm3.4-13.7c.7-2.5 1-5 0-8 0 0-6.8-.2-6.8 0l-4.5 2s1.5 4.5 3.2 4c.8 2.4 3.1 1.8 4.2 2.6l3.9-.6zm26.5-6.8c-.9 2.8-1.4 5.8 0 8.6 1.2.2 2.6 1 3.7.8l5.5-9.8c-3.8-1.2-6.8-1.1-9.2.4z"/>
  <path fill="#b97700" fill-rule="evenodd" d="M291.3 206c-12.8-4 3-12.4 5.6 0 4.2.7 4.7 3.8 13.7 2.5 21.6 35.3 5.6 92.3-57.8 151.2 113.5-96.6 67.4-168 36-165.4-17.2 1.2-8.5 22.5 2.5 11.8z"/>
  <path fill="#c76e2e" fill-rule="evenodd" d="M292.6 303.6c-.2 0-3.3 2.3-3.3 2.3l-4.4 1.7-4.7.1-1-3.2 3.6-3.2c-3-.5-6.1.7-8.5 3 0 0 0 3.5 2 5.3a41 41 0 0 0 4.8 4.3c2.3.4 4.4 0 5.9-1.1l5.6-9.2zm-24.8 32.2c1.5.4 12.1-13.6 12.1-13.6a10.7 10.7 0 0 0-5.2-5.8s-5.2 6-5.3 8.1c-.8 1.9-3.1 9-2.1 9.9-.1.2-.5 3 .5 1.4z"/>
  <path fill="#006800" fill-rule="evenodd" stroke="#004100" stroke-linejoin="round" stroke-width="2.4" d="M198.8 338.6c-15.8-13.8-37.2-21.4-67-11 8 3.4 16.7 4.6 24.1 8.3l42.9 2.7z"/>
  <path fill="none" stroke="#00a400" stroke-linecap="round" stroke-width="2.2" d="M153 328.8c31.2.6 40.3 8.4 38.6 7.1"/>
  <path fill="#006800" fill-rule="evenodd" stroke="#004100" stroke-linejoin="round" stroke-width="2.2" d="M199.4 340.2c-9.3 1.8-22.2 10.8-26 10.4-10.1-1.2-19.7-5.4-29.5-8.5-4.1-1.3-8.2 0-12.4 0 35-16.6 47-14.3 68-2z"/>
  <path fill="#006800" fill-rule="evenodd" stroke="#004100" stroke-linejoin="round" stroke-width="2.4" d="M176.4 315.8s-11.7 1.6-17 2c-5.1-.4-12.7-5.2-21-14-4.4-4.8-14.3-4.2-14.3-4.2 22-4.7 39-.3 52.3 16.2zm-16-22.7c-15.9-1-35.7-15.3-40.2-32.2 0 .3 5.8 3.7 4.9 4.6 26 6.6 27.8 11.9 35.4 27.6zm26.7 27.3c2.3-14.4 3-24-4-32.5-5.5-6.5-7-10.4-11-19.5-1.1 19-5.2 34.6 15 52zm-25-40c11.8-17.2 13.8-30.2 12-50.6a88.4 88.4 0 0 1-4.6 11.7c-17.5 11-9.7 28.2-7.4 39z"/>
  <path fill="#006800" fill-rule="evenodd" stroke="#004100" stroke-linejoin="round" stroke-width="2.4" d="M151.7 197.3c11.8 17.2 10 33.4 8.1 53.9a89.1 89.1 0 0 0-4.5-11.7c-17.6-11-5.9-31.5-3.6-42.2z"/>
  <path fill="#006800" fill-rule="evenodd" stroke="#004100" stroke-linejoin="round" stroke-width="2.4" d="M161.4 224c28.6-14.5 17.6-32.8 22.8-46.9-19.8 14.8-22.4 30.5-22.8 46.8z"/>
  <path fill="none" stroke="#00a400" stroke-linecap="round" stroke-width="2.2" d="M165.3 220.3c3.6-10 10.7-27.2 11.4-27.2m-19.8 48.4c-.7-7.2-4.2-26.4-4.6-28.3"/>
  <path fill="#006800" fill-rule="evenodd" stroke="#004100" stroke-linejoin="round" stroke-width="2.4" d="M158.2 273.6c-16-1-33.1-22.7-37.7-39.6 0 .2 5.9 3.6 4.9 4.5 22.8 10.2 25.2 19.4 32.8 35zm-4.7-15c-11.8-17.2-13.9-30.2-12-50.6.3 1.6 4.2 11.7 4.5 11.7 17.5 11 9.7 28.2 7.5 39zm10.5-30.1c29.6-13.1 20.5-26.9 29.3-41.3-19.8 14.7-29 25-29.3 41.3z"/>
  <path fill="none" stroke="#00a400" stroke-linecap="round" stroke-width="2.2" d="M165.3 225.5c12-12 16.3-22 16.3-22"/>
  <g fill-rule="evenodd">
    <path fill="#ffe100" stroke="#e9bf00" stroke-width="2.4" d="m270.4 390.8 14.4.3c-47.7-44.8-139.3-64.3-126.5-146.6C145 333.8 233 342 270.4 390.8z"/>
    <path fill="#9d4916" stroke="#68300e" stroke-width="1.1" d="M165.8 226.8a4.6 4.6 0 1 1-9.2 0 4.6 4.6 0 0 1 9.2 0zM163 252a4.3 4.3 0 1 1-8.7 0 4.3 4.3 0 0 1 8.7 0zm4 36a3.8 3.8 0 1 1-7.6 0 3.8 3.8 0 0 1 7.6 0zm33.4 39.7a3.8 3.8 0 1 1-7.7 0 3.8 3.8 0 0 1 7.7 0zm4.8 11.4a3.8 3.8 0 1 1-7.6 0 3.8 3.8 0 0 1 7.6 0z"/>
  </g>
  <g fill="#fff" fill-rule="evenodd">
    <g stroke="#000" stroke-width="1.1">
      <path d="M222 372.3a16.7 16.7 0 0 1-5-6.2l-15-1.7-.2 8.6 20.3-.7z"/>
      <path stroke-linejoin="round" d="M112.3 362.2c8.7 1.6 21.8-.8 26.1 4.8 5.2 5.8-16 14.8-13 19.8 6.5 7 13.3 4.1 20.6.3 1.8-3.8 3.1-10.5 4-12.5-2.6-6.1-9.8-9.1-8-18.4 12.2-4.6 35.5-4.2 38-2.4 2 3.8.2 5.6.6 8.7-2 3.8-7.2 10.4-7.2 14 12.7 4.4 16-.8 27.5-.5 13.4.2 21.6 3.8 24.5-1.5-2-4.6-14.3-.9-19-3.9-2.3-.8-3.8-2.6-5.8-4.7s-7.7-2.2-8.6-7.3c2.4-10.9 18.1-9.2 20.7-10.9l41 2.8c7.4-.2 11.6 13.2 1.6 17.2s-39.7-6-52.5 1c-.7-2.9-10-7.1-10.6-7.3-4 1.2-11.6.8-11.6.8-1.9 3.5-4 6-5.9 9.5-8.5-3.7-16.5 2.9-25.8 1l-14.5 1.5-9.2-.8-14 4 10-8.8-8.9-6.4z"/>
      <path d="M111.7 360.5a3.9 3.9 0 1 1-7.7 0 3.9 3.9 0 0 1 7.7 0zm-1 19.1a3.9 3.9 0 1 1-7.8 0 3.9 3.9 0 0 1 7.8 0z"/>
    </g>
    <g stroke="#000" stroke-width="1.1">
      <path d="M284 372.4c2.5-2.3 4-3.8 5-6.3l15-1.6.3 8.6-20.3-.7z"/>
      <path stroke-linejoin="round" d="M393.7 362.3c-8.7 1.6-21.8-.8-26 4.8-5.2 5.8 16 14.8 13 19.8-6.6 7-13.3 4.1-20.7.3-1.7-3.8-3-10.5-4-12.5 2.7-6.1 9.9-9.2 8-18.5-12.1-4.5-35.4-4.1-38-2.4-2 3.9-.1 5.7-.5 8.7 2 4 7.1 10.5 7.1 14-12.7 4.5-16-.7-27.5-.4-13.4.2-21.6 3.8-24.5-1.6 2-4.6 14.3-.8 19-3.8 2.3-.8 3.8-2.7 5.9-4.7s7.7-2.2 8.5-7.3c-2.4-10.9-18.1-9.2-20.7-10.9l-41 2.8c-7.4-.2-11.5 13.2-1.5 17.2s39.6-6 52.5.9c.7-2.8 9.9-7 10.6-7.2 3.9 1.2 11.6.8 11.6.8 1.8 3.4 4 6 5.9 9.5 8.5-3.8 16.5 2.9 25.8 1l14.4 1.5 9.3-.8 14 4-10-8.8 8.8-6.4z"/>
      <path d="M394.4 360.5a3.9 3.9 0 1 0 7.7 0 3.9 3.9 0 0 0-7.8 0zm1 19.2a3.9 3.9 0 1 0 7.7 0 3.9 3.9 0 0 0-7.7 0z"/>
    </g>
    <path d="M252.8 351.3c-3.5-.7-4.7-.5-7-.7l-5.5 16.9c8.4.7 16.3.7 16.3.7-5.1-1-3.9-16.8-3.8-17z"/>
  </g>
  <g font-family="Trebuchet MS" font-size="9" font-weight="bold">
    <text x="448.6" y="344.3" transform="translate(-581.2 -248.8) scale(1.7767)">
      <tspan x="448.6" y="344.3">L</tspan>
    </text>
    <text x="453.6" y="344.6" transform="translate(-581.2 -248.8) scale(1.7767)">
      <tspan x="453.6" y="344.6">I</tspan>
    </text>
    <text x="456.7" y="345.1" transform="translate(-581.2 -248.8) scale(1.7767)">
      <tspan x="456.7" y="345.1">B</tspan>
    </text>
    <text x="462.6" y="345.5" transform="translate(-581.2 -248.8) scale(1.7767)">
      <tspan x="462.6" y="345.5">E</tspan>
    </text>
    <text x="468.3" y="345.6" transform="translate(-581.2 -248.8) scale(1.7767)">
      <tspan x="468.3" y="345.6">R</tspan>
    </text>
    <text x="473.9" y="345.4" transform="translate(-581.2 -248.8) scale(1.7767)">
      <tspan x="473.9" y="345.4">T</tspan>
    </text>
    <text x="479.3" y="344.5" transform="translate(-581.2 -248.8) scale(1.7767)">
      <tspan x="479.3" y="344.5">A</tspan>
    </text>
    <text x="485.5" y="344.3" transform="translate(-581.2 -248.8) scale(1.7767)">
      <tspan x="485.5" y="344.3">S</tspan>
    </text>
  </g>
  <path fill="none" stroke="#00a400" stroke-linecap="round" stroke-width="2.2" d="M161.4 339.8c10.8 1.3 25.7.4 32.2 0m-48.4-36.7c9 7.2 28.9 11.4 28.6 11.4m11.3 2c-2.9-15-6.1-18.5-8.7-28m-46.5-16.9c15.3 6.9 17.6 11.4 27.3 18.2m5.5-15c1.3-18.4 4-23.3 8.5-27.5m-41.3-2.3a2102 2102 0 0 0 23.7 25.3m-7.4-42.2c6.8 4.9 6.8 22.4 6.8 22.4"/>
</svg>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icons-al" viewBox="0 0 640 480">
  <path fill="#e41e20" d="M0 0h640v480H0z"/>
  <path id="a" d="M272 93.3c-4.6 0-12.3 1.5-12.2 5-13-2.1-14.3 3.2-13.5 8 1.2-1.9 2.7-3 3.9-3.1 1.7-.3 3.5.3 5.4 1.4a21.6 21.6 0 0 1 4.8 4.1c-4.6 1.1-8.2.4-11.8-.2a16.5 16.5 0 0 1-5.7-2.4c-1.5-1-2-2-4.3-4.3-2.7-2.8-5.6-2-4.7 2.3 2.1 4 5.6 5.8 10 6.6 2.1.3 5.3 1 8.9 1 3.6 0 7.6-.5 9.8 0-1.3.8-2.8 2.3-5.8 2.8-3 .6-7.5-1.8-10.3-2.4.3 2.3 3.3 4.5 9.1 5.7 9.6 2 17.5 3.6 22.8 6.5a37.3 37.3 0 0 1 10.9 9.2c4.7 5.5 5 9.8 5.2 10.8 1 8.8-2.1 13.8-7.9 15.4-2.8.7-8-.7-9.8-2.9-2-2.2-3.7-6-3.2-12 .5-2.2 3.1-8.3.9-9.5a273.7 273.7 0 0 0-32.3-15.1c-2.5-1-4.5 2.4-5.3 3.8a50.2 50.2 0 0 1-36-23.7c-4.2-7.6-11.3 0-10.1 7.3 1.9 8 8 13.8 15.4 18 7.5 4.1 17 8.2 26.5 8 5.2 1 5.1 7.6-1 8.9-12.1 0-21.8-.2-30.9-9-6.9-6.3-10.7 1.2-8.8 5.4 3.4 13.1 22.1 16.8 41 12.6 7.4-1.2 3 6.6 1 6.7-8 5.7-22.1 11.2-34.6 0-5.7-4.4-9.6-.8-7.4 5.5 5.5 16.5 26.7 13 41.2 5 3.7-2.1 7.1 2.7 2.6 6.4-18.1 12.6-27.1 12.8-35.3 8-10.2-4.1-11 7.2-5 11 6.7 4 23.8 1 36.4-7 5.4-4 5.6 2.3 2.2 4.8-14.9 12.9-20.8 16.3-36.3 14.2-7.7-.6-7.6 8.9-1.6 12.6 8.3 5.1 24.5-3.3 37-13.8 5.3-2.8 6.2 1.8 3.6 7.3a53.9 53.9 0 0 1-21.8 18c-7 2.7-13.6 2.3-18.3.7-5.8-2-6.5 4-3.3 9.4 1.9 3.3 9.8 4.3 18.4 1.3 8.6-3 17.8-10.2 24.1-18.5 5.5-4.9 4.9 1.6 2.3 6.2-12.6 20-24.2 27.4-39.5 26.2-6.7-1.2-8.3 4-4 9 7.6 6.2 17 6 25.4-.2 7.3-7 21.4-22.4 28.8-30.6 5.2-4.1 6.9 0 5.3 8.4-1.4 4.8-4.8 10-14.3 13.6-6.5 3.7-1.6 8.8 3.2 9 2.7 0 8.1-3.2 12.3-7.8 5.4-6.2 5.8-10.3 8.8-19.9 2.8-4.6 7.9-2.4 7.9 2.4-2.5 9.6-4.5 11.3-9.5 15.2-4.7 4.5 3.3 6 6 4.1 7.8-5.2 10.6-12 13.2-18.2 2-4.4 7.4-2.3 4.8 5-6 17.4-16 24.2-33.3 27.8-1.7.3-2.8 1.3-2.2 3.3l7 7c-10.7 3.2-19.4 5-30.2 8l-14.8-9.8c-1.3-3.2-2-8.2-9.8-4.7-5.2-2.4-7.7-1.5-10.6 1 4.2 0 6 1.2 7.7 3.1 2.2 5.7 7.2 6.3 12.3 4.7 3.3 2.7 5 4.9 8.4 7.7l-16.7-.5c-6-6.3-10.6-6-14.8-1-3.3.5-4.6.5-6.8 4.4 3.4-1.4 5.6-1.8 7.1-.3 6.3 3.7 10.4 2.9 13.5 0l17.5 1.1c-2.2 2-5.2 3-7.5 4.8-9-2.6-13.8 1-15.4 8.3a17 17 0 0 0-1.2 9.3c.8-3 2.3-5.5 4.9-7 8 2 11-1.3 11.5-6.1 4-3.2 9.8-3.9 13.7-7.1 4.6 1.4 6.8 2.3 11.4 3.8 1.6 5 5.3 6.9 11.3 5.6 7 .2 5.8 3.2 6.4 5.5 2-3.3 1.9-6.6-2.5-9.6-1.6-4.3-5.2-6.3-9.8-3.8-4.4-1.2-5.5-3-9.9-4.3 11-3.5 18.8-4.3 29.8-7.8l7.7 6.8c1.5.9 2.9 1.1 3.8 0 6.9-10 10-18.7 16.3-25.3 2.5-2.8 5.6-6.4 9-7.3 1.7-.5 3.8-.2 5.2 1.3 1.3 1.4 2.4 4.1 2 8.2-.7 5.7-2.1 7.6-3.7 11-1.7 3.5-3.6 5.6-5.7 8.3-4 5.3-9.4 8.4-12.6 10.5-6.4 4.1-9 2.3-14 2-6.4.7-8 3.8-2.8 8.1 4.8 2.6 9.2 2.9 12.8 2.2 3-.6 6.6-4.5 9.2-6.6 2.8-3.3 7.6.6 4.3 4.5-5.9 7-11.7 11.6-19 11.5-7.7 1-6.2 5.3-1.2 7.4 9.2 3.7 17.4-3.3 21.6-8 3.2-3.5 5.5-3.6 5 1.9-3.3 9.9-7.6 13.7-14.8 14.2-5.8-.6-5.9 4-1.6 7 9.6 6.6 16.6-4.8 19.9-11.6 2.3-6.2 5.9-3.3 6.3 1.8 0 6.9-3 12.4-11.3 19.4 6.3 10.1 13.7 20.4 20 30.5l19.2-214L320 139c-2-1.8-8.8-9.8-10.5-11-.7-.6-1-1-.1-1.4.9-.4 3-.8 4.5-1-4-4.1-7.6-5.4-15.3-7.6 1.9-.8 3.7-.4 9.3-.6a30.2 30.2 0 0 0-13.5-10.2c4.2-3 5-3.2 9.2-6.7a86.3 86.3 0 0 1-19.5-3.8 37.4 37.4 0 0 0-12-3.4zm.8 8.4c3.8 0 6.1 1.3 6.1 2.9 0 1.6-2.3 2.9-6.1 2.9s-6.2-1.5-6.2-3c0-1.6 2.4-2.8 6.2-2.8z"/>
  <use xlink:href="#a" width="100%" height="100%" transform="matrix(-1 0 0 1 640 0)"/>
</svg>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-es" viewBox="0 0 640 480">
  <path fill="#AA151B" d="M0 0h640v480H0z"/>
  <path fill="#F1BF00" d="M0 120h640v240H0z"/>
  <path fill="#ad1519" d="m127.3 213.3-.8-.1-1-1-.7-.4-.6-.8s-.7-1.1-.4-2c.3-.9.9-1.2 1.4-1.5a12 12 0 0 1 1.5-.5l1-.4 1.3-.3.5-.3c.2 0 .7 0 1-.2l1-.2 1.6.1h4.8c.4 0 1.2.3 1.4.4a35 35 0 0 0 2 .7c.5.1 1.6.3 2.2.6.5.3.9.7 1.1 1l.5 1v1.1l-.5.8-.6 1-.8.6s-.5.5-1 .4c-.4 0-4.8-.8-7.6-.8s-7.3.9-7.3.9"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".3" d="m127.3 213.3-.8-.1-1-1-.7-.4-.6-.8s-.7-1.1-.4-2c.3-.9.9-1.2 1.4-1.5a12 12 0 0 1 1.5-.5l1-.4 1.3-.3.5-.3c.2 0 .7 0 1-.2l1-.2 1.6.1h4.8c.4 0 1.2.3 1.4.4a35 35 0 0 0 2 .7c.5.1 1.6.3 2.2.6.5.3.9.7 1.1 1l.5 1v1.1l-.5.8-.6 1-.8.6s-.5.5-1 .4c-.4 0-4.8-.8-7.6-.8s-7.3.9-7.3.9z"/>
  <path fill="#c8b100" d="M133.3 207c0-1.3.6-2.3 1.3-2.3.8 0 1.4 1 1.4 2.4 0 1.3-.6 2.4-1.4 2.4s-1.3-1.1-1.3-2.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M133.3 207c0-1.3.6-2.3 1.3-2.3.8 0 1.4 1 1.4 2.4 0 1.3-.6 2.4-1.4 2.4s-1.3-1.1-1.3-2.5z"/>
  <path fill="#c8b100" d="M134 207c0-1.2.3-2.1.7-2.1.3 0 .6 1 .6 2.1 0 1.3-.3 2.2-.6 2.2-.4 0-.6-1-.6-2.2"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M134 207c0-1.2.3-2.1.7-2.1.3 0 .6 1 .6 2.1 0 1.3-.3 2.2-.6 2.2-.4 0-.6-1-.6-2.2z"/>
  <path fill="#c8b100" d="M133.8 204.5c0-.4.4-.8.8-.8s1 .4 1 .8c0 .5-.5.9-1 .9s-.8-.4-.8-.9"/>
  <path fill="#c8b100" d="M135.3 204.2v.6h-1.4v-.6h.5V203h-.7v-.6h.7v-.5h.5v.5h.6v.6h-.6v1.2h.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M135.3 204.2v.6h-1.4v-.6h.5V203h-.7v-.6h.7v-.5h.5v.5h.6v.6h-.6v1.2h.4"/>
  <path fill="#c8b100" d="M135.9 204.2v.6h-2.5v-.6h1V203h-.7v-.6h.7v-.5h.5v.5h.6v.6h-.6v1.2h1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M135.9 204.2v.6h-2.5v-.6h1V203h-.7v-.6h.7v-.5h.5v.5h.6v.6h-.6v1.2h1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M134.9 203.7c.4.1.6.4.6.8 0 .5-.4.9-.8.9s-1-.4-1-.9c0-.4.3-.7.7-.8"/>
  <path fill="#c8b100" d="M134.7 213.2H130v-1.1l-.3-1.2-.2-1.5c-1.3-1.7-2.5-2.8-2.9-2.5.1-.3.2-.6.5-.7 1.1-.7 3.5 1 5.2 3.6l.5.7h3.8l.4-.7c1.8-2.7 4.1-4.3 5.2-3.6.3.1.4.4.5.7-.4-.3-1.6.8-2.9 2.5l-.2 1.5-.2 1.2-.1 1.1h-4.7"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M134.7 213.2H130v-1.1l-.3-1.2-.2-1.5c-1.3-1.7-2.5-2.8-2.9-2.5.1-.3.2-.6.5-.7 1.1-.7 3.5 1 5.2 3.6l.5.7h3.8l.4-.7c1.8-2.7 4.1-4.3 5.2-3.6.3.1.4.4.5.7-.4-.3-1.6.8-2.9 2.5l-.2 1.5-.2 1.2-.1 1.1h-4.7z"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M126.8 206.8c1-.5 3 1.1 4.6 3.6m11-3.6c-.8-.5-2.8 1.1-4.5 3.6"/>
  <path fill="#c8b100" d="m127.8 215.3-.5-1a27.3 27.3 0 0 1 14.7 0l-.5.8a5.7 5.7 0 0 0-.3.8 22.9 22.9 0 0 0-6.6-.8c-2.6 0-5.2.3-6.5.8l-.3-.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m127.8 215.3-.5-1a27.3 27.3 0 0 1 14.7 0l-.5.8a5.7 5.7 0 0 0-.3.8 22.9 22.9 0 0 0-6.6-.8c-2.6 0-5.2.3-6.5.8l-.3-.6"/>
  <path fill="#c8b100" d="M134.6 217.7c2.4 0 5-.4 5.9-.6.6-.2 1-.5 1-.8 0-.2-.2-.3-.4-.4-1.4-.5-4-.8-6.5-.8s-5 .3-6.4.8c-.2 0-.3.2-.4.3 0 .4.3.7 1 .9 1 .2 3.5.6 5.8.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M134.6 217.7c2.4 0 5-.4 5.9-.6.6-.2 1-.5 1-.8 0-.2-.2-.3-.4-.4-1.4-.5-4-.8-6.5-.8s-5 .3-6.4.8c-.2 0-.3.2-.4.3 0 .4.3.7 1 .9 1 .2 3.5.6 5.8.6z"/>
  <path fill="#c8b100" d="m142.1 213.2-.5-.5s-.6.3-1.3.2c-.6 0-.9-1-.9-1s-.7.7-1.3.7c-.7 0-1-.6-1-.6s-.7.5-1.3.4c-.6 0-1.2-.8-1.2-.8s-.6.8-1.2.8c-.6.1-1-.5-1-.5s-.4.6-1.1.7-1.4-.6-1.4-.6-.5.7-1 1c-.5 0-1.2-.4-1.2-.4l-.2.5-.3.1.2.5a27 27 0 0 1 7.2-.9c3 0 5.5.4 7.4 1l.2-.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m142.1 213.2-.5-.5s-.6.3-1.3.2c-.6 0-.9-1-.9-1s-.7.7-1.3.7c-.7 0-1-.6-1-.6s-.7.5-1.3.4c-.6 0-1.2-.8-1.2-.8s-.6.8-1.2.8c-.6.1-1-.5-1-.5s-.4.6-1.1.7-1.4-.6-1.4-.6-.5.7-1 1c-.5 0-1.2-.4-1.2-.4l-.2.5-.3.1.2.5a27 27 0 0 1 7.2-.9c3 0 5.5.4 7.4 1l.2-.6z"/>
  <path fill="#c8b100" d="M134.7 210.7h.2a1 1 0 0 0 0 .4c0 .6.4 1 1 1a1 1 0 0 0 1-.7l.2-.3v.4c.1.5.6.8 1.1.8.6 0 1-.4 1-1v-.1l.4-.4.2.5a.9.9 0 0 0-.1.4 1 1 0 0 0 1 1c.4 0 .7-.2.9-.5l.2-.2v.3c0 .3.1.6.4.7 0 0 .4 0 1-.4l.7-.7v.4s-.5.8-1 1c-.2.2-.5.4-.8.3-.3 0-.6-.3-.7-.6-.2.2-.4.2-.7.2-.6 0-1.2-.3-1.4-.8-.3.3-.7.5-1.1.5a1.6 1.6 0 0 1-1.2-.6 1.6 1.6 0 0 1-1 .4 1.6 1.6 0 0 1-1.3-.6 1.6 1.6 0 0 1-2.4.2 1.6 1.6 0 0 1-1.2.6 1.5 1.5 0 0 1-1.1-.5c-.2.5-.8.8-1.4.8-.2 0-.5 0-.7-.2-.1.3-.4.6-.7.6-.3 0-.6 0-.9-.2l-1-1 .1-.5.8.7c.5.4.9.4.9.4.3 0 .4-.4.4-.7v-.3l.2.2c.2.3.5.5.9.5a1 1 0 0 0 1-1 .9.9 0 0 0 0-.4v-.5l.4.4a.7.7 0 0 0 0 .1c0 .6.5 1 1 1 .6 0 1-.3 1.1-.9v-.3l.2.3c.2.4.6.7 1 .7.7 0 1.1-.4 1.1-1a1 1 0 0 0 0-.3h.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M134.7 210.7h.2a1 1 0 0 0 0 .4c0 .6.4 1 1 1a1 1 0 0 0 1-.7l.2-.3v.4c.1.5.6.8 1.1.8.6 0 1-.4 1-1v-.1l.4-.4.2.5a.9.9 0 0 0-.1.4 1 1 0 0 0 1 1c.4 0 .7-.2.9-.5l.2-.2v.3c0 .3.1.6.4.7 0 0 .4 0 1-.4l.7-.7v.4s-.5.8-1 1c-.2.2-.5.4-.8.3-.3 0-.6-.3-.7-.6-.2.2-.4.2-.7.2-.6 0-1.2-.3-1.4-.8-.3.3-.7.5-1.1.5a1.6 1.6 0 0 1-1.2-.6 1.6 1.6 0 0 1-1 .4 1.6 1.6 0 0 1-1.3-.6 1.6 1.6 0 0 1-2.4.2 1.6 1.6 0 0 1-1.2.6 1.5 1.5 0 0 1-1.1-.5c-.2.5-.8.8-1.4.8-.2 0-.5 0-.7-.2-.1.3-.4.6-.7.6-.3 0-.6 0-.9-.2l-1-1 .1-.5.8.7c.5.4.9.4.9.4.3 0 .4-.4.4-.7v-.3l.2.2c.2.3.5.5.9.5a1 1 0 0 0 1-1 .9.9 0 0 0 0-.4v-.5l.4.4a.7.7 0 0 0 0 .1c0 .6.5 1 1 1 .6 0 1-.3 1.1-.9v-.3l.2.3c.2.4.6.7 1 .7.7 0 1.1-.4 1.1-1a1 1 0 0 0 0-.3h.3z"/>
  <path fill="#c8b100" d="M134.6 213.3c-2.9 0-5.5.4-7.3 1l-.3-.2.1-.3a27 27 0 0 1 7.5-1c3 0 5.7.4 7.6 1 0 0 .2.2.1.3l-.3.2a27.3 27.3 0 0 0-7.4-1"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".3" d="M134.6 213.3c-2.9 0-5.5.4-7.3 1l-.3-.2.1-.3a27 27 0 0 1 7.5-1c3 0 5.7.4 7.6 1 0 0 .2.2.1.3l-.3.2a27.3 27.3 0 0 0-7.4-1z"/>
  <path fill="#fff" d="M131.8 214.4c0-.3.2-.4.5-.4a.4.4 0 0 1 .4.4c0 .2-.2.4-.4.4a.4.4 0 0 1-.5-.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M131.8 214.4c0-.3.2-.4.5-.4a.4.4 0 0 1 .4.4c0 .2-.2.4-.4.4a.4.4 0 0 1-.5-.4z"/>
  <path fill="#ad1519" d="M134.7 214.5h-1c-.1 0-.3 0-.3-.3l.3-.3h2a.3.3 0 0 1 .2.3.3.3 0 0 1-.3.3h-1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M134.7 214.5h-1c-.1 0-.3 0-.3-.3l.3-.3h2a.3.3 0 0 1 .2.3.3.3 0 0 1-.3.3h-1"/>
  <path fill="#058e6e" d="M130 214.9h-.7c-.1 0-.3 0-.3-.2a.3.3 0 0 1 .2-.3l.7-.1.7-.1c.2 0 .3 0 .4.2a.3.3 0 0 1-.3.4h-.7"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M130 214.9h-.7c-.1 0-.3 0-.3-.2a.3.3 0 0 1 .2-.3l.7-.1.7-.1c.2 0 .3 0 .4.2a.3.3 0 0 1-.3.4h-.7"/>
  <path fill="#ad1519" d="m127.3 215.3.3-.4h.7l-.4.6-.6-.2"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m127.3 215.3.3-.4h.7l-.4.6-.6-.2"/>
  <path fill="#fff" d="M136.6 214.4c0-.3.2-.4.4-.4a.4.4 0 0 1 .5.4.4.4 0 0 1-.5.4.4.4 0 0 1-.4-.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M136.6 214.4c0-.3.2-.4.4-.4a.4.4 0 0 1 .5.4.4.4 0 0 1-.5.4.4.4 0 0 1-.4-.4z"/>
  <path fill="#058e6e" d="M139.3 214.9h.6a.3.3 0 0 0 .4-.2.3.3 0 0 0-.3-.3l-.6-.1-.7-.1c-.2 0-.3 0-.4.2 0 .2.1.3.3.4h.7"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M139.3 214.9h.6a.3.3 0 0 0 .4-.2.3.3 0 0 0-.3-.3l-.6-.1-.7-.1c-.2 0-.3 0-.4.2 0 .2.1.3.3.4h.7"/>
  <path fill="#ad1519" d="m142 215.4-.3-.5h-.7l.3.6.6-.1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m142 215.4-.3-.5h-.7l.3.6.6-.1"/>
  <path fill="#ad1519" d="M134.6 217.1a25 25 0 0 1-6-.6 25.5 25.5 0 0 1 12.1 0c-1.6.4-3.7.6-6 .6"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".3" d="M134.6 217.1a25 25 0 0 1-6-.6 25.5 25.5 0 0 1 12.1 0c-1.6.4-3.7.6-6 .6z"/>
  <path fill="#c8b100" d="m142 212-.1-.3c-.2 0-.3 0-.4.2 0 .2 0 .4.2.4 0 0 .2 0 .3-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m142 212-.1-.3c-.2 0-.3 0-.4.2 0 .2 0 .4.2.4 0 0 .2 0 .3-.3z"/>
  <path fill="#c8b100" d="M137.3 211.2c0-.2 0-.4-.2-.4 0 0-.2.1-.2.3 0 .2 0 .4.2.4l.3-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M137.3 211.2c0-.2 0-.4-.2-.4 0 0-.2.1-.2.3 0 .2 0 .4.2.4l.3-.3z"/>
  <path fill="#c8b100" d="m132 211.2.1-.4c.2 0 .3.1.3.3 0 .2 0 .4-.2.4l-.2-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m132 211.2.1-.4c.2 0 .3.1.3.3 0 .2 0 .4-.2.4l-.2-.3z"/>
  <path fill="#c8b100" d="m127.3 212 .1-.3c.2 0 .3 0 .4.2 0 .2 0 .4-.2.4 0 0-.2 0-.3-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m127.3 212 .1-.3c.2 0 .3 0 .4.2 0 .2 0 .4-.2.4 0 0-.2 0-.3-.3z"/>
  <path fill="#c8b100" d="m134.6 208.5-.8.5.6 1.3.2.1.2-.1.7-1.3-.9-.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m134.6 208.5-.8.5.6 1.3.2.1.2-.1.7-1.3-.9-.5"/>
  <path fill="#c8b100" d="m132.8 210.5.4.5 1.3-.4.1-.2-.1-.2-1.3-.3-.4.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m132.8 210.5.4.5 1.3-.4.1-.2-.1-.2-1.3-.3-.4.6"/>
  <path fill="#c8b100" d="m136.4 210.5-.3.5-1.3-.4-.2-.2.2-.2 1.3-.3.3.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m136.4 210.5-.3.5-1.3-.4-.2-.2.2-.2 1.3-.3.3.6"/>
  <path fill="#c8b100" d="m129.3 209-.7.7.9 1 .2.1.1-.1.3-1.3-.8-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m129.3 209-.7.7.9 1 .2.1.1-.1.3-1.3-.8-.3"/>
  <path fill="#c8b100" d="m128 211.2.4.5 1.2-.6v-.2l-.1-.2-1.3-.1-.3.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m128 211.2.4.5 1.2-.6v-.2l-.1-.2-1.3-.1-.3.6"/>
  <path fill="#c8b100" d="m131.5 210.5-.3.6H130l-.2-.2.1-.3 1.2-.6.5.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m131.5 210.5-.3.6H130l-.2-.2.1-.3 1.2-.6.5.5"/>
  <path fill="#c8b100" d="M126.6 211.4v.6l-1.4.2-.2-.1v-.2l1-.9.6.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M126.6 211.4v.6l-1.4.2-.2-.1v-.2l1-.9.6.4"/>
  <path fill="#c8b100" d="M129.2 210.9c0-.3.2-.5.5-.5s.5.2.5.5a.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M129.2 210.9c0-.3.2-.5.5-.5s.5.2.5.5a.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4z"/>
  <path fill="#c8b100" d="m140 209 .7.7-.9 1-.2.1-.1-.1-.3-1.3.8-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m140 209 .7.7-.9 1-.2.1-.1-.1-.3-1.3.8-.3"/>
  <path fill="#c8b100" d="m141.4 211.2-.5.5-1.2-.6v-.2l.1-.2 1.3-.1.3.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m141.4 211.2-.5.5-1.2-.6v-.2l.1-.2 1.3-.1.3.6"/>
  <path fill="#c8b100" d="m137.8 210.5.3.6h1.3l.2-.2-.1-.3-1.2-.6-.5.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m137.8 210.5.3.6h1.3l.2-.2-.1-.3-1.2-.6-.5.5"/>
  <path fill="#c8b100" d="m142.5 211.4.1.6 1.3.2.2-.1v-.2l-1-.9-.6.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m142.5 211.4.1.6 1.3.2.2-.1v-.2l-1-.9-.6.4"/>
  <path fill="#c8b100" d="M134.2 210.4a.5.5 0 0 1 .4-.4c.3 0 .5.2.5.4a.5.5 0 0 1-.5.5.5.5 0 0 1-.4-.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M134.2 210.4a.5.5 0 0 1 .4-.4c.3 0 .5.2.5.4a.5.5 0 0 1-.5.5.5.5 0 0 1-.4-.5z"/>
  <path fill="#c8b100" d="M139.1 210.9c0-.3.3-.5.5-.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M139.1 210.9c0-.3.3-.5.5-.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4z"/>
  <path fill="#c8b100" d="m124.8 212.2-.6-.7c-.2-.2-.7-.3-.7-.3 0-.1.3-.3.6-.3a.5.5 0 0 1 .4.2v-.2s.3 0 .4.3v1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m124.8 212.2-.6-.7c-.2-.2-.7-.3-.7-.3 0-.1.3-.3.6-.3a.5.5 0 0 1 .4.2v-.2s.3 0 .4.3v1z"/>
  <path fill="#c8b100" d="M124.8 212c.1-.2.4-.2.5 0 .2.1.3.3.2.5l-.5-.1c-.2-.1-.3-.4-.2-.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M124.8 212c.1-.2.4-.2.5 0 .2.1.3.3.2.5l-.5-.1c-.2-.1-.3-.4-.2-.5z"/>
  <path fill="#c8b100" d="m144.3 212.2.6-.7c.2-.2.7-.3.7-.3 0-.1-.3-.3-.6-.3a.6.6 0 0 0-.4.2v-.2s-.3 0-.4.3v.7l.1.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m144.3 212.2.6-.7c.2-.2.7-.3.7-.3 0-.1-.3-.3-.6-.3a.6.6 0 0 0-.4.2v-.2s-.3 0-.4.3v.7l.1.3z"/>
  <path fill="#c8b100" d="M144.3 212c0-.2-.3-.2-.5 0-.2.1-.2.3-.1.5l.5-.1c.2-.1.2-.4.1-.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M144.3 212c0-.2-.3-.2-.5 0-.2.1-.2.3-.1.5l.5-.1c.2-.1.2-.4.1-.5z"/>
  <path fill="#c8b100" d="M124 223h21.4v-5.5H124v5.6z"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M124 223h21.4v-5.5H124v5.6z"/>
  <path fill="#c8b100" d="M126.2 226.8a1 1 0 0 1 .4 0h16.5a1.4 1.4 0 0 1-1-1.2c0-.6.5-1.1 1-1.3a1.7 1.7 0 0 1-.4 0h-16a1.4 1.4 0 0 1-.5 0c.6.2 1 .7 1 1.3a1.3 1.3 0 0 1-1 1.2"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".4" d="M126.2 226.8a1 1 0 0 1 .4 0h16.5a1.4 1.4 0 0 1-1-1.2c0-.6.5-1.1 1-1.3a1.7 1.7 0 0 1-.4 0h-16a1.4 1.4 0 0 1-.5 0c.6.2 1 .7 1 1.3a1.3 1.3 0 0 1-1 1.2z"/>
  <path fill="#c8b100" d="M126.6 226.8h16c.6 0 1 .3 1 .7 0 .4-.4.8-1 .8h-16c-.5 0-1-.4-1-.8s.5-.8 1-.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M126.6 226.8h16c.6 0 1 .3 1 .7 0 .4-.4.8-1 .8h-16c-.5 0-1-.4-1-.8s.5-.8 1-.8z"/>
  <path fill="#c8b100" d="M126.6 223h16c.6 0 1 .4 1 .7 0 .4-.4.6-1 .6h-16c-.5 0-1-.2-1-.6 0-.3.5-.6 1-.6"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M126.6 223h16c.6 0 1 .4 1 .7 0 .4-.4.6-1 .6h-16c-.5 0-1-.2-1-.6 0-.3.5-.6 1-.6z"/>
  <path fill="#005bbf" d="M149.6 317.4c-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8c-1.4 0-2.7.3-3.7.8a8.3 8.3 0 0 1-3.8.8c-1.5 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.7-.8 8 8 0 0 0-3.7.8 8.3 8.3 0 0 1-3.8.8v2.4c1.5 0 2.8-.4 3.8-.9a8.2 8.2 0 0 1 3.7-.8c1.4 0 2.7.3 3.7.8s2.2.9 3.7.9a8.4 8.4 0 0 0 3.8-.9c1-.5 2.3-.8 3.7-.8 1.5 0 2.8.3 3.8.8s2.2.9 3.7.9v-2.4"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M149.6 317.4c-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8c-1.4 0-2.7.3-3.7.8a8.3 8.3 0 0 1-3.8.8c-1.5 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.7-.8 8 8 0 0 0-3.7.8 8.3 8.3 0 0 1-3.8.8v2.4c1.5 0 2.8-.4 3.8-.9a8.2 8.2 0 0 1 3.7-.8c1.4 0 2.7.3 3.7.8s2.2.9 3.7.9a8.4 8.4 0 0 0 3.8-.9c1-.5 2.3-.8 3.7-.8 1.5 0 2.8.3 3.8.8s2.2.9 3.7.9v-2.4z"/>
  <path fill="#ccc" d="M149.6 319.8a8 8 0 0 1-3.7-.9 8.3 8.3 0 0 0-3.8-.8c-1.4 0-2.7.3-3.7.8s-2.3.9-3.8.9-2.8-.4-3.7-.9a8.4 8.4 0 0 0-3.7-.8 8.2 8.2 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v2.3c1.5 0 2.8-.4 3.8-.9a8.1 8.1 0 0 1 3.7-.7c1.4 0 2.7.2 3.7.7a8.3 8.3 0 0 0 7.5 0 8.5 8.5 0 0 1 7.5.1 8.1 8.1 0 0 0 3.7.8v-2.3"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M149.6 319.8a8 8 0 0 1-3.7-.9 8.3 8.3 0 0 0-3.8-.8c-1.4 0-2.7.3-3.7.8s-2.3.9-3.8.9-2.8-.4-3.7-.9a8.4 8.4 0 0 0-3.7-.8 8.2 8.2 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v2.3c1.5 0 2.8-.4 3.8-.9a8.1 8.1 0 0 1 3.7-.7c1.4 0 2.7.2 3.7.7a8.3 8.3 0 0 0 7.5 0 8.5 8.5 0 0 1 7.5.1 8.1 8.1 0 0 0 3.7.8v-2.3"/>
  <path fill="#005bbf" d="M149.6 322a7 7 0 0 1-3.7-.8 8.3 8.3 0 0 0-3.8-.7c-1.4 0-2.7.2-3.7.7-1 .6-2.3.9-3.8.9s-2.8-.4-3.7-.9a8.4 8.4 0 0 0-3.7-.8 8 8 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v2.3c1.5 0 2.8-.3 3.8-.9a10.2 10.2 0 0 1 7.4 0 7 7 0 0 0 3.7.9 8.4 8.4 0 0 0 3.8-.8c1-.5 2.3-.8 3.7-.8 1.5 0 2.8.3 3.8.8s2.2.8 3.7.8V322"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M149.6 322a7 7 0 0 1-3.7-.8 8.3 8.3 0 0 0-3.8-.7c-1.4 0-2.7.2-3.7.7-1 .6-2.3.9-3.8.9s-2.8-.4-3.7-.9a8.4 8.4 0 0 0-3.7-.8 8 8 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v2.3c1.5 0 2.8-.3 3.8-.9a10.2 10.2 0 0 1 7.4 0 7 7 0 0 0 3.7.9 8.4 8.4 0 0 0 3.8-.8c1-.5 2.3-.8 3.7-.8 1.5 0 2.8.3 3.8.8s2.2.8 3.7.8V322"/>
  <path fill="#ccc" d="M149.6 326.7a8 8 0 0 1-3.7-.8c-1-.5-2.3-.8-3.7-.8a8.4 8.4 0 0 0-3.8.8c-1 .5-2.3.8-3.8.8a7 7 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.7-.7c-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v-2.3a8.3 8.3 0 0 0 3.8-.9 10.2 10.2 0 0 1 7.4 0 8 8 0 0 0 3.7.9 8.4 8.4 0 0 0 3.8-.8c1-.5 2.3-.8 3.8-.8 1.4 0 2.7.3 3.7.8s2.3.8 3.7.8v2.3"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M149.6 326.7a8 8 0 0 1-3.7-.8c-1-.5-2.3-.8-3.7-.8a8.4 8.4 0 0 0-3.8.8c-1 .5-2.3.8-3.8.8a7 7 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.7-.7c-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v-2.3a8.3 8.3 0 0 0 3.8-.9 10.2 10.2 0 0 1 7.4 0 8 8 0 0 0 3.7.9 8.4 8.4 0 0 0 3.8-.8c1-.5 2.3-.8 3.8-.8 1.4 0 2.7.3 3.7.8s2.3.8 3.7.8v2.3"/>
  <path fill="#005bbf" d="M149.6 329a8.1 8.1 0 0 1-3.7-.8c-1-.5-2.3-.8-3.7-.8a8.4 8.4 0 0 0-3.8.8c-1 .5-2.3.8-3.8.8a7 7 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.7-.7c-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v-2.3a8.3 8.3 0 0 0 3.8-.8c1-.5 2.3-.8 3.7-.8 1.4 0 2.7.3 3.7.7a8.4 8.4 0 0 0 7.5 0c1-.4 2.3-.7 3.8-.7 1.4 0 2.7.3 3.7.8s2.2.8 3.7.8v2.3"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M149.6 329a8.1 8.1 0 0 1-3.7-.8c-1-.5-2.3-.8-3.7-.8a8.4 8.4 0 0 0-3.8.8c-1 .5-2.3.8-3.8.8a7 7 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.7-.7c-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v-2.3a8.3 8.3 0 0 0 3.8-.8c1-.5 2.3-.8 3.7-.8 1.4 0 2.7.3 3.7.7a8.4 8.4 0 0 0 7.5 0c1-.4 2.3-.7 3.8-.7 1.4 0 2.7.3 3.7.8s2.2.8 3.7.8v2.3z"/>
  <path fill="#c8b100" d="m126.2 308 .2.5c0 1.5-1.3 2.6-2.7 2.6h22a2.7 2.7 0 0 1-2.7-2.6v-.5a1.3 1.3 0 0 1-.3 0h-16a1.4 1.4 0 0 1-.5 0"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".4" d="m126.2 308 .2.5c0 1.5-1.3 2.6-2.7 2.6h22a2.7 2.7 0 0 1-2.7-2.6v-.5a1.3 1.3 0 0 1-.3 0h-16a1.4 1.4 0 0 1-.5 0z"/>
  <path fill="#c8b100" d="M126.6 306.5h16c.6 0 1 .3 1 .8 0 .4-.4.7-1 .7h-16c-.5 0-1-.3-1-.8 0-.4.5-.7 1-.7"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M126.6 306.5h16c.6 0 1 .3 1 .8 0 .4-.4.7-1 .7h-16c-.5 0-1-.3-1-.8 0-.4.5-.7 1-.7z"/>
  <path fill="#c8b100" d="M123.7 316.7h22V311h-22v5.6z"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M123.7 316.7h22V311h-22v5.6z"/>
  <path fill="#ad1519" d="M122 286.7c-2.2 1.2-3.7 2.5-3.4 3.2 0 .6.8 1 1.8 1.6 1.5 1.1 2.5 3 1.7 4a5.5 5.5 0 0 0-.1-8.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M122 286.7c-2.2 1.2-3.7 2.5-3.4 3.2 0 .6.8 1 1.8 1.6 1.5 1.1 2.5 3 1.7 4a5.5 5.5 0 0 0-.1-8.8z"/>
  <path fill="#ccc" d="M126.8 305.6h15.6V229h-15.6v76.5z"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M138 229.2v76.3m1.7-76.3v76.3m-12.9 0h15.6v-76.4h-15.6v76.5z"/>
  <path fill="#ad1519" d="M158.4 257.7a49.6 49.6 0 0 0-23.3-2c-9.4 1.6-16.5 5.3-15.9 8.4v.2l-3.5-8.2c-.6-3.3 7.2-7.5 17.6-9.2a43 43 0 0 1 9.2-.7c6.6 0 12.4.8 15.8 2.1v9.4"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".4" d="M158.4 257.7a49.6 49.6 0 0 0-23.3-2c-9.4 1.6-16.5 5.3-15.9 8.4v.2l-3.5-8.2c-.6-3.3 7.2-7.5 17.6-9.2a43 43 0 0 1 9.2-.7c6.6 0 12.4.8 15.8 2.1v9.4"/>
  <path fill="#ad1519" d="M126.8 267.3c-4.3-.3-7.3-1.4-7.6-3.2-.3-1.5 1.2-3 3.8-4.5 1.2.1 2.5.3 3.8.3v7.4"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M126.8 267.3c-4.3-.3-7.3-1.4-7.6-3.2-.3-1.5 1.2-3 3.8-4.5 1.2.1 2.5.3 3.8.3v7.4"/>
  <path fill="#ad1519" d="M142.5 261.5c2.7.4 4.7 1 5.7 1.9l.1.2c.5 1-1.9 3-5.9 5.4v-7.5"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M142.5 261.5c2.7.4 4.7 1 5.7 1.9l.1.2c.5 1-1.9 3-5.9 5.4v-7.5"/>
  <path fill="#ad1519" d="M117.1 282c-.4-1.2 3.8-3.6 9.8-5.8l7.8-3.2c8.3-3.7 14.4-7.9 13.6-9.4v-.2c.4.4 1 8 1 8 .8 1.3-4.8 5.5-12.4 9.1-2.5 1.2-7.6 3-10 4-4.4 1.4-8.7 4.3-8.3 5.3l-1.5-7.7"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".4" d="M117.1 282c-.4-1.2 3.8-3.6 9.8-5.8l7.8-3.2c8.3-3.7 14.4-7.9 13.6-9.4v-.2c.4.4 1 8 1 8 .8 1.3-4.8 5.5-12.4 9.1-2.5 1.2-7.6 3-10 4-4.4 1.4-8.7 4.3-8.3 5.3l-1.5-7.7z"/>
  <path fill="#c8b100" d="M125.8 254c1.9-.6 3.1-1.5 2.5-3-.4-1-1.4-1-2.8-.6l-2.6 1 2.3 5.8.8-.3.8-.3-1-2.5zm-1.2-2.7.7-.3c.5-.2 1.2.1 1.4.8.2.5.2 1-.5 1.5a4.4 4.4 0 0 1-.6.3l-1-2.3m7.3-2.5-.9.3h-.8l1.3 6.1 4.3-.8-.2-.4v-.4l-2.5.6-1.2-5.3m8.4 5.2c.8-2.2 1.7-4.3 2.7-6.4a5.3 5.3 0 0 1-1 0 54.8 54.8 0 0 1-1.8 4.6l-2.4-4.3-1 .1h-1a131.4 131.4 0 0 1 3.5 6h1m8.8-4.7.4-.9a3.4 3.4 0 0 0-1.7-.6c-1.7-.1-2.7.6-2.8 1.7-.2 2.1 3.2 2 3 3.4 0 .6-.7.9-1.4.8-.8 0-1.4-.5-1.4-1.2h-.3a7.3 7.3 0 0 1-.4 1.1 4 4 0 0 0 1.8.6c1.7.2 3-.5 3.2-1.7.2-2-3.3-2.1-3.1-3.4 0-.5.4-.8 1.3-.7.7 0 1 .4 1.2.9h.2"/>
  <path fill="#ad1519" d="M277.9 211.6s-.7.8-1.3.9c-.5 0-1.1-.5-1.1-.5s-.5.5-1 .6c-.6.1-1.4-.6-1.4-.6l-1 1c-.6 0-1.1-.3-1.1-.3s-.3.4-.7.6h-.4l-.6-.4-.7-.7-.5-.3-.4-1v-.5c-.1-.6.8-1.4 2.2-1.7a3.9 3.9 0 0 1 2 0c.5-.5 1.7-.8 3-.8s2.4.3 3 .7a5.5 5.5 0 0 1 2.9-.7c1.3 0 2.5.3 3 .8.5-.2 1.2-.2 2 0 1.4.3 2.3 1 2.2 1.7v.5l-.4 1-.6.3-.6.7-.6.3s-.3.2-.4 0c-.4-.1-.7-.5-.7-.5s-.6.4-1 .2c-.5-.2-1-1-1-1s-.9.8-1.4.7c-.6-.1-1-.6-1-.6s-.7.6-1.2.5c-.5-.1-1.2-.9-1.2-.9"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M277.9 211.6s-.7.8-1.3.9c-.5 0-1.1-.5-1.1-.5s-.5.5-1 .6c-.6.1-1.4-.6-1.4-.6l-1 1c-.6 0-1.1-.3-1.1-.3s-.3.4-.7.6h-.4l-.6-.4-.7-.7-.5-.3-.4-1v-.5c-.1-.6.8-1.4 2.2-1.7a3.9 3.9 0 0 1 2 0c.5-.5 1.7-.8 3-.8s2.4.3 3 .7a5.5 5.5 0 0 1 2.9-.7c1.3 0 2.5.3 3 .8.5-.2 1.2-.2 2 0 1.4.3 2.3 1 2.2 1.7v.5l-.4 1-.6.3-.6.7-.6.3s-.3.2-.4 0c-.4-.1-.7-.5-.7-.5s-.6.4-1 .2c-.5-.2-1-1-1-1s-.9.8-1.4.7c-.6-.1-1-.6-1-.6s-.7.6-1.2.5c-.5-.1-1.2-.9-1.2-.9z"/>
  <path fill="#c8b100" d="M276.5 207.6c0-1 .6-2 1.3-2 .8 0 1.3 1 1.3 2s-.5 1.8-1.3 1.8c-.7 0-1.3-.8-1.3-1.9"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M276.5 207.6c0-1 .6-2 1.3-2 .8 0 1.3 1 1.3 2s-.5 1.8-1.3 1.8c-.7 0-1.3-.8-1.3-1.9z"/>
  <path fill="#c8b100" d="M277.3 207.6c0-1 .2-1.8.5-1.8.4 0 .7.8.7 1.8s-.3 1.7-.6 1.7c-.4 0-.6-.8-.6-1.8"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M277.3 207.6c0-1 .2-1.8.5-1.8.4 0 .7.8.7 1.8s-.3 1.7-.6 1.7c-.4 0-.6-.8-.6-1.8z"/>
  <path fill="#c8b100" d="M271 215.3a4.5 4.5 0 0 0-.5-1 27.4 27.4 0 0 1 14.8 0l-.6.8a5.2 5.2 0 0 0-.3.8 22.9 22.9 0 0 0-6.6-.8c-2.6 0-5.2.3-6.6.8l-.2-.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M271 215.3a4.5 4.5 0 0 0-.5-1 27.4 27.4 0 0 1 14.8 0l-.6.8a5.2 5.2 0 0 0-.3.8 22.9 22.9 0 0 0-6.6-.8c-2.6 0-5.2.3-6.6.8l-.2-.6"/>
  <path fill="#c8b100" d="M277.8 217.7c2.4 0 5-.4 5.9-.6.6-.2 1-.5 1-.8 0-.2-.2-.3-.4-.4a24.1 24.1 0 0 0-6.5-.8c-2.5 0-5 .3-6.4.8-.2 0-.3.2-.4.3 0 .4.3.7 1 .9 1 .2 3.5.6 5.8.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M277.8 217.7c2.4 0 5-.4 5.9-.6.6-.2 1-.5 1-.8 0-.2-.2-.3-.4-.4a24.1 24.1 0 0 0-6.5-.8c-2.5 0-5 .3-6.4.8-.2 0-.3.2-.4.3 0 .4.3.7 1 .9 1 .2 3.5.6 5.8.6z"/>
  <path fill="#fff" d="M283.5 208.4c0-.2.2-.4.4-.4s.5.2.5.4-.2.4-.5.4a.4.4 0 0 1-.4-.4"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M283.5 208.4c0-.2.2-.4.4-.4s.5.2.5.4-.2.4-.5.4a.4.4 0 0 1-.4-.4zm-.2-1.4a.4.4 0 0 1 .4-.4c.2 0 .4.1.4.4s-.2.4-.4.4a.4.4 0 0 1-.4-.4zm-1.1-1c0-.2.2-.3.4-.3s.4.1.4.4c0 .2-.2.4-.4.4a.4.4 0 0 1-.4-.5zm-1.4-.4c0-.2.2-.4.4-.4.3 0 .5.2.5.4s-.2.4-.4.4-.5-.2-.5-.4zm-1.4 0c0-.2.2-.3.5-.3s.4.1.4.4c0 .2-.2.4-.4.4a.4.4 0 0 1-.5-.4z"/>
  <path fill="none" stroke="#000" stroke-linecap="round" stroke-width=".3" d="m287.8 211.2.2-1a2.7 2.7 0 0 0-2.7-2.8c-.5 0-1 .1-1.3.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m283 209.2.2-.8c0-1.1-1.1-2-2.5-2-.6 0-1.2.2-1.6.4"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M288.2 210c0-.3.2-.5.4-.5s.4.2.4.4c0 .3-.2.4-.4.4s-.4-.1-.4-.4zm-.2-1.6c0-.2.2-.4.4-.4a.4.4 0 0 1 .5.4c0 .2-.2.4-.4.4-.3 0-.5-.2-.5-.4zm-1-1.1a.4.4 0 0 1 .5-.4c.2 0 .4.1.4.4a.4.4 0 0 1-.4.4.4.4 0 0 1-.5-.4zm-1.3-.7c0-.2.2-.4.5-.4s.4.2.4.4c0 .3-.2.5-.4.5a.4.4 0 0 1-.5-.5zm-1.4.1c0-.2.2-.4.5-.4s.4.2.4.4-.2.4-.4.4-.5-.2-.5-.4z"/>
  <path fill="#c8b100" d="m285.3 213.2-.5-.5s-.6.3-1.3.2c-.6 0-.9-1-.9-1s-.7.7-1.3.7c-.7 0-1-.6-1-.6s-.7.5-1.3.4c-.6 0-1.2-.8-1.2-.8s-.6.8-1.2.8c-.6.1-1-.5-1-.5s-.3.6-1.1.7-1.4-.6-1.4-.6-.4.7-1 1c-.5 0-1.2-.4-1.2-.4l-.1.5-.3.1.1.5a27 27 0 0 1 7.3-.9c2.8 0 5.4.4 7.3 1l.2-.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m285.3 213.2-.5-.5s-.6.3-1.3.2c-.6 0-.9-1-.9-1s-.7.7-1.3.7c-.7 0-1-.6-1-.6s-.7.5-1.3.4c-.6 0-1.2-.8-1.2-.8s-.6.8-1.2.8c-.6.1-1-.5-1-.5s-.3.6-1.1.7-1.4-.6-1.4-.6-.4.7-1 1c-.5 0-1.2-.4-1.2-.4l-.1.5-.3.1.1.5a27 27 0 0 1 7.3-.9c2.8 0 5.4.4 7.3 1l.2-.6z"/>
  <path fill="#fff" d="M271.3 208.4c0-.2.2-.4.4-.4s.4.2.4.4a.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M271.3 208.4c0-.2.2-.4.4-.4s.4.2.4.4a.4.4 0 0 1-.4.4.4.4 0 0 1-.4-.4zm.2-1.4c0-.3.2-.4.4-.4s.5.1.5.4-.2.4-.5.4a.4.4 0 0 1-.4-.4zm1-1c0-.2.3-.3.5-.3s.5.1.5.4c0 .2-.2.4-.5.4a.4.4 0 0 1-.4-.5zm1.4-.4c0-.2.2-.4.5-.4s.4.2.4.4-.2.4-.4.4-.5-.2-.5-.4zm1.4 0c0-.2.2-.3.5-.3.2 0 .4.1.4.4 0 .2-.2.4-.4.4a.4.4 0 0 1-.5-.4z"/>
  <path fill="none" stroke="#000" stroke-linecap="round" stroke-width=".3" d="M267.8 211.2a2.8 2.8 0 0 1-.2-1 2.7 2.7 0 0 1 2.7-2.8c.5 0 1 .1 1.4.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M272.7 209.2a1.7 1.7 0 0 1-.3-.8c0-1 1.2-2 2.6-2a3 3 0 0 1 1.5.4"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M266.6 210c0-.3.2-.5.4-.5.3 0 .4.2.4.4a.4.4 0 0 1-.4.4c-.2 0-.4-.1-.4-.4zm.1-1.6c0-.2.3-.4.5-.4s.4.2.4.4-.2.4-.4.4-.4-.2-.4-.4zm1-1.1c0-.3.2-.4.5-.4a.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4.4.4 0 0 1-.5-.4zm1.3-.7c0-.2.2-.4.5-.4.2 0 .4.2.4.4 0 .3-.2.5-.4.5a.4.4 0 0 1-.5-.5zm1.4.1c0-.2.2-.4.5-.4a.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4c-.3 0-.5-.2-.5-.4z"/>
  <path fill="#c8b100" d="M277.9 210.7h.2a1 1 0 0 0 0 .4c0 .6.5 1 1 1a1 1 0 0 0 1-.7l.2-.3v.4c.1.5.6.8 1.1.8.6 0 1-.4 1-1a.7.7 0 0 0 0-.1l.4-.4.2.5a1 1 0 0 0-.1.4 1 1 0 0 0 1 1c.4 0 .7-.2.9-.5l.2-.2v.3c0 .3.1.6.4.7 0 0 .4 0 1-.4s.7-.7.7-.7v.4s-.5.8-1 1c-.2.2-.5.4-.8.3-.3 0-.6-.3-.7-.6a1.5 1.5 0 0 1-.7.2c-.6 0-1.2-.3-1.4-.8a1.5 1.5 0 0 1-1.1.5c-.5 0-1-.2-1.2-.6a1.5 1.5 0 0 1-1 .4c-.6 0-1-.2-1.4-.6-.2.4-.7.6-1.2.6-.4 0-.8-.1-1-.4a1.6 1.6 0 0 1-1.3.6c-.4 0-.8-.2-1.1-.5-.2.5-.8.8-1.4.8-.2 0-.5 0-.7-.2-.1.3-.4.6-.7.6-.3 0-.6 0-.9-.2a4.2 4.2 0 0 1-1-1l.1-.5.8.7c.5.4.9.4.9.4.3 0 .4-.4.4-.7v-.3l.2.2c.2.3.5.5.9.5a1 1 0 0 0 1-1 1 1 0 0 0 0-.4v-.5l.4.4v.1c0 .6.5 1 1 1 .6 0 1-.3 1.1-.9v-.3l.2.3c.2.4.6.7 1 .7.6 0 1.1-.4 1.1-1a1 1 0 0 0 0-.3h.2"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M277.9 210.7h.2a1 1 0 0 0 0 .4c0 .6.5 1 1 1a1 1 0 0 0 1-.7l.2-.3v.4c.1.5.6.8 1.1.8.6 0 1-.4 1-1a.7.7 0 0 0 0-.1l.4-.4.2.5a1 1 0 0 0-.1.4 1 1 0 0 0 1 1c.4 0 .7-.2.9-.5l.2-.2v.3c0 .3.1.6.4.7 0 0 .4 0 1-.4s.7-.7.7-.7v.4s-.5.8-1 1c-.2.2-.5.4-.8.3-.3 0-.6-.3-.7-.6a1.5 1.5 0 0 1-.7.2c-.6 0-1.2-.3-1.4-.8a1.5 1.5 0 0 1-1.1.5c-.5 0-1-.2-1.2-.6a1.5 1.5 0 0 1-1 .4c-.6 0-1-.2-1.4-.6-.2.4-.7.6-1.2.6-.4 0-.8-.1-1-.4a1.6 1.6 0 0 1-1.3.6c-.4 0-.8-.2-1.1-.5-.2.5-.8.8-1.4.8-.2 0-.5 0-.7-.2-.1.3-.4.6-.7.6-.3 0-.6 0-.9-.2a4.2 4.2 0 0 1-1-1l.1-.5.8.7c.5.4.9.4.9.4.3 0 .4-.4.4-.7v-.3l.2.2c.2.3.5.5.9.5a1 1 0 0 0 1-1 1 1 0 0 0 0-.4v-.5l.4.4v.1c0 .6.5 1 1 1 .6 0 1-.3 1.1-.9v-.3l.2.3c.2.4.6.7 1 .7.6 0 1.1-.4 1.1-1a1 1 0 0 0 0-.3h.2z"/>
  <path fill="#c8b100" d="M277.8 213.3c-2.9 0-5.5.4-7.3 1l-.3-.2.1-.3c2-.6 4.6-1 7.5-1 3 0 5.7.4 7.6 1 0 0 .2.2.1.3l-.3.2a27 27 0 0 0-7.4-1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M277.8 213.3c-2.9 0-5.5.4-7.3 1l-.3-.2.1-.3c2-.6 4.6-1 7.5-1 3 0 5.7.4 7.6 1 0 0 .2.2.1.3l-.3.2a27 27 0 0 0-7.4-1z"/>
  <path fill="#fff" d="M275 214.4c0-.3.2-.4.5-.4a.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4c-.3 0-.5-.2-.5-.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M275 214.4c0-.3.2-.4.5-.4a.4.4 0 0 1 .4.4.4.4 0 0 1-.4.4c-.3 0-.5-.2-.5-.4z"/>
  <path fill="#ad1519" d="M277.9 214.5h-1c-.1 0-.3 0-.3-.3l.3-.3h2a.3.3 0 0 1 .2.3.3.3 0 0 1-.3.3h-1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M277.9 214.5h-1c-.1 0-.3 0-.3-.3l.3-.3h2a.3.3 0 0 1 .2.3.3.3 0 0 1-.3.3h-1"/>
  <path fill="#058e6e" d="M273.2 214.9h-.6a.3.3 0 0 1-.4-.2.3.3 0 0 1 .3-.3l.6-.1.7-.1c.2 0 .3 0 .4.2a.3.3 0 0 1-.3.4h-.7"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M273.2 214.9h-.6a.3.3 0 0 1-.4-.2.3.3 0 0 1 .3-.3l.6-.1.7-.1c.2 0 .3 0 .4.2a.3.3 0 0 1-.3.4h-.7"/>
  <path fill="#ad1519" d="m270.5 215.3.3-.4h.7l-.4.6-.6-.2"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m270.5 215.3.3-.4h.7l-.4.6-.6-.2"/>
  <path fill="#fff" d="M279.8 214.4c0-.3.2-.4.4-.4.3 0 .5.1.5.4 0 .2-.2.4-.5.4a.4.4 0 0 1-.4-.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M279.8 214.4c0-.3.2-.4.4-.4.3 0 .5.1.5.4 0 .2-.2.4-.5.4a.4.4 0 0 1-.4-.4z"/>
  <path fill="#058e6e" d="M282.5 214.9h.7a.3.3 0 0 0 .3-.2.3.3 0 0 0-.2-.3l-.7-.1-.7-.1c-.2 0-.3 0-.4.2 0 .2.1.3.3.4h.7"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M282.5 214.9h.7a.3.3 0 0 0 .3-.2.3.3 0 0 0-.2-.3l-.7-.1-.7-.1c-.2 0-.3 0-.4.2 0 .2.1.3.3.4h.7"/>
  <path fill="#ad1519" d="m285.1 215.4-.2-.5h-.7l.3.6.6-.1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m285.1 215.4-.2-.5h-.7l.3.6.6-.1"/>
  <path fill="#ad1519" d="M277.8 217.1a25 25 0 0 1-6-.6 25.4 25.4 0 0 1 6-.7c2.4 0 4.5.3 6.1.7-1.6.4-3.7.6-6 .6"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".3" d="M277.8 217.1a25 25 0 0 1-6-.6 25.4 25.4 0 0 1 6-.7c2.4 0 4.5.3 6.1.7-1.6.4-3.7.6-6 .6z"/>
  <path fill="#c8b100" d="m285.2 212-.1-.3c-.2 0-.3 0-.4.2l.1.4c.2 0 .3 0 .4-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m285.2 212-.1-.3c-.2 0-.3 0-.4.2l.1.4c.2 0 .3 0 .4-.3z"/>
  <path fill="#c8b100" d="M280.6 211.2c0-.2-.1-.4-.3-.4 0 0-.2.1-.2.3 0 .2 0 .4.2.4l.3-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M280.6 211.2c0-.2-.1-.4-.3-.4 0 0-.2.1-.2.3 0 .2 0 .4.2.4l.3-.3z"/>
  <path fill="#c8b100" d="M275.2 211.2c0-.2 0-.4.2-.4l.3.3-.2.4c-.2 0-.3-.2-.3-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M275.2 211.2c0-.2 0-.4.2-.4l.3.3-.2.4c-.2 0-.3-.2-.3-.3z"/>
  <path fill="#c8b100" d="m270.5 212 .1-.3c.2 0 .3 0 .4.2l-.1.4c-.2 0-.3 0-.4-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m270.5 212 .1-.3c.2 0 .3 0 .4.2l-.1.4c-.2 0-.3 0-.4-.3z"/>
  <path fill="#c8b100" d="m277.8 208.5-.8.5.6 1.3.2.1.3-.1.6-1.3-.9-.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m277.8 208.5-.8.5.6 1.3.2.1.3-.1.6-1.3-.9-.5"/>
  <path fill="#c8b100" d="m276 210.5.4.5 1.3-.4.1-.2-.1-.2-1.3-.3-.4.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m276 210.5.4.5 1.3-.4.1-.2-.1-.2-1.3-.3-.4.6"/>
  <path fill="#c8b100" d="m279.6 210.5-.3.5-1.3-.4-.1-.2v-.2l1.4-.3.4.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m279.6 210.5-.3.5-1.3-.4-.1-.2v-.2l1.4-.3.4.6"/>
  <path fill="#c8b100" d="m272.5 209-.7.7.9 1 .2.1.2-.1.2-1.3-.8-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m272.5 209-.7.7.9 1 .2.1.2-.1.2-1.3-.8-.3"/>
  <path fill="#c8b100" d="m271.1 211.2.5.5 1.2-.6v-.2l-.1-.2-1.3-.1-.3.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m271.1 211.2.5.5 1.2-.6v-.2l-.1-.2-1.3-.1-.3.6"/>
  <path fill="#c8b100" d="m274.7 210.5-.3.6h-1.3l-.2-.2.1-.3 1.2-.6.5.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m274.7 210.5-.3.6h-1.3l-.2-.2.1-.3 1.2-.6.5.5"/>
  <path fill="#c8b100" d="M269.8 211.4v.6l-1.4.2-.2-.1v-.2l1-.9.6.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M269.8 211.4v.6l-1.4.2-.2-.1v-.2l1-.9.6.4"/>
  <path fill="#c8b100" d="M272.4 210.9c0-.3.2-.5.5-.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M272.4 210.9c0-.3.2-.5.5-.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.4.5.5 0 0 1-.5-.4z"/>
  <path fill="#c8b100" d="m283.2 209 .7.7-.9 1-.2.1-.1-.1-.3-1.3.8-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m283.2 209 .7.7-.9 1-.2.1-.1-.1-.3-1.3.8-.3"/>
  <path fill="#c8b100" d="m284.6 211.2-.5.5-1.2-.6v-.2l.1-.2 1.3-.1.3.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m284.6 211.2-.5.5-1.2-.6v-.2l.1-.2 1.3-.1.3.6"/>
  <path fill="#c8b100" d="m281 210.5.3.6h1.3l.2-.2-.1-.3-1.2-.6-.5.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m281 210.5.3.6h1.3l.2-.2-.1-.3-1.2-.6-.5.5"/>
  <path fill="#c8b100" d="M285.7 211.4v.6l1.4.2.2-.1v-.2l-1-.9-.6.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M285.7 211.4v.6l1.4.2.2-.1v-.2l-1-.9-.6.4"/>
  <path fill="#c8b100" d="M277.4 210.4c0-.2.2-.4.5-.4.2 0 .4.2.4.4 0 .3-.2.5-.4.5a.5.5 0 0 1-.5-.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M277.4 210.4c0-.2.2-.4.5-.4.2 0 .4.2.4.4 0 .3-.2.5-.4.5a.5.5 0 0 1-.5-.5z"/>
  <path fill="#c8b100" d="M282.3 210.9c0-.3.3-.5.5-.5.3 0 .5.2.5.5s-.2.4-.5.4a.5.5 0 0 1-.5-.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M282.3 210.9c0-.3.3-.5.5-.5.3 0 .5.2.5.5s-.2.4-.5.4a.5.5 0 0 1-.5-.4z"/>
  <path fill="#c8b100" d="M277 205.4c0-.5.4-.8.8-.8s1 .3 1 .8-.5.8-1 .8a.9.9 0 0 1-.8-.8"/>
  <path fill="#c8b100" d="M278.5 205.1v.6H277v-.6h.4v-1.3h-.5v-.5h.5v-.6h.6v.6h.6v.6h-.6v1.2h.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M278.5 205.1v.6H277v-.6h.4v-1.3h-.5v-.5h.5v-.6h.6v.6h.6v.6h-.6v1.2h.4z"/>
  <path fill="#c8b100" d="M279 205.1v.6h-2.4v-.6h1v-1.3h-.7v-.5h.6v-.6h.6v.6h.6v.6h-.6v1.2h1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M278.1 204.6c.4 0 .6.4.6.8 0 .5-.4.8-.9.8a.9.9 0 0 1-.8-.8c0-.4.2-.7.6-.8"/>
  <path fill="#c8b100" d="m268 212.2-.6-.7a2.3 2.3 0 0 0-.7-.3c0-.1.3-.3.6-.3.2 0 .3 0 .4.2v-.2s.3 0 .4.3v1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m268 212.2-.6-.7a2.3 2.3 0 0 0-.7-.3c0-.1.3-.3.6-.3.2 0 .3 0 .4.2v-.2s.3 0 .4.3v1z"/>
  <path fill="#c8b100" d="M268 212c.1-.2.4-.2.5 0 .2.1.3.3.1.5l-.5-.1c-.1-.1-.2-.4 0-.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M268 212c.1-.2.4-.2.5 0 .2.1.3.3.1.5l-.5-.1c-.1-.1-.2-.4 0-.5z"/>
  <path fill="#c8b100" d="m287.5 212.2.6-.7c.2-.2.7-.3.7-.3 0-.1-.3-.3-.6-.3a.6.6 0 0 0-.4.2v-.2s-.3 0-.4.3v.7l.1.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m287.5 212.2.6-.7c.2-.2.7-.3.7-.3 0-.1-.3-.3-.6-.3a.6.6 0 0 0-.4.2v-.2s-.3 0-.4.3v.7l.1.3z"/>
  <path fill="#c8b100" d="M287.5 212c-.1-.2-.3-.2-.5 0-.2.1-.2.3-.1.5l.5-.1c.2-.1.2-.4.1-.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M287.5 212c-.1-.2-.3-.2-.5 0-.2.1-.2.3-.1.5l.5-.1c.2-.1.2-.4.1-.5z"/>
  <path fill="#c8b100" d="M267.2 223h21.4v-5.5h-21.4v5.6z"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M267.2 223h21.4v-5.5h-21.4v5.6z"/>
  <path fill="#c8b100" d="M286.3 226.8a1 1 0 0 0-.4 0h-16.5c.6-.2 1-.7 1-1.2 0-.6-.4-1.1-1-1.3h17-.1c-.6.2-1 .7-1 1.3 0 .5.4 1 1 1.2"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".4" d="M286.3 226.8a1 1 0 0 0-.4 0h-16.5c.6-.2 1-.7 1-1.2 0-.6-.4-1.1-1-1.3h17-.1c-.6.2-1 .7-1 1.3 0 .5.4 1 1 1.2z"/>
  <path fill="#c8b100" d="M269.9 226.8h16c.6 0 1 .3 1 .7 0 .4-.4.8-1 .8h-16c-.6 0-1-.4-1-.8s.5-.8 1-.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M269.9 226.8h16c.6 0 1 .3 1 .7 0 .4-.4.8-1 .8h-16c-.6 0-1-.4-1-.8s.5-.8 1-.8z"/>
  <path fill="#c8b100" d="M269.9 223h16c.6 0 1 .4 1 .7 0 .4-.4.6-1 .6h-16c-.6 0-1-.2-1-.6 0-.3.4-.6 1-.6"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M269.9 223h16c.6 0 1 .4 1 .7 0 .4-.4.6-1 .6h-16c-.6 0-1-.2-1-.6 0-.3.4-.6 1-.6z"/>
  <path fill="#005bbf" d="M263 317.4c1.4 0 2.7-.3 3.7-.8a8.4 8.4 0 0 1 3.7-.8c1.4 0 2.8.3 3.8.8s2.3.8 3.7.8c1.5 0 2.8-.3 3.8-.8a8.4 8.4 0 0 1 3.6-.8 8 8 0 0 1 3.7.8c1 .5 2.4.8 3.8.8v2.4a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.8c-1.4 0-2.7.3-3.6.8-1 .5-2.3.9-3.8.9a8 8 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v-2.4"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M263 317.4c1.4 0 2.7-.3 3.7-.8a8.4 8.4 0 0 1 3.7-.8c1.4 0 2.8.3 3.8.8s2.3.8 3.7.8c1.5 0 2.8-.3 3.8-.8a8.4 8.4 0 0 1 3.6-.8 8 8 0 0 1 3.7.8c1 .5 2.4.8 3.8.8v2.4a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.8c-1.4 0-2.7.3-3.6.8-1 .5-2.3.9-3.8.9a8 8 0 0 1-3.7-.9 8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.9-3.8.9v-2.4z"/>
  <path fill="#ccc" d="M263 319.8c1.4 0 2.7-.4 3.7-.9s2.3-.8 3.7-.8c1.4 0 2.8.3 3.8.8s2.3.9 3.7.9a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.8c1.5 0 2.8.3 3.7.8 1 .5 2.4.9 3.8.9v2.3a8.3 8.3 0 0 1-3.8-.9 8.1 8.1 0 0 0-3.7-.7c-1.4 0-2.7.2-3.6.7-1 .5-2.3.9-3.8.9a7 7 0 0 1-3.7-.9c-1-.4-2.3-.7-3.8-.7a8.3 8.3 0 0 0-3.7.7 8.1 8.1 0 0 1-3.8.9v-2.3"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M263 319.8c1.4 0 2.7-.4 3.7-.9s2.3-.8 3.7-.8c1.4 0 2.8.3 3.8.8s2.3.9 3.7.9a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.8c1.5 0 2.8.3 3.7.8 1 .5 2.4.9 3.8.9v2.3a8.3 8.3 0 0 1-3.8-.9 8.1 8.1 0 0 0-3.7-.7c-1.4 0-2.7.2-3.6.7-1 .5-2.3.9-3.8.9a7 7 0 0 1-3.7-.9c-1-.4-2.3-.7-3.8-.7a8.3 8.3 0 0 0-3.7.7 8.1 8.1 0 0 1-3.8.9v-2.3"/>
  <path fill="#005bbf" d="M263 322c1.4 0 2.7-.2 3.7-.8 1-.4 2.3-.7 3.7-.7 1.4 0 2.8.2 3.8.7s2.3.9 3.7.9a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.8 8 8 0 0 1 3.7.8c1 .5 2.4.9 3.8.9v2.3a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.7c-1.4 0-2.7.3-3.6.7-1 .6-2.3.9-3.8.9-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.8-3.8.8V322"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M263 322c1.4 0 2.7-.2 3.7-.8 1-.4 2.3-.7 3.7-.7 1.4 0 2.8.2 3.8.7s2.3.9 3.7.9a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.8 8 8 0 0 1 3.7.8c1 .5 2.4.9 3.8.9v2.3a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.7c-1.4 0-2.7.3-3.6.7-1 .6-2.3.9-3.8.9-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.8-3.8.8V322"/>
  <path fill="#ccc" d="M263 326.7a8 8 0 0 0 3.7-.8c1-.5 2.3-.8 3.7-.8 1.4 0 2.8.3 3.8.8s2.3.8 3.7.8c1.5 0 2.8-.3 3.8-.9a8.4 8.4 0 0 1 3.6-.7c1.5 0 2.8.3 3.7.8a8.3 8.3 0 0 0 3.8.8v-2.3a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.7c-1.4 0-2.7.3-3.6.7-1 .5-2.3.9-3.8.9-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.8-3.8.8v2.3"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M263 326.7a8 8 0 0 0 3.7-.8c1-.5 2.3-.8 3.7-.8 1.4 0 2.8.3 3.8.8s2.3.8 3.7.8c1.5 0 2.8-.3 3.8-.9a8.4 8.4 0 0 1 3.6-.7c1.5 0 2.8.3 3.7.8a8.3 8.3 0 0 0 3.8.8v-2.3a8.3 8.3 0 0 1-3.8-.9 8.2 8.2 0 0 0-3.7-.7c-1.4 0-2.7.3-3.6.7-1 .5-2.3.9-3.8.9-1.4 0-2.8-.3-3.7-.8a8.4 8.4 0 0 0-3.8-.8 8.3 8.3 0 0 0-3.7.8c-1 .5-2.3.8-3.8.8v2.3"/>
  <path fill="#005bbf" d="M263 329a8.1 8.1 0 0 0 3.7-.8c1-.5 2.3-.8 3.7-.8 1.4 0 2.8.3 3.8.8s2.3.8 3.7.8a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.7c1.5 0 2.8.3 3.7.8 1 .5 2.4.8 3.8.8v-2.3a8.3 8.3 0 0 1-3.8-.8 8.2 8.2 0 0 0-3.7-.8 8.4 8.4 0 0 0-3.6.7 8.2 8.2 0 0 1-3.8.9c-1.4 0-2.8-.3-3.7-.8-1-.5-2.3-.8-3.8-.8-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v2.3"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M263 329a8.1 8.1 0 0 0 3.7-.8c1-.5 2.3-.8 3.7-.8 1.4 0 2.8.3 3.8.8s2.3.8 3.7.8a8.2 8.2 0 0 0 3.8-.9 8.4 8.4 0 0 1 3.6-.7c1.5 0 2.8.3 3.7.8 1 .5 2.4.8 3.8.8v-2.3a8.3 8.3 0 0 1-3.8-.8 8.2 8.2 0 0 0-3.7-.8 8.4 8.4 0 0 0-3.6.7 8.2 8.2 0 0 1-3.8.9c-1.4 0-2.8-.3-3.7-.8-1-.5-2.3-.8-3.8-.8-1.4 0-2.7.3-3.7.8s-2.3.8-3.8.8v2.3z"/>
  <path fill="#c8b100" d="m286.3 308-.1.5c0 1.5 1.2 2.6 2.7 2.6h-22c1.5 0 2.7-1.2 2.7-2.6l-.1-.5h16.8"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".4" d="m286.3 308-.1.5c0 1.5 1.2 2.6 2.7 2.6h-22c1.5 0 2.7-1.2 2.7-2.6l-.1-.5h16.8z"/>
  <path fill="#c8b100" d="M269.9 306.5h16c.6 0 1 .3 1 .8 0 .4-.4.7-1 .7h-16c-.6 0-1-.3-1-.8 0-.4.5-.7 1-.7"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M269.9 306.5h16c.6 0 1 .3 1 .8 0 .4-.4.7-1 .7h-16c-.6 0-1-.3-1-.8 0-.4.5-.7 1-.7z"/>
  <path fill="#c8b100" d="M266.9 316.7h22V311h-22v5.6z"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M266.9 316.7h22V311h-22v5.6z"/>
  <path fill="#ad1519" d="M290.6 286.7c2.1 1.2 3.6 2.5 3.4 3.2-.1.6-.8 1-1.8 1.6-1.6 1.1-2.5 3-1.8 4a5.5 5.5 0 0 1 .2-8.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M290.6 286.7c2.1 1.2 3.6 2.5 3.4 3.2-.1.6-.8 1-1.8 1.6-1.6 1.1-2.5 3-1.8 4a5.5 5.5 0 0 1 .2-8.8z"/>
  <path fill="#ccc" d="M270.1 305.6h15.6V229h-15.6v76.5z"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M281.4 229.1v76.3m1.8-76.3v76.3m-13 .2h15.5V229h-15.6v76.5z"/>
  <path fill="#ad1519" d="M254.2 257.7a49.6 49.6 0 0 1 23.3-2c9.3 1.6 16.4 5.3 15.9 8.4v.2l3.5-8.2c.6-3.3-7.3-7.5-17.6-9.2a53.5 53.5 0 0 0-9.2-.7c-6.7 0-12.4.8-15.9 2.1v9.4"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".4" d="M254.2 257.7a49.6 49.6 0 0 1 23.3-2c9.3 1.6 16.4 5.3 15.9 8.4v.2l3.5-8.2c.6-3.3-7.3-7.5-17.6-9.2a53.5 53.5 0 0 0-9.2-.7c-6.7 0-12.4.8-15.9 2.1v9.4"/>
  <path fill="#ad1519" d="M285.7 267.3c4.4-.3 7.3-1.4 7.7-3.2.2-1.5-1.2-3-3.8-4.5-1.2.1-2.5.3-3.9.3v7.4"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M285.7 267.3c4.4-.3 7.3-1.4 7.7-3.2.2-1.5-1.2-3-3.8-4.5-1.2.1-2.5.3-3.9.3v7.4"/>
  <path fill="#ad1519" d="M270 261.5a13 13 0 0 0-5.7 1.9v.2c-.5 1 1.8 3 5.8 5.4v-7.5"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M270 261.5a13 13 0 0 0-5.7 1.9v.2c-.5 1 1.8 3 5.8 5.4v-7.5"/>
  <path fill="#ad1519" d="M295.4 282c.4-1.2-3.8-3.6-9.7-5.8-2.8-1-5-2-7.8-3.2-8.3-3.7-14.4-7.9-13.6-9.4v-.2c-.4.4-1 8-1 8-.8 1.3 4.8 5.5 12.4 9.1 2.4 1.2 7.6 3 10 4 4.3 1.4 8.7 4.3 8.3 5.3l1.4-7.7"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".4" d="M295.4 282c.4-1.2-3.8-3.6-9.7-5.8-2.8-1-5-2-7.8-3.2-8.3-3.7-14.4-7.9-13.6-9.4v-.2c-.4.4-1 8-1 8-.8 1.3 4.8 5.5 12.4 9.1 2.4 1.2 7.6 3 10 4 4.3 1.4 8.7 4.3 8.3 5.3l1.4-7.7z"/>
  <path fill="#c8b100" d="M263.9 254.4c.6-2.3 1.4-4.4 2.1-6.6h-.5a5.2 5.2 0 0 1-.5.1 52.8 52.8 0 0 1-1.4 4.8c-1-1.4-2-2.7-2.7-4.1l-1 .2h-1a131.3 131.3 0 0 1 4 5.7h.5l.5-.1m6-6.6h-1a8 8 0 0 1-.8 0v6.2h4.2v-.7h-2.6l.1-5.5m6.8 1 2 .3v-.7l-5.8-.5v.8a19.3 19.3 0 0 1 2 0l-.4 5.6h1.6l.5-5.4m2.4 6c.3 0 .5 0 .8.2l.8.2.7-2.9.6 1.2.8 2.1 1 .2c.4 0 .7.2 1 .3l-.3-.7c-.4-1-1-1.9-1.3-2.9 1 0 1.9-.3 2.1-1.2.1-.6 0-1-.7-1.5-.4-.3-1.2-.4-1.7-.5l-2.4-.5-1.4 6m3-5.2c.7.2 1.5.3 1.5 1v.5c-.3.9-1 1.2-2 .9l.5-2.4m8 7-.2 2 .8.5.9.5.5-7a3.4 3.4 0 0 1-.7-.3l-6.1 3.8.5.3.4.2 1.7-1.2 2.3 1.3zm-1.7-1.5 2-1.4-.2 2.3-1.8-1"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M182.2 192.4c0-1 1-2 2-2s2.2 1 2.2 2c0 1.1-1 2-2.1 2a2 2 0 0 1-2.1-2z"/>
  <path fill="#ad1519" stroke="#000" stroke-width=".3" d="M205.7 175.4c6.3 0 12 1 15.7 2.4a31.7 31.7 0 0 0 14.6 2.3c2.7 0 6.5.8 10.3 2.4a27.3 27.3 0 0 1 7.4 4.7l-1.5 1.4-.4 3.8-4.1 4.7-2 1.8-5 3.9-2.5.2-.7 2.1-31.6-3.7-31.7 3.7-.8-2.1-2.5-.2-4.9-4-2-1.7-4.1-4.7-.5-3.8-1.5-1.4a27.6 27.6 0 0 1 7.5-4.7 26 26 0 0 1 10.2-2.4c2 .2 4.2.1 6.6-.2a30 30 0 0 0 8-2c3.7-1.5 9-2.5 15.5-2.5z"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="M206.2 217.1c-11.8 0-22.4-1.4-29.9-3.6a1.1 1.1 0 0 1-.8-1.2c0-.5.3-1 .8-1.2a109 109 0 0 1 29.9-3.6c11.7 0 22.3 1.4 29.8 3.6a1.3 1.3 0 0 1 0 2.4c-7.5 2.2-18 3.6-29.8 3.6"/>
  <path fill="#ad1519" d="M206.1 215.6c-10.6 0-20.2-1.2-27.5-3.1 7.3-2 16.9-3 27.5-3.1a115 115 0 0 1 27.6 3c-7.3 2-17 3.2-27.6 3.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M206.9 215.7v-6.3m-1.7 6.3v-6.3"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M203.6 215.7v-6.3m-1.6 6.3v-6.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M200.6 215.7v-6.3m-2.8 5.9v-5.7m1.3 5.8v-6m-3.8 5.6v-5.2m1.3 5.4v-5.6"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M192 214.8V210m1 4.7V210m1.2 5v-5m-3.4 4.7v-4.5"/>
  <path fill="none" stroke="#000" stroke-width=".5" d="M189.7 214.5v-4.2m-1.2 4.1v-4"/>
  <path fill="none" stroke="#000" stroke-width=".6" d="M186 214v-3m1.3 3.2v-3.5m-2.5 3.1V211"/>
  <path fill="none" stroke="#000" stroke-width=".7" d="M183.7 213.6v-2.3m-1.3 2v-1.8m-1.2 1.6v-1.3"/>
  <path fill="none" stroke="#000" stroke-width=".9" d="M179.8 212.8v-.7"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M213.7 215.3v-5.8m-2.9 6v-6.1m-2.1 6.2v-6.3"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="M206 207.4a108 108 0 0 0-30 3.9c.6-.3.5-1-.3-3-1-2.5-2.4-2.4-2.4-2.4 8.3-2.5 20-4 32.8-4a123 123 0 0 1 33 4s-1.5-.1-2.5 2.3c-.8 2-.8 2.8-.2 3-7.5-2.2-18.4-3.7-30.3-3.7"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="M206.1 201.9c-12.9 0-24.5 1.5-32.8 4a1 1 0 0 1-1.3-.6 1 1 0 0 1 .7-1.3 121 121 0 0 1 33.4-4.2c13.2 0 25.2 1.7 33.5 4.2.6.2.9.8.7 1.3-.2.5-.8.8-1.3.6-8.4-2.5-20-4-32.9-4"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".4" d="M206.1 215.6c-10.6 0-20.2-1.2-27.5-3.1 7.3-2 16.9-3 27.5-3.1a115 115 0 0 1 27.6 3c-7.3 2-17 3.2-27.6 3.2z"/>
  <path fill="#fff" stroke="#000" stroke-width=".4" d="M197 204.8c0-.5.4-1 1-1 .5 0 1 .5 1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="#ad1519" stroke="#000" stroke-width=".4" d="M206.1 205.6H203a1 1 0 0 1 0-2h6.4c.5 0 1 .5 1 1s-.5 1-1 1h-3.2"/>
  <path fill="#058e6e" stroke="#000" stroke-width=".4" d="m190.3 206.5-2.3.2c-.6.1-1-.3-1.2-.8a1 1 0 0 1 1-1.1l2.2-.3 2.4-.3c.5 0 1 .3 1.1.9.1.5-.3 1-.9 1l-2.3.4"/>
  <path fill="#fff" stroke="#000" stroke-width=".4" d="M181 206.7c0-.6.5-1 1.1-1 .6 0 1 .4 1 1 0 .5-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="#ad1519" stroke="#000" stroke-width=".4" d="m174 208.5 1.2-1.6 3.3.4-2.6 2-1.8-.8"/>
  <path fill="#058e6e" stroke="#000" stroke-width=".4" d="m222 206.5 2.3.2c.5.1 1-.3 1.1-.8a1 1 0 0 0-.9-1.1l-2.2-.3-2.4-.3a1 1 0 0 0-1.1.9c-.1.5.3 1 .9 1l2.3.4"/>
  <path fill="#fff" stroke="#000" stroke-width=".4" d="M213.3 204.8c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1m15.8 1.9c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1 0 .5-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="#ad1519" stroke="#000" stroke-width=".4" d="m238.2 208.5-1.1-1.6-3.3.4 2.6 2 1.8-.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M177.3 212.8c7.4-2.1 17.6-3.4 28.8-3.4 11.3 0 21.4 1.3 28.9 3.4"/>
  <path fill="#c8b100" d="m182.3 183.8 1.4 1 2-3.2a7.4 7.4 0 0 1-3.6-7.2c.2-4.1 5.2-7.6 11.7-7.6 3.3 0 6.3 1 8.5 2.4 0-.6 0-1.2.2-1.8a17.4 17.4 0 0 0-8.7-2.1c-7.4 0-13.2 4.1-13.5 9.1a8.9 8.9 0 0 0 3 7.6l-1 1.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="m182.3 183.8 1.4 1 2-3.2a7.4 7.4 0 0 1-3.6-7.2c.2-4.1 5.2-7.6 11.7-7.6 3.3 0 6.3 1 8.5 2.4 0-.6 0-1.2.2-1.8a17.4 17.4 0 0 0-8.7-2.1c-7.4 0-13.2 4.1-13.5 9.1a8.9 8.9 0 0 0 3 7.6l-1 1.8"/>
  <path fill="#c8b100" d="M182.4 183.8a9.3 9.3 0 0 1-4-7.3c0-3.2 2-6.1 5.3-8a8.5 8.5 0 0 0-3.4 6.8 8.9 8.9 0 0 0 3 6.7l-.9 1.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M182.4 183.8a9.3 9.3 0 0 1-4-7.3c0-3.2 2-6.1 5.3-8a8.5 8.5 0 0 0-3.4 6.8 8.9 8.9 0 0 0 3 6.7l-.9 1.8"/>
  <path fill="#c8b100" d="M160.1 187.1a8.8 8.8 0 0 1-2.3-5.9c0-1.3.3-2.6 1-3.8 2-4.2 8.4-7.2 16-7.2 2 0 4 .2 5.9.6l-1 1.4a25.5 25.5 0 0 0-4.9-.4c-7 0-12.8 2.7-14.5 6.3a7 7 0 0 0-.7 3.1 7.3 7.3 0 0 0 2.7 5.6l-2.6 4.1-1.3-1 1.7-2.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M160.1 187.1a8.8 8.8 0 0 1-2.3-5.9c0-1.3.3-2.6 1-3.8 2-4.2 8.4-7.2 16-7.2 2 0 4 .2 5.9.6l-1 1.4a25.5 25.5 0 0 0-4.9-.4c-7 0-12.8 2.7-14.5 6.3a7 7 0 0 0-.7 3.1 7.3 7.3 0 0 0 2.7 5.6l-2.6 4.1-1.3-1 1.7-2.8z"/>
  <path fill="#c8b100" d="M162.7 173.3a10.5 10.5 0 0 0-4 4.1 8.6 8.6 0 0 0-.9 3.8c0 2.3.9 4.3 2.3 5.9l-1.5 2.5a10.4 10.4 0 0 1-2.3-6.5c0-4 2.5-7.5 6.4-9.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M162.7 173.3a10.5 10.5 0 0 0-4 4.1 8.6 8.6 0 0 0-.9 3.8c0 2.3.9 4.3 2.3 5.9l-1.5 2.5a10.4 10.4 0 0 1-2.3-6.5c0-4 2.5-7.5 6.4-9.8z"/>
  <path fill="#c8b100" d="M206 164.4c1.7 0 3.2 1.1 3.5 2.6.3 1.4.4 2.9.4 4.5v1.1c.1 3.3.6 6.3 1.3 8.1l-5.2 5-5.2-5c.7-1.8 1.2-4.8 1.3-8.1v-1.1c0-1.6.2-3.1.4-4.5.3-1.5 1.8-2.6 3.5-2.6"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M206 164.4c1.7 0 3.2 1.1 3.5 2.6.3 1.4.4 2.9.4 4.5v1.1c.1 3.3.6 6.3 1.3 8.1l-5.2 5-5.2-5c.7-1.8 1.2-4.8 1.3-8.1v-1.1c0-1.6.2-3.1.4-4.5.3-1.5 1.8-2.6 3.5-2.6z"/>
  <path fill="#c8b100" d="M206 166c1 0 1.7.6 1.8 1.4.2 1.2.4 2.6.4 4.2v1c.1 3.2.6 6 1.2 7.7l-3.4 3.2-3.4-3.2c.7-1.7 1.1-4.5 1.2-7.7v-1a28.1 28.1 0 0 1 .4-4.2 2 2 0 0 1 1.8-1.4"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M206 166c1 0 1.7.6 1.8 1.4.2 1.2.4 2.6.4 4.2v1c.1 3.2.6 6 1.2 7.7l-3.4 3.2-3.4-3.2c.7-1.7 1.1-4.5 1.2-7.7v-1a28.1 28.1 0 0 1 .4-4.2 2 2 0 0 1 1.8-1.4z"/>
  <path fill="#c8b100" d="m229.7 183.8-1.3 1-2-3.2a7.4 7.4 0 0 0 3.6-6.3 7 7 0 0 0 0-.9c-.2-4.1-5.3-7.6-11.7-7.6a15 15 0 0 0-8.5 2.4 23 23 0 0 0-.2-1.8 17.4 17.4 0 0 1 8.7-2.1c7.4 0 13.2 4.1 13.4 9.1a8.9 8.9 0 0 1-3 7.6l1 1.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="m229.7 183.8-1.3 1-2-3.2a7.4 7.4 0 0 0 3.6-6.3 7 7 0 0 0 0-.9c-.2-4.1-5.3-7.6-11.7-7.6a15 15 0 0 0-8.5 2.4 23 23 0 0 0-.2-1.8 17.4 17.4 0 0 1 8.7-2.1c7.4 0 13.2 4.1 13.4 9.1a8.9 8.9 0 0 1-3 7.6l1 1.8"/>
  <path fill="#c8b100" d="M229.6 183.8a9.1 9.1 0 0 0 4.1-7.3c0-3.2-2.1-6.1-5.3-8a8.5 8.5 0 0 1 3.4 6.8 8.9 8.9 0 0 1-3.2 6.7l1 1.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M229.6 183.8a9.1 9.1 0 0 0 4.1-7.3c0-3.2-2.1-6.1-5.3-8a8.5 8.5 0 0 1 3.4 6.8 8.9 8.9 0 0 1-3.2 6.7l1 1.8"/>
  <path fill="#c8b100" d="M252 187.1a8.8 8.8 0 0 0 2.2-5.9 8.7 8.7 0 0 0-.9-3.8c-2-4.2-8.4-7.2-16-7.2a29 29 0 0 0-6 .6l1 1.4a25.4 25.4 0 0 1 5-.4c7 0 12.8 2.7 14.4 6.3.5 1 .7 2 .7 3.1a7.3 7.3 0 0 1-2.6 5.6l2.5 4.1 1.3-1-1.7-2.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M252 187.1a8.8 8.8 0 0 0 2.2-5.9 8.7 8.7 0 0 0-.9-3.8c-2-4.2-8.4-7.2-16-7.2a29 29 0 0 0-6 .6l1 1.4a25.4 25.4 0 0 1 5-.4c7 0 12.8 2.7 14.4 6.3.5 1 .7 2 .7 3.1a7.3 7.3 0 0 1-2.6 5.6l2.5 4.1 1.3-1-1.7-2.8z"/>
  <path fill="#c8b100" d="M249.3 173.3a10.6 10.6 0 0 1 4 4.1 8.7 8.7 0 0 1 .9 3.8 8.8 8.8 0 0 1-2.3 5.9l1.6 2.5a10.4 10.4 0 0 0 2.3-6.5c0-4-2.6-7.5-6.5-9.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M249.3 173.3a10.6 10.6 0 0 1 4 4.1 8.7 8.7 0 0 1 .9 3.8 8.8 8.8 0 0 1-2.3 5.9l1.6 2.5a10.4 10.4 0 0 0 2.3-6.5c0-4-2.6-7.5-6.5-9.8z"/>
  <path fill="#fff" d="M204.2 181.4c0-1 .8-1.8 1.8-1.8s1.9.8 1.9 1.8-.9 1.7-1.9 1.7a1.8 1.8 0 0 1-1.8-1.7"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M204.2 181.4c0-1 .8-1.8 1.8-1.8s1.9.8 1.9 1.8-.9 1.7-1.9 1.7a1.8 1.8 0 0 1-1.8-1.7z"/>
  <path fill="#fff" stroke="#000" stroke-width=".4" d="M204.2 178c0-1 .8-1.8 1.8-1.8s1.9.8 1.9 1.8-.9 1.7-1.9 1.7a1.8 1.8 0 0 1-1.8-1.7m.4-3.7c0-.7.6-1.3 1.4-1.3.8 0 1.5.6 1.5 1.3 0 .8-.7 1.4-1.5 1.4s-1.4-.6-1.4-1.4m.4-3.3c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1m.2-2.8c0-.5.4-.8.8-.8.5 0 .9.3.9.8 0 .4-.4.8-.9.8a.8.8 0 0 1-.8-.8"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="m206.2 191.8 1.2.2a4.6 4.6 0 0 0 4.5 6 4.7 4.7 0 0 0 4.4-3c.1 0 .5-1.7.7-1.7.2 0 .1 1.8.2 1.7.3 2.3 2.4 3.8 4.7 3.8a4.6 4.6 0 0 0 4.7-5l1.5-1.5.7 2a4 4 0 0 0-.4 1.9 4.4 4.4 0 0 0 4.5 4.2c1.6 0 3-.7 3.8-1.9l.9-1.2v1.5c0 1.5.6 2.8 2 3 0 0 1.7.1 4-1.6 2.1-1.7 3.3-3.1 3.3-3.1l.2 1.7s-1.8 2.8-3.8 4c-1 .6-2.7 1.3-4 1-1.4-.2-2.4-1.3-3-2.6a6.7 6.7 0 0 1-3.3 1 6.5 6.5 0 0 1-6.1-3.7 7 7 0 0 1-10.4-.3 7 7 0 0 1-4.6 1.8 6.9 6.9 0 0 1-5.7-3 6.9 6.9 0 0 1-5.7 3 7 7 0 0 1-4.7-1.8 7 7 0 0 1-10.4.3 6.5 6.5 0 0 1-6 3.7 6.7 6.7 0 0 1-3.4-1c-.6 1.3-1.5 2.4-3 2.7-1.2.2-2.9-.5-4-1.1-2-1.2-3.8-4-3.8-4l.2-1.7s1.2 1.4 3.4 3.1c2.2 1.8 3.9 1.6 3.9 1.6 1.4-.2 2-1.5 2-3v-1.5l1 1.2a4.6 4.6 0 0 0 3.7 2c2.5 0 4.5-2 4.5-4.3a4 4 0 0 0-.4-2l.8-1.9 1.5 1.5a4.4 4.4 0 0 0 0 .6c0 2.4 2 4.4 4.6 4.4 2.4 0 4.4-1.5 4.7-3.8 0 0 0-1.6.2-1.7.2 0 .6 1.7.7 1.6a4.7 4.7 0 0 0 4.5 3.1 4.6 4.6 0 0 0 4.5-6l1.2-.2"/>
  <path fill="#fff" stroke="#000" stroke-width=".4" d="M238.6 197.7c.3-.8 0-1.6-.6-1.8-.5-.2-1.2.3-1.5 1.1-.3.8 0 1.6.6 1.8.5.2 1.2-.3 1.5-1.1m-20.5-4c0-.8-.3-1.6-1-1.6-.5-.1-1 .5-1.2 1.4-.1.8.3 1.5.9 1.6.6 0 1.2-.6 1.3-1.4m-23.9 0c0-.8.4-1.6 1-1.6.6-.1 1.1.5 1.2 1.4.1.8-.3 1.5-.9 1.6-.6 0-1.1-.6-1.2-1.4m-20.6 4c-.2-.8 0-1.6.6-1.8.6-.2 1.2.3 1.5 1.1.3.8 0 1.6-.5 1.8-.6.2-1.3-.3-1.6-1.1"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="M182.7 184a5.1 5.1 0 0 1 2.2 2.9s0-.3.6-.6 1-.3 1-.3l-.1 1.3-.3 2.2a7.4 7.4 0 0 1-.7 1.6 1.9 1.9 0 0 0-1.5-.4 1.8 1.8 0 0 0-1.2.9s-.7-.6-1.2-1.3l-1.1-2-.7-1.1s.5-.2 1.1 0c.6 0 .8.2.8.2a4.9 4.9 0 0 1 1-3.4m.4 9.8a1.8 1.8 0 0 1-.6-1c0-.5 0-.9.3-1.2 0 0-.9-.5-1.8-.7-.7-.2-2-.2-2.3-.2h-1l.2.5c.2.5.5.7.5.7a5 5 0 0 0-3 2 5.3 5.3 0 0 0 3.5 1l-.2.8v.6l1-.4c.3-.1 1.5-.5 2-1 .8-.4 1.5-1.1 1.5-1.1m2.7-.5a1.6 1.6 0 0 0 .2-1.1 1.7 1.7 0 0 0-.6-1l1.4-1.3a10 10 0 0 1 2-.9l1.1-.4v.6a5.7 5.7 0 0 1-.2.8 5 5 0 0 1 3.4 1 5 5 0 0 1-2.9 2 6.4 6.4 0 0 0 .7 1.2h-1c-.4 0-1.6 0-2.3-.2a11 11 0 0 1-1.8-.7"/>
  <path fill="#ad1519" stroke="#000" stroke-width=".4" d="M182.2 192.4c0-1 1-2 2-2s2.2 1 2.2 2c0 1.1-1 2-2.1 2a2 2 0 0 1-2.1-2"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="M206.1 180.8a5.7 5.7 0 0 1 1.9 3.7s.2-.3.9-.5c.7-.3 1.2-.2 1.2-.2l-.5 1.4-.8 2.4a8.2 8.2 0 0 1-1 1.7 2.1 2.1 0 0 0-1.7-.7c-.6 0-1.2.3-1.6.7 0 0-.6-.7-1-1.7l-.8-2.4-.5-1.4 1.2.2c.7.2.9.5.9.5 0-1.4.8-2.8 1.8-3.7"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="M204.6 191.8a2 2 0 0 1-.5-1.2c0-.5.1-1 .4-1.3 0 0-.8-.7-1.8-1-.7-.4-2-.7-2.5-.7l-1.2-.2.2.6.4.9a5.9 5.9 0 0 0-3.7 1.7c1 .9 2.3 1.6 3.7 1.6l-.4 1-.2.6 1.2-.2c.4-.1 1.8-.4 2.5-.7 1-.4 1.9-1 1.9-1m3 0a1.9 1.9 0 0 0 .1-2.6s.9-.7 1.8-1a8 8 0 0 1 2.5-.7l1.2-.3-.1.7-.4.9c1.4 0 2.7.8 3.6 1.7a5.9 5.9 0 0 1-3.6 1.6 6.9 6.9 0 0 0 .5 1.6l-1.2-.2-2.5-.7c-1-.4-1.8-1-1.8-1m22-8a5.2 5.2 0 0 0-2.2 3l-.7-.6c-.6-.3-1-.3-1-.3l.2 1.3c0 .3 0 1.3.3 2.2.2 1 .6 1.6.6 1.6a2 2 0 0 1 1.5-.4c.6.1 1 .5 1.3.9l1.1-1.3c.6-.8 1-1.7 1.1-2l.7-1.1s-.4-.2-1 0c-.7 0-1 .2-1 .2a4.9 4.9 0 0 0-1-3.4m-.3 9.8c.3-.3.5-.6.6-1a1.6 1.6 0 0 0-.2-1.2s.8-.5 1.7-.7c.7-.2 2-.2 2.3-.2h1.1l-.3.5a6.2 6.2 0 0 1-.4.7 5 5 0 0 1 2.9 2 5.3 5.3 0 0 1-3.5 1l.2.8v.6l-1-.4c-.3-.1-1.4-.5-2-1-.8-.4-1.4-1.1-1.4-1.1m-2.8-.5a1.7 1.7 0 0 1-.2-1.1c0-.5.3-.8.6-1 0 0-.6-.8-1.4-1.3-.6-.4-1.7-.8-2-.9a171.4 171.4 0 0 1-1-.4v.6c0 .5.2.8.2.8a5.2 5.2 0 0 0-3.5 1c.7.9 1.7 1.7 3 2 0 0-.3.2-.5.7l-.3.5h1c.4 0 1.7 0 2.3-.2a11.1 11.1 0 0 0 1.8-.7"/>
  <path fill="#ad1519" stroke="#000" stroke-width=".4" d="M226 192.4c0-1 1-2 2-2s2.1 1 2.1 2a2 2 0 0 1-2 2 2 2 0 0 1-2.1-2m23.2 4.4c-.4-.5-1.4-.4-2.2.2-.8.7-1 1.6-.5 2.2.5.5 1.5.4 2.3-.3.7-.6 1-1.6.5-2"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="m246.3 198 .7-1c.7-.6 1.8-.7 2.3-.2l.1.2s1-2 2.3-2.6c1.3-.7 3.4-.5 3.4-.5a2.8 2.8 0 0 0-2.9-2.8 3 3 0 0 0-2.4 1l-.2-1s-1.3.3-1.9 1.8c-.6 1.5 0 3.6 0 3.6s-.3-.9-.7-1.5a8 8 0 0 0-2.4-1.6l-1.3-.7-.1.5a5 5 0 0 0 0 .8 7.9 7.9 0 0 0-3.7.5 4.7 4.7 0 0 0 2.5 2.2l-.8.7a4 4 0 0 0-.4.5l1.3.2 2.5.2a14.5 14.5 0 0 0 1.7-.2m-80.3 0c0-.4-.3-.7-.7-1-.7-.7-1.7-.8-2.2-.3l-.2.3s-1-2-2.3-2.7c-1.2-.7-3.3-.5-3.3-.5a2.8 2.8 0 0 1 2.8-2.8c1 0 1.9.4 2.4 1l.2-1s1.3.3 2 1.8c.5 1.5-.1 3.6-.1 3.6s.3-.9.8-1.5a8 8 0 0 1 2.4-1.6l1.3-.7v1.3a7.9 7.9 0 0 1 3.7.5 4.7 4.7 0 0 1-2.5 2.2l.8.7.4.5-1.2.2-2.6.2a14.7 14.7 0 0 1-1.7-.2"/>
  <path fill="#ad1519" stroke="#000" stroke-width=".4" d="M163 196.8c.6-.5 1.6-.4 2.4.3.7.6 1 1.5.4 2-.5.6-1.5.5-2.2-.2-.8-.6-1-1.6-.5-2m41-6.3c0-1.1.9-2 2-2s2.1.9 2.1 2c0 1-1 2-2 2a2 2 0 0 1-2.1-2"/>
  <path fill="#005bbf" stroke="#000" stroke-width=".3" d="M201.8 160.6c0-2.2 1.9-4 4.3-4s4.2 1.8 4.2 4-1.9 4-4.3 4a4.1 4.1 0 0 1-4.2-4"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".3" d="M205 149.3v2.2h-2.4v2.2h2.3v6.3H202l-.2.6c0 .6.1 1.1.3 1.6h7.9c.2-.5.3-1 .3-1.6l-.2-.6h-2.8v-6.3h2.3v-2.2h-2.3v-2.2h-2.4z"/>
  <path fill="#ccc" d="M206.5 330.6a82 82 0 0 1-35.5-8.2 22.7 22.7 0 0 1-12.8-20.4v-32h96.4v32a22.7 22.7 0 0 1-12.8 20.4 81 81 0 0 1-35.3 8.2"/>
  <path fill="none" stroke="#000" stroke-width=".5" d="M206.5 330.6a82 82 0 0 1-35.5-8.2 22.7 22.7 0 0 1-12.8-20.4v-32h96.4v32a22.7 22.7 0 0 1-12.8 20.4 81 81 0 0 1-35.3 8.2z"/>
  <path fill="#ccc" d="M206.3 270h48.3v-53.5h-48.3V270z"/>
  <path fill="none" stroke="#000" stroke-width=".5" d="M206.3 270h48.3v-53.5h-48.3V270z"/>
  <path fill="#ad1519" d="M206.3 302c0 12.6-10.7 22.9-24 22.9s-24.2-10.3-24.2-23v-32h48.2v32"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".5" d="M168.6 320.9c1.5.8 3.6 2 5.8 2.6l-.1-54.7h-5.7v52z"/>
  <path fill="#c8b100" stroke="#000" stroke-linejoin="round" stroke-width=".5" d="M158 301.6a24.4 24.4 0 0 0 5.5 15v-47.5h-5.4v32.5z"/>
  <path fill="#c7b500" stroke="#000" stroke-width=".5" d="M179.4 324.7a26.6 26.6 0 0 0 5.6 0v-55.9h-5.6v56z"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".5" d="M190 323.5a19 19 0 0 0 5.8-2.5v-52.2H190l-.1 54.7z"/>
  <path fill="#ad1519" d="M158.1 270h48.2v-53.5H158V270z"/>
  <path fill="none" stroke="#000" stroke-width=".5" d="M158.1 270h48.2v-53.5H158V270z"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".5" d="M201 316c2.4-2 4.6-6.8 5.4-12.2l.1-35H201l.1 47.3z"/>
  <path fill="none" stroke="#000" stroke-width=".5" d="M206.3 302c0 12.6-10.7 22.9-24 22.9s-24.2-10.3-24.2-23v-32h48.2v32"/>
  <path fill="#ad1519" d="M254.6 270v32c0 12.6-10.8 22.9-24.1 22.9s-24.2-10.3-24.2-23v-32h48.3"/>
  <path fill="none" stroke="#000" stroke-width=".5" d="M254.6 270v32c0 12.6-10.8 22.9-24.1 22.9s-24.2-10.3-24.2-23v-32h48.3"/>
  <path fill="#c8b100" d="m215.1 294.1.1.5c0 .6-.5 1-1.1 1a1 1 0 0 1-1.1-1v-.5h-1.5a2.5 2.5 0 0 0 1.8 2.9v3.9h1.6V297a2.6 2.6 0 0 0 1.7-1.6h4.4v-1.2h-6m21.8 0v1.2h-4a2.5 2.5 0 0 1-.3.6l4.6 5.2-1.2 1-4.6-5.3-.2.1v8.7h-1.6V297h-.2l-4.8 5.2-1.2-1 4.7-5.3a2.1 2.1 0 0 1-.2-.4h-4V294h13zm2.6 0v1.2h4.4c.3.8.9 1.4 1.7 1.6v3.9h1.6V297a2.5 2.5 0 0 0 1.8-2.4 2 2 0 0 0 0-.5h-1.6l.1.5c0 .6-.5 1-1 1-.7 0-1.2-.4-1.2-1a1 1 0 0 1 .1-.5h-5.9m-6.7 22.1a15.6 15.6 0 0 0 3.7-1l.8 1.4a17.6 17.6 0 0 1-4.3 1.2 2.6 2.6 0 0 1-2.6 2 2.6 2.6 0 0 1-2.5-2 17.5 17.5 0 0 1-4.6-1.2l.8-1.4c1.3.5 2.6.9 4 1a2.5 2.5 0 0 1 1.5-1.3v-6.7h1.6v6.7c.7.2 1.3.7 1.6 1.4zm-11-2.2-.8 1.4a16.6 16.6 0 0 1-3.6-3.1c-.9.2-1.8 0-2.5-.5a2.4 2.4 0 0 1-.3-3.5l.1-.1a15.3 15.3 0 0 1-1.3-4.8h1.7a13.1 13.1 0 0 0 1 4c.5 0 1 0 1.4.2l4.1-4.5 1.3 1-4.1 4.5c.5.9.5 2-.1 2.8a15.2 15.2 0 0 0 3.1 2.6zm-6-4.8c.3-.4 1-.5 1.5 0s.5 1 .1 1.4a1.2 1.2 0 0 1-1.6.1 1 1 0 0 1 0-1.5zm-2.2-4.5-1.6-.3-.3-4.3 1.7-.6v2.5c0 1 0 1.8.2 2.7zm1.4-5.3 1.7.4v2.2c0-.8.3 2.1.3 2.1l-1.7.6a14 14 0 0 1-.3-2.7v-2.6zm5.6 13.7a15.7 15.7 0 0 0 4.8 2.6l.4-1.6a13.7 13.7 0 0 1-4-2l-1.2 1m-.8 1.4a17.4 17.4 0 0 0 4.8 2.6l-1.2 1.1a18.7 18.7 0 0 1-4-2l.4-1.7m2.2-9.4 1.6.7 3-3.3-1-1.4-3.6 4m-1.3-1-1-1.4 3-3.3 1.6.7-3.6 4m18.1 9.9.8 1.4a16.7 16.7 0 0 0 3.6-3.1c.9.2 1.8 0 2.5-.5a2.4 2.4 0 0 0 .3-3.5l-.1-.1a15 15 0 0 0 1.3-4.8h-1.7a13.3 13.3 0 0 1-1 4 3 3 0 0 0-1.4.2l-4.1-4.5-1.3 1 4.1 4.5a2.4 2.4 0 0 0 .1 2.8 15 15 0 0 1-3.1 2.6zm6-4.8a1.2 1.2 0 0 0-1.5 0 1 1 0 0 0-.1 1.4 1.2 1.2 0 0 0 1.6.1 1 1 0 0 0 0-1.5zm2.2-4.5 1.6-.3.3-4.3-1.7-.6v2.5c0 1 0 1.9-.2 2.8zm-1.4-5.3-1.7.4v2.2c0-.8-.3 2.1-.3 2.1l1.7.6.3-2.7v-2.6m-5.6 13.7a15.7 15.7 0 0 1-4.8 2.6l-.4-1.6a13.7 13.7 0 0 0 4-2l1.2 1m.8 1.4a17.4 17.4 0 0 1-4.8 2.6l1.2 1.1a18.6 18.6 0 0 0 4-2l-.4-1.7m-2.2-9.4-1.6.7-2.9-3.3 1-1.4 3.5 4m1.3-1 1-1.4-3-3.3-1.6.7 3.6 4m-20.1-8.7.5 1.6h4.5l.5-1.6h-5.5m21.1 0-.5 1.6h-4.5l-.5-1.6h5.5m-11.6 21.9c0-.6.5-1 1.1-1a1 1 0 0 1 1.1 1c0 .6-.5 1-1 1a1.1 1.1 0 0 1-1.2-1zm1.9-7.8 1.7-.4v-4.3l-1.7-.5v5.2m-1.6 0-1.7-.4v-4.3l1.7-.5v5.2"/>
  <path fill="#c8b100" d="M211.5 294.2c.2-1 1-1.6 1.8-2V287h1.6v5.3c.8.3 1.5.9 1.7 1.6h4.4v.3h-6a1.2 1.2 0 0 0-1-.6c-.4 0-.7.3-1 .6h-1.5m12.2 0v-.3h4.1a2.4 2.4 0 0 1 .2-.3l-5-5.7 1.2-1 5 5.6.2-.1V285h1.6v7.3h.3l4.9-5.5 1.2 1-4.9 5.5.3.6h4v.3h-13zm21.6 0a1.1 1.1 0 0 1 1-.6c.5 0 .8.3 1 .6h1.6c-.2-1-.9-1.6-1.8-2V287h-1.6v5.3c-.8.3-1.4.8-1.7 1.6h-4.4v.3h6m-30.2-15 6 6.8 1.3-1-6.1-6.7.3-.6h4.4V276h-4.4a2.6 2.6 0 0 0-2.5-1.7 2.6 2.6 0 0 0-2.7 2.5 2.5 2.5 0 0 0 1.8 2.4v5.2h1.6v-5.2h.3zm32 0v5.3h-1.7v-5.2a2.5 2.5 0 0 1-.4-.2l-6 6.8-1.3-1 6.2-6.9-.1-.3h-4.5V276h4.5a2.6 2.6 0 0 1 2.4-1.7 2.6 2.6 0 0 1 2.7 2.5 2.5 2.5 0 0 1-1.9 2.4zm-16.1 0v3.3h-1.7v-3.2a2.6 2.6 0 0 1-1.7-1.6h-4V276h4a2.6 2.6 0 0 1 2.5-1.7c1.2 0 2.2.7 2.5 1.7h4v1.6h-4a2.5 2.5 0 0 1-1.6 1.6zm-17.8 4-1.7.4v4.3l1.7.5v-5.2m1.6 0 1.7.4v4.3l-1.7.5v-5.2m30.6 0-1.7.4v4.3l1.7.5v-5.2m1.6 0 1.7.4v4.3l-1.7.5v-5.2m-25.5.8 1.6-.7 2.9 3.3-1 1.4-3.5-4m-1.3 1-1 1.4 3 3.3 1.6-.7-3.6-4m18.5-1.1-1.6-.7-3 3.3 1 1.4 3.6-4m1.2 1 1 1.4-3 3.3-1.5-.7 3.5-4m-20.3 9 .5-1.6h4.5l.5 1.6h-5.5m-6.7-17c0-.6.5-1 1.2-1a1 1 0 0 1 1 1c0 .6-.4 1-1 1a1.1 1.1 0 0 1-1.2-1zm12.1.8-.5 1.6h-4.5l-.5-1.6h5.5m0-1.6-.5-1.6h-4.5l-.5 1.6h5.5m15.7 17.8-.5-1.6h-4.5l-.5 1.6h5.5m4.4-17c0-.6.5-1 1.1-1a1 1 0 0 1 1.1 1c0 .6-.5 1-1 1a1.1 1.1 0 0 1-1.2-1zm-16.1 0c0-.6.5-1 1.1-1a1 1 0 0 1 1.1 1c0 .6-.5 1-1.1 1a1.1 1.1 0 0 1-1.1-1zm6.2.8.5 1.6h4.6l.5-1.6h-5.6m0-1.6.5-1.6h4.6l.5 1.6h-5.6m-5.9 5-1.7.5v4.3l1.7.5V281m1.7 0 1.6.5v4.3l-1.6.5V281"/>
  <path fill="none" stroke="#c8b100" stroke-width=".3" d="M232.7 316.3a15.6 15.6 0 0 0 3.7-1.1l.8 1.4a17.6 17.6 0 0 1-4.3 1.2 2.6 2.6 0 0 1-2.6 2 2.6 2.6 0 0 1-2.5-2 17.5 17.5 0 0 1-4.6-1.2l.8-1.4c1.3.5 2.6.9 4 1a2.5 2.5 0 0 1 1.5-1.3v-6.7h1.6v6.7c.7.2 1.3.7 1.6 1.4zm-4.7-20.4a2.3 2.3 0 0 1-.2-.5h-4V294h4a2.6 2.6 0 0 1 .2-.4l-5-5.6 1.2-1 5 5.5a2.2 2.2 0 0 1 .2 0V285h1.7v7.3h.2l4.9-5.5 1.2 1-4.9 5.5.3.6h4v1.5h-4c0 .2-.2.4-.3.5l4.7 5.3-1.3 1-4.6-5.3-.2.1v8.7h-1.6V297l-.2-.1-4.8 5.3-1.2-1 4.7-5.3m-12.8-16.7 6 6.8 1.3-1-6.1-6.7.3-.6h4.4V276h-4.4a2.6 2.6 0 0 0-2.5-1.7 2.6 2.6 0 0 0-2.6 2.5 2.5 2.5 0 0 0 1.7 2.4v5.2h1.6v-5.2h.3zm6.5 34.8-.8 1.4a16.6 16.6 0 0 1-3.6-3.1c-.9.2-1.8 0-2.5-.5a2.4 2.4 0 0 1-.3-3.5l.1-.1a15.3 15.3 0 0 1-1.2-4.8h1.6a13.1 13.1 0 0 0 1 4c.5 0 1 0 1.4.2l4.1-4.5 1.3 1-4.1 4.5c.6.9.5 2-.1 2.8a15.2 15.2 0 0 0 3.1 2.6zm-8.4-13.1V297a2.5 2.5 0 0 1-1.8-2.4c0-1 .8-2 1.8-2.4V287h1.6v5.3c.8.2 1.5.8 1.7 1.6h4.4v1.5h-4.4a2.6 2.6 0 0 1-1.6 1.6v3.9h-1.7m2.3 8.3c.4-.4 1.1-.5 1.6 0s.5 1 .1 1.4a1.2 1.2 0 0 1-1.6.1 1 1 0 0 1 0-1.5zm-2-4.5-1.7-.3-.3-4.3 1.7-.6v2.5c0 1 0 1.8.3 2.7zm1.4-5.3 1.6.4v2.2c0-.8.3 2.1.3 2.1l-1.7.6-.3-2.7v-2.6zm5.5 13.7a15.7 15.7 0 0 0 4.8 2.6l.4-1.6a13.7 13.7 0 0 1-4-2l-1.2 1m-.8 1.4a17.4 17.4 0 0 0 4.8 2.6l-1.2 1.1a18.7 18.7 0 0 1-4-2l.4-1.7"/>
  <path fill="none" stroke="#c8b100" stroke-width=".3" d="m221.9 305.1 1.6.7 3-3.3-1-1.4-3.6 4m-1.3-1-1-1.4 3-3.3 1.6.7-3.6 4m-7.6-9.5c0-.6.5-1 1-1 .7 0 1.2.5 1.2 1 0 .6-.5 1.1-1.1 1.1a1 1 0 0 1-1.1-1zm25.7 19.4.8 1.4a16.7 16.7 0 0 0 3.6-3.1c.9.2 1.8 0 2.6-.5a2.4 2.4 0 0 0 .2-3.5l-.1-.1a15 15 0 0 0 1.3-4.8h-1.7a13.3 13.3 0 0 1-1 4 3 3 0 0 0-1.4.2l-4.1-4.5-1.3 1 4.1 4.5a2.4 2.4 0 0 0 .1 2.8 15 15 0 0 1-3 2.6zm8.4-13.1V297a2.5 2.5 0 0 0 1.8-2.4c0-1-.7-2-1.8-2.4V287h-1.6v5.3c-.8.2-1.4.8-1.7 1.6h-4.4v1.5h4.4c.3.8.9 1.3 1.7 1.6v3.9h1.6zm-2.3 8.3a1.2 1.2 0 0 0-1.6 0 1 1 0 0 0-.1 1.4 1.2 1.2 0 0 0 1.6.1 1 1 0 0 0 0-1.5zm2-4.5 1.7-.3.3-4.3-1.7-.6v2.5c0 1 0 1.8-.2 2.7zm-1.3-5.3-1.7.4v2.2c0-.8-.3 2.1-.3 2.1l1.7.6.3-2.7v-2.6m1.6-20.1v5.2h-1.6v-5.2a2.3 2.3 0 0 1-.4-.2l-6 6.8-1.2-1 6-7v-.2h-4.5V276h4.4a2.6 2.6 0 0 1 2.5-1.7 2.6 2.6 0 0 1 2.6 2.5 2.5 2.5 0 0 1-1.8 2.4zm-16 0v3.2h-1.7v-3.2a2.6 2.6 0 0 1-1.7-1.6h-4V276h4c.4-1 1.3-1.7 2.5-1.7s2.2.7 2.5 1.7h4v1.6h-4a2.5 2.5 0 0 1-1.6 1.6zm8.8 33.8a15.7 15.7 0 0 1-4.8 2.6l-.4-1.6a13.7 13.7 0 0 0 4-2l1.2 1m.8 1.4a17.4 17.4 0 0 1-4.8 2.6l1.2 1.1a18.7 18.7 0 0 0 4-2l-.4-1.7m-27.4-31.4-1.7.5v4.3l1.7.5v-5.2m1.7 0 1.6.4v4.3l-1.6.5V283m30.5 0-1.7.5v4.3l1.7.5V283"/>
  <path fill="none" stroke="#c8b100" stroke-width=".3" d="m247.1 283.1 1.7.5v4.3l-1.7.5V283m-8.6 22-1.6.7-2.9-3.3 1-1.4 3.5 4m1.3-1 1-1.4-3-3.3-1.6.7 3.6 4m-18.2-20 1.6-.7 3 3.3-1 1.4-3.6-4m-1.3 1-1 1.4 3 3.3 1.6-.7-3.6-4m18.5-1.1-1.6-.7-3 3.3 1 1.4 3.6-4m1.2 1 1 1.4-3 3.2-1.5-.6 3.5-4m-20.3 9 .5-1.6h4.5l.5 1.6h-5.5m0 1.5.5 1.6h4.5l.5-1.6h-5.5M213 277c0-.6.5-1 1.2-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1.2-1zm12.1.8-.5 1.6h-4.5l-.5-1.6h5.5m0-1.6-.5-1.6h-4.5l-.5 1.6h5.5m20.1 18.5c0-.5.5-1 1.1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1.1-1 1.1a1 1 0 0 1-1.2-1zm-4.4-.7-.5-1.6h-4.5l-.5 1.6h5.5m0 1.5-.5 1.6h-4.5l-.5-1.6h5.5m-11.6 21.9c0-.6.5-1 1.1-1 .6 0 1.1.4 1.1 1s-.5 1-1 1a1.1 1.1 0 0 1-1.2-1zm1.9-7.8 1.7-.4v-4.3l-1.7-.5v5.2m-1.6 0-1.7-.4v-4.3l1.7-.5v5.2m15.7-32.6c0-.6.5-1 1.1-1a1 1 0 0 1 1.1 1c0 .6-.5 1-1 1a1.1 1.1 0 0 1-1.2-1zm-16.1 0c0-.6.5-1 1.1-1a1 1 0 0 1 1.1 1c0 .6-.5 1-1 1a1.1 1.1 0 0 1-1.2-1zm6.2.8.5 1.6h4.6l.5-1.6h-5.5m0-1.6.4-1.6h4.6l.5 1.6h-5.5m-6 5-1.6.5v4.3l1.6.5V281m1.7 0 1.6.5v4.3l-1.6.5V281"/>
  <path fill="#058e6e" d="M227.7 294.7a2.6 2.6 0 0 1 2.6-2.5 2.6 2.6 0 0 1 2.6 2.5 2.6 2.6 0 0 1-2.6 2.4c-1.4 0-2.6-1-2.6-2.4"/>
  <path fill="#db4446" d="M230.9 229.7v-.6l.1-.3-2.3-.1a5.9 5.9 0 0 1-2.3-1.2c-.8-.7-1.1-1-1.6-1.2-1.3-.2-2.3.4-2.3.4s1 .4 1.7 1.3 1.5 1.3 1.8 1.4c.6.2 2.6 0 3.1.1l1.8.2"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M230.9 229.7v-.6l.1-.3-2.3-.1a5.9 5.9 0 0 1-2.3-1.2c-.8-.7-1.1-1-1.6-1.2-1.3-.2-2.3.4-2.3.4s1 .4 1.7 1.3 1.5 1.3 1.8 1.4c.6.2 2.6 0 3.1.1l1.8.2z"/>
  <path fill="#ed72aa" stroke="#000" stroke-width=".4" d="M238.1 227.5v1.4c.2.6-.1 1.2 0 1.5 0 .4.1.6.3.9l.2.9-.7-.5-.6-.4v1c.1.2.3.8.6 1.1l1 1.3c.2.5.1 1.4.1 1.4s-.4-.7-.8-.8l-1.2-.7s.7.8.7 1.5c0 .8-.3 1.6-.3 1.6s-.3-.7-.8-1.1l-1-.9s.4 1.2.4 2v2.3l-.9-1-1-.7c0-.2.5.6.6 1.1 0 .5.3 2.3 1.8 4.5 1 1.3 2.3 3.6 5.3 2.9 3-.8 1.9-4.8 1.3-6.7a16.8 16.8 0 0 1-1-4.6c0-.8.6-2.9.5-3.3a8 8 0 0 1 .2-3.1c.4-1.3.7-1.8.9-2.3.2-.6.4-.9.4-1.3l.1-1.3.7 1.3.1 1.5s.1-1 1-1.6c.8-.6 1.8-1.1 2-1.4.3-.3.3-.5.3-.5s0 1.8-.6 2.6l-1.7 2s.7-.3 1.2-.3h.9s-.6.4-1.4 1.6c-.8 1-.5 1.2-1 2.1-.6 1-1 1-1.7 1.5-1 .8-.5 4.2-.4 4.7.2.5 2 4.5 2 5.5s.2 3.2-1.5 4.6c-1.1 1-3 1-3.4 1.2-.4.3-1.2 1.1-1.2 2.8 0 1.7.6 2 1 2.4.6.5 1.2.2 1.3.6.2.3.2.5.5.7.2.2.3.4.2.8 0 .3-.8 1.1-1.1 1.7l-.8 2.4c0 .2-.1 1 .1 1.3 0 0 .9 1 .3 1.2-.4.2-.8-.2-1-.2l-.9.5c-.3-.1-.3-.3-.4-.8l-.1-.7c-.2 0-.3.2-.4.5 0 .2 0 .8-.3.8-.2 0-.5-.4-.8-.5-.2 0-.8-.2-.8-.4 0-.3.4-.9.7-1 .4 0 .8-.3.5-.5s-.5-.2-.7 0-.8 0-.7-.2v-.8c0-.2-.4-.5.1-.8.6-.3.8.2 1.4.1.6 0 .8-.3 1-.6.2-.3.2-1-.2-1.4-.4-.5-.7-.5-.9-.8l-.3-.9v2.2l-.7-.8c-.3-.3-.6-1.3-.6-1.3v1.3c0 .4.3.7.2.8-.1.1-.8-.7-1-.8a3.7 3.7 0 0 1-1-1l-.4-1.4a4.2 4.2 0 0 1 0-1.5l.4-1h-1.4c-.7 0-1.2-.3-1.5.2-.3.5-.2 1.5.2 2.8.3 1.2.5 1.9.4 2.1a3 3 0 0 1-.7.8h-.9a2.5 2.5 0 0 0-1.2-.3h-1.3l-1.1-.3c-.3.1-.8.3-.6.7.2.6-.2.7-.5.7l-.9-.2c-.4-.1-.9 0-.8-.4 0-.4.2-.4.4-.7.2-.3.2-.5 0-.5h-.6c-.2.2-.5.5-.8.4-.2-.1-.4-.4-.4-1s-.7-1.2 0-1.1c.5 0 1.3.4 1.4 0 .2-.3 0-.4-.2-.7s-.8-.4-.3-.7l.7-.5c.1-.2.4-.8.7-.6.6.2 0 .7.6 1.3.6.7 1 1 2 .8 1 0 1.3-.2 1.3-.5l-.1-1v-1s-.4.3-.5.6l-.4.8v-2a8 8 0 0 0-.2-.8l-.3.9-.1 1s-.7-.5-.5-1.5c.1-.7-.1-1.6.1-2 .2-.3.7-1.5 2-1.6h2.6l2-.3s-2.8-1.4-3.5-1.9a9.5 9.5 0 0 1-2-2l-.6-1.6s-.5 0-1 .3a5 5 0 0 0-1.2 1l-.7 1 .1-1.2v-.8s-.4 1.2-1 1.7l-1.4 1v-.8l.2-1s-.4.8-1.1 1c-.7 0-1.8 0-1.9.4 0 .5.2 1 0 1.4 0 .3-.4.5-.4.5l-.8-.4c-.4 0-.7.2-.7.2s-.3-.4-.2-.7c.1-.2.7-.6.5-.8l-.8.2c-.3.1-.8.3-.8-.2 0-.4.2-.7 0-1 0-.3 0-.5.2-.6l1.2-.1c0-.2-.2-.5-.8-.6-.6-.1-.8-.5-.5-.8.3-.2.3-.3.5-.6.1-.2.2-.7.7-.5.5.3.4.8 1 1a4 4 0 0 0 2-.2l1.5-1 1.5-1-1-.8c-.3-.3-.7-.9-1-1a8.3 8.3 0 0 0-1.8-.6 9 9 0 0 1-1.7-.5l.8-.3c.2-.2.6-.6.8-.6h.3-1.4c-.3-.1-1-.6-1.3-.6l-.8.1s.8-.4 1.4-.5l1-.1s-.9-.3-1.1-.6l-.6-1c-.2-.1-.3-.5-.6-.5l-1 .3c-.4 0-.6-.2-.6-.6l-.1-.5c-.2-.3-.6-.8-.2-1h1.4c0-.2-.5-.6-.8-.8-.4-.2-1-.5-.7-.8l.8-.5c.2-.3.3-1 .7-.7.4.2.8 1.2 1.1 1.1.3 0 .3-.8.3-1 0-.4 0-1 .2-.9.3 0 .5.4 1 .5.4 0 1-.1 1 .2 0 .3-.3.7-.6 1-.3.3-.4 1-.3 1.4.2.5.7 1.2 1.2 1.4.4.3 1.2.5 1.7.9.5.3 1.7 1.2 2.1 1.3l.8.4s.5-.2 1.1-.2c.7 0 2.1 0 2.6-.2.6-.2 1.3-.6 1-1-.1-.6-1.3-1-1.2-1.4 0-.4.5-.4 1.2-.4.8 0 1.8.1 2-1 .2-1 .2-1.5-.8-1.8-1-.2-1.8-.2-2-1-.2-.7-.4-.9-.2-1.1.3-.2.6-.3 1.4-.4.8 0 1.6 0 1.9-.2.2-.2.3-.7.6-.9.3-.2 1.4-.4 1.4-.4s1.4.7 2.7 1.7a15 15 0 0 1 2.2 2.1"/>
  <path d="m228.1 226.8-.2-.6v-.3s.8 0 .7.3c0 .2-.2.2-.3.3l-.2.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m228.1 226.8-.2-.6v-.3s.8 0 .7.3c0 .2-.2.2-.3.3l-.2.3z"/>
  <path d="M232 225.4v-.4s.7 0 1 .3c.5.4.9 1 .9 1l-.8-.4h-.5l-.3-.1v-.3h-.3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M232 225.4v-.4s.7 0 1 .3c.5.4.9 1 .9 1l-.8-.4h-.5l-.3-.1v-.3h-.3z"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m237.3 231.3-.4-.7a8 8 0 0 1-.3-.4"/>
  <path fill="#db4446" d="M217.4 226.6s.5.4.8.4h.8s.2-.5.1-.8c-.2-1.2-1.2-1.4-1.2-1.4s.3.7.1 1a2 2 0 0 1-.6.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M217.4 226.6s.5.4.8.4h.8s.2-.5.1-.8c-.2-1.2-1.2-1.4-1.2-1.4s.3.7.1 1a2 2 0 0 1-.6.8z"/>
  <path fill="#db4446" d="M215.2 227.6s-.4-.7-1.3-.6c-.8 0-1.4.8-1.4.8h1.2c.3.3.4 1 .4 1l.7-.6a7.2 7.2 0 0 0 .4-.6"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M215.2 227.6s-.4-.7-1.3-.6c-.8 0-1.4.8-1.4.8h1.2c.3.3.4 1 .4 1l.7-.6a7.2 7.2 0 0 0 .4-.6z"/>
  <path fill="#db4446" d="M214.2 230.6s-.8.1-1.2.6c-.4.5-.3 1.3-.3 1.3s.4-.5.9-.5l1 .2-.1-.8-.3-.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M214.2 230.6s-.8.1-1.2.6c-.4.5-.3 1.3-.3 1.3s.4-.5.9-.5l1 .2-.1-.8-.3-.8z"/>
  <path d="m228.2 230.5.3-.5.3.5h-.7"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m228.2 230.5.3-.5.3.5h-.7"/>
  <path d="m229 230.5.3-.5.4.5h-.8"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m229 230.5.3-.5.4.5h-.8"/>
  <path d="m228.6 227.3.8.3-.7.4-.1-.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m228.6 227.3.8.3-.7.4-.1-.6"/>
  <path d="m229.5 227.6.7.2-.5.4-.2-.6"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m229.5 227.6.7.2-.5.4-.2-.6"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M224.2 233.7s-.7.2-1 .6c-.4.5-.3 1-.3 1s.6-.5 1.5-.3l1.2.3 1.3-.3s-.7.8-.7 1.3l.2 1.1c0 .7-.6 1.6-.6 1.6l1-.3a4.6 4.6 0 0 0 1.7-.8l.9-1s-.2 1 0 1.4l.2 1.6.8-.6c.2-.1.7-.4.9-.7l.3-1s0 .8.4 1.3l.6 1.6s.3-.8.6-1.1c.3-.4.7-.8.7-1a4.3 4.3 0 0 0-.1-.9l.4.8m-11 .6s.5-.8 1-1l1.1-.8.9-.4m1 5 1.3-.8a4 4 0 0 0 1-1"/>
  <path fill="#db4446" d="M216.6 240.4s-.4-.5-1.1-.3c-.7 0-1.2.9-1.2.9s.6-.2 1-.1.6.4.6.4l.4-.4.3-.6"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M216.6 240.4s-.4-.5-1.1-.3c-.7 0-1.2.9-1.2.9s.6-.2 1-.1.6.4.6.4l.4-.4.3-.6z"/>
  <path fill="#db4446" d="M215.8 243.2s-.6 0-1.1.3c-.5.4-.5 1.2-.5 1.2s.4-.4.8-.3l.9.2v-.6c.2-.4-.1-.8-.1-.8"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M215.8 243.2s-.6 0-1.1.3c-.5.4-.5 1.2-.5 1.2s.4-.4.8-.3l.9.2v-.6c.2-.4-.1-.8-.1-.8z"/>
  <path fill="#db4446" d="M217.2 245.8s0 .8.3 1.3c.4.5 1.1.5 1.1.5l-.3-.7c0-.4.3-.8.3-.8s-.3-.3-.7-.3h-.7"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M217.2 245.8s0 .8.3 1.3c.4.5 1.1.5 1.1.5l-.3-.7c0-.4.3-.8.3-.8s-.3-.3-.7-.3h-.7zm16 1.3s2 1.2 1.9 2.2c0 1-1 2.3-1 2.3"/>
  <path fill="#db4446" d="M224.2 252.6s-.4-.6-1.1-.6c-.7 0-1.4.7-1.4.7s.8-.1 1 .2l.5.6.5-.3.5-.6"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M224.2 252.6s-.4-.6-1.1-.6c-.7 0-1.4.7-1.4.7s.8-.1 1 .2l.5.6.5-.3.5-.6z"/>
  <path fill="#db4446" d="M222.2 255.3s-1-.1-1.4.3c-.4.5-.4 1.3-.4 1.3s.6-.6 1-.5c.5 0 1 .3 1 .3v-.7l-.3-.7"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M222.2 255.3s-1-.1-1.4.3c-.4.5-.4 1.3-.4 1.3s.6-.6 1-.5c.5 0 1 .3 1 .3v-.7l-.3-.7z"/>
  <path fill="#db4446" d="M224 258.1s-.3.7 0 1.1c.3.5 1 .8 1 .8s-.3-.4-.2-.8c.1-.3.7-.8.7-.8l-1.4-.2"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M224 258.1s-.3.7 0 1.1c.3.5 1 .8 1 .8s-.3-.4-.2-.8c.1-.3.7-.8.7-.8l-1.4-.2z"/>
  <path fill="#db4446" d="M236 259.3s-.8-.2-1.2 0c-.5.3-.8 1.4-.8 1.4s.7-.6 1.2-.5c.5 0 1 .3 1 .3v-.8l-.2-.4"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M236 259.3s-.8-.2-1.2 0c-.5.3-.8 1.4-.8 1.4s.7-.6 1.2-.5c.5 0 1 .3 1 .3v-.8l-.2-.4z"/>
  <path fill="#db4446" d="M236.4 262.2s-.6.6-.4 1.1l.6 1s0-.7.2-1l1-.3-.7-.5a15.8 15.8 0 0 1-.7-.3"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M236.4 262.2s-.6.6-.4 1.1l.6 1s0-.7.2-1l1-.3-.7-.5a15.8 15.8 0 0 1-.7-.3z"/>
  <path fill="#db4446" d="M239.4 263s-.3.8.2 1.3c.6.5 1 .5 1 .5s-.3-.7-.2-1.1c.1-.5.5-.7.5-.7l-.8-.2-.7.3"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M239.4 263s-.3.8.2 1.3c.6.5 1 .5 1 .5s-.3-.7-.2-1.1c.1-.5.5-.7.5-.7l-.8-.2-.7.3z"/>
  <path fill="#ffd691" stroke="#000" stroke-width=".5" d="M208.8 316.4c2 .6 3 2 3 3.8 0 2.3-2.2 4-5 4-3 0-5.3-1.7-5.3-4 0-1.7 1-3.6 3-3.8l-.2-.4-.7-.7h1.2l.8.5.5-.7c.3-.4.6-.5.6-.5l.6.6.3.5.7-.4.8-.3s0 .4-.2.7l-.1.7"/>
  <path fill="#058e6e" stroke="#000" stroke-width=".5" d="M206.3 326.7s-3.8-2.6-5.5-3c-2-.4-4.5 0-5.5 0 0 0 1.2.8 1.8 1.4.5.5 2.3 1.5 3.3 1.8 3 .8 6-.2 6-.2m1 .2s2.4-2.5 5-2.9c3-.4 5 .3 6.2.6l-1.5.8c-.5.3-2 1.5-4 1.6-2 0-4.4-.3-4.8-.2l-.9.1"/>
  <path fill="#ad1519" stroke="#000" stroke-width=".5" d="M206.7 323.8a4.8 4.8 0 0 1 0-7.1 4.8 4.8 0 0 1 1.5 3.5 4.9 4.9 0 0 1-1.5 3.6"/>
  <path fill="#058e6e" stroke="#000" stroke-width=".5" d="M205.7 329s.6-1.5.6-2.7l-.1-2.1h.8s.3 1.1.3 2l-.1 2.4-.7.1-.8.3"/>
  <path fill="#fff" d="M254 190.7c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M254 190.7c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M255.4 188.2c0-.6.5-1 1.1-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M255.4 188.2c0-.6.5-1 1.1-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M256.4 185.2c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M256.4 185.2c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1z"/>
  <path fill="#fff" d="M256.5 182c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M256.5 182c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M255.7 179c0-.6.5-1 1-1 .7 0 1.2.4 1.2 1s-.5 1-1.1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M255.7 179c0-.6.5-1 1-1 .7 0 1.2.4 1.2 1s-.5 1-1.1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M254.1 176.1c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M254.1 176.1c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M252 173.8c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M252 173.8c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M249.4 171.8c0-.5.5-1 1.1-1a1 1 0 0 1 0 2c-.6 0-1-.4-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M249.4 171.8c0-.5.5-1 1.1-1a1 1 0 0 1 0 2c-.6 0-1-.4-1-1z"/>
  <path fill="#fff" d="M246.5 170.3c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M246.5 170.3c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M243.3 169.1c0-.5.5-1 1.1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M243.3 169.1c0-.5.5-1 1.1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M239.9 168.5c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M239.9 168.5c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M236.6 168.3c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M236.6 168.3c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M233.3 168.5c0-.6.5-1 1-1 .7 0 1.1.4 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M233.3 168.5c0-.6.5-1 1-1 .7 0 1.1.4 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M230.1 168.5c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M230.1 168.5c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1z"/>
  <path fill="#fff" stroke="#000" stroke-width=".4" d="M231.7 171.2c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1m.6 3.1c0-.6.4-1 1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1m0 3c0-.5.6-1 1.1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1m-1 2.8c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1 0 .6-.4 1-1 1a1 1 0 0 1-1-1m-1.9 2.6c0-.5.5-1 1-1 .7 0 1.2.5 1.2 1s-.5 1-1.1 1c-.6 0-1-.4-1-1"/>
  <path fill="#fff" d="M227.6 166.5c0-.5.5-1 1.1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M227.6 166.5c0-.5.5-1 1.1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M224.8 165c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M224.8 165c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M221.6 164c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1 0 .5-.5 1-1 1-.6 0-1.1-.5-1.1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M221.6 164c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1 0 .5-.5 1-1 1-.6 0-1.1-.5-1.1-1z"/>
  <path fill="#fff" d="M218.3 163.4c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M218.3 163.4c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1z"/>
  <path fill="#fff" d="M215 163.5c0-.6.5-1 1.1-1 .6 0 1 .4 1 1 0 .5-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M215 163.5c0-.6.5-1 1.1-1 .6 0 1 .4 1 1 0 .5-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M211.7 164c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M211.7 164c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M208.6 165.1c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M208.6 165.1c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1z"/>
  <path fill="#fff" d="M156 190.7c0-.5.4-1 1-1s1 .5 1 1c0 .6-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M156 190.7c0-.5.4-1 1-1s1 .5 1 1c0 .6-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M154.5 188.2c0-.6.5-1 1-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M154.5 188.2c0-.6.5-1 1-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M153.5 185.2c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M153.5 185.2c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M153.4 182c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M153.4 182c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M154.2 179c0-.6.5-1 1-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M154.2 179c0-.6.5-1 1-1 .6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M155.8 176.1c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M155.8 176.1c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1s-.5 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M158 173.8c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M158 173.8c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M160.5 171.8c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M160.5 171.8c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M163.5 170.3c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M163.5 170.3c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M166.6 169.1c0-.5.5-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M166.6 169.1c0-.5.5-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M170 168.5c0-.5.5-1 1.1-1a1 1 0 0 1 0 2c-.6 0-1-.4-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M170 168.5c0-.5.5-1 1.1-1a1 1 0 0 1 0 2c-.6 0-1-.4-1-1z"/>
  <path fill="#fff" d="M173.4 168.3c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M173.4 168.3c0-.5.4-1 1-1s1 .5 1 1-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M176.6 168.5c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M176.6 168.5c0-.6.5-1 1-1 .6 0 1.1.4 1.1 1s-.5 1-1 1a1 1 0 0 1-1.1-1z"/>
  <path fill="#fff" d="M179.8 168.5c0-.6.5-1 1-1 .7 0 1.2.4 1.2 1s-.5 1-1.1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M179.8 168.5c0-.6.5-1 1-1 .7 0 1.2.4 1.2 1s-.5 1-1.1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" stroke="#000" stroke-width=".4" d="M178.2 171.2c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1m-.7 3.1c0-.6.4-1 1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1m-.2 3c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1m.9 2.8c0-.5.5-1 1-1 .6 0 1.1.5 1.1 1 0 .6-.5 1-1 1a1 1 0 0 1-1.1-1m1.8 2.6c0-.5.5-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1"/>
  <path fill="#fff" d="M182.3 166.5c0-.5.5-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M182.3 166.5c0-.5.5-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M185.2 165c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M185.2 165c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M188.3 164c0-.6.5-1 1-1 .7 0 1.1.4 1.1 1 0 .5-.4 1-1 1s-1-.5-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M188.3 164c0-.6.5-1 1-1 .7 0 1.1.4 1.1 1 0 .5-.4 1-1 1s-1-.5-1-1z"/>
  <path fill="#fff" d="M191.6 163.4c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M191.6 163.4c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M194.9 163.5c0-.6.4-1 1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M194.9 163.5c0-.6.4-1 1-1s1 .4 1 1c0 .5-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M198.2 164c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M198.2 164c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#fff" d="M201.3 165.1c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1"/>
  <path fill="none" stroke="#000" stroke-width=".4" d="M201.3 165.1c0-.5.5-1 1-1 .7 0 1.1.5 1.1 1s-.4 1-1 1a1 1 0 0 1-1-1z"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="M174.7 228.9h-1v-1h-1.5v3.6h1.6v2.5h-3.4v7h1.8v14.3h-3.5v7.3h27.2v-7.3h-3.5V241h1.8v-7h-3.4v-2.5h1.6V228h-1.6v.9h-.8v-1h-1.6v1h-1.1v-1h-1.6v3.6h1.6v2.5H184v-7.8h1.7v-3.5H184v.9h-1v-1h-1.5v1h-.9v-1H179v3.6h1.7v7.8h-3.3v-2.5h1.6V228h-1.6v.9h-.9v-1h-1.8v1zm-6 33.7H196m-27.3-1.8H196m-27.3-1.8H196m-27.3-1.7H196m-27.3-2H196m-23.8-1.6h20.2m-20.2-1.8h20.2m-20.2-2h20.2m-20.2-1.7h20.2m-20.2-1.8h20.2m-20.2-1.8h20.2m-20.2-1.7h20.2m-22-1.8h23.8m-23.8-1.8h23.8m-23.8-1.8h23.8m-23.8-1.8h23.8m-20.4-1.7h17m-10.2-1.8h3.4m-3.4-1.8h3.4m-3.4-1.8h3.4m-3.4-1.7h3.4m-5.1-2.2h6.8m-12 7.5h3.6m-5-2.2h6.6m-6.7 32.6v-1.8m0-1.8v-1.7m-1.8 1.7v1.8m3.4 0V259m1.7 3.6v-1.8m0-1.8v-1.7m0-2v-1.6m0-1.8v-2m-1.7 7.4v-2m-3.4 2v-2m7 0v2m1.5-2v-1.6m-5.1-1.8v1.8m3.5-1.8v1.8m3.3-1.8v1.8M179 252v-2m1.7-1.7v1.7m0-5.3v1.8m-1.7-3.6v1.8m1.7-3.5v1.7m-3.3-1.7v1.7m-3.5-1.7v1.7m-1.6-3.5v1.8m3.3-1.8v1.8m3.4-1.8v1.8m1.7-3.6v1.8m-3.3-1.8v1.8m-3.5-1.8v1.8m-1.6-3.6v1.8m6.7-1.8v1.8m-3.4-5.3v1.8m15.3-1.8h-3.5m5-2.2h-6.6m6.7 32.6v-1.8m0-1.8v-1.7m1.8 1.7v1.8m-3.4 0V259m-1.7 3.6v-1.8m0-1.8v-1.7m0-2v-1.6m0-1.8v-2m1.7 7.4v-2m3.4 2v-2m-7 0v2m-1.5-2v-1.6m5.1-1.8v1.8m-3.5-1.8v1.8m-3.3-1.8v1.8m1.7-1.8v-2m-1.7-1.7v1.7m0-5.3v1.8m1.7-3.6v1.8m-1.7-3.5v1.7m3.3-1.7v1.7m3.5-1.7v1.7m1.6-3.5v1.8m-3.3-1.8v1.8m-3.4-1.8v1.8m-1.7-3.6v1.8m3.3-1.8v1.8m3.5-1.8v1.8m1.6-3.6v1.8m-6.7-1.8v1.8m3.4-5.3v1.8m-7 18v-2m0-5.4v-1.8m0 5.4v-1.8m0-5.3v-1.8m0-1.8v-1.7m0-3.6v-1.8m0-1.7v-1.8m-8.3 4.6h3.5m3.3-5.3h3.4m3.3 5.3h3.5"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="M186.8 262.6v-4.7c0-.8-.4-3.5-4.6-3.5-4 0-4.4 2.7-4.4 3.5v4.7h9z"/>
  <path fill="#c8b100" stroke="#000" stroke-width=".4" d="m179.3 258.2-2.2-.3c0-.9.2-2.2.9-2.6l2 1.5c-.3.2-.7 1-.7 1.4zm6 0 2.2-.3c0-.9-.2-2.2-.9-2.6l-2 1.5c.3.2.7 1 .7 1.4zm-2.2-2.3 1-2a5.3 5.3 0 0 0-2-.4l-1.7.4 1.1 2h1.6zm-4.2-5.5v-4.9c0-1.3-1-2.4-2.5-2.4s-2.4 1-2.4 2.4v4.9h4.9zm6.8 0v-4.9c0-1.3 1-2.4 2.5-2.4s2.4 1 2.4 2.4v4.9h-4.9zm-1.7-12 .4-4.4h-4.2l.2 4.4h3.6zm3.3 0-.4-4.4h4.4l-.5 4.4h-3.5zm-10 0 .2-4.4h-4.2l.5 4.4h3.5z"/>
  <path fill="#0039f0" d="M185.3 262.6v-4c0-.7-.5-2.7-3.1-2.7-2.4 0-2.9 2-2.9 2.7v4h6zm-6.9-12.7v-4.2c0-1-.6-2.2-2-2.2s-2 1.1-2 2.2v4.3h4zm7.8 0v-4.2c0-1 .7-2.2 2-2.2s2 1.1 2 2.2v4.3h-4z"/>
  <path fill="#ad1519" d="M190.8 269.8c0-9.7 7-17.6 15.6-17.6s15.6 7.9 15.6 17.6-7 17.5-15.6 17.5-15.6-7.8-15.6-17.5"/>
  <path fill="none" stroke="#000" stroke-width=".6" d="M190.8 269.8c0-9.7 7-17.6 15.6-17.6s15.6 7.9 15.6 17.6-7 17.5-15.6 17.5-15.6-7.8-15.6-17.5z"/>
  <path fill="#005bbf" d="M195.4 269.7c0-7 5-12.8 11-12.8s11 5.7 11 12.8c0 7.2-5 13-11 13s-11-5.8-11-13"/>
  <path fill="none" stroke="#000" stroke-width=".6" d="M195.4 269.7c0-7 5-12.8 11-12.8s11 5.7 11 12.8c0 7.2-5 13-11 13s-11-5.8-11-13z"/>
  <path fill="#c8b100" d="M201.2 260.9s-1.3 1.4-1.3 2.7a6 6 0 0 0 .6 2.4c-.2-.5-.8-.8-1.4-.8-.8 0-1.4.6-1.4 1.3l.2.8.5.9c.1-.3.5-.5 1-.5s1 .4 1 1a.9.9 0 0 1 0 .2h-1.2v1h1l-.8 1.5 1-.4.8.9.8-.9 1 .4-.7-1.5h1v-1h-1.1a.9.9 0 0 1 0-.3 1 1 0 0 1 1-1c.4 0 .7.3 1 .6l.4-1 .2-.7a1.4 1.4 0 0 0-1.4-1.3c-.7 0-1.2.3-1.4.9 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".3" d="M201.2 260.9s-1.3 1.4-1.3 2.7a6 6 0 0 0 .6 2.4c-.2-.5-.8-.8-1.4-.8-.8 0-1.4.6-1.4 1.3l.2.8.5.9c.1-.3.5-.5 1-.5s1 .4 1 1a.9.9 0 0 1 0 .2h-1.2v1h1l-.8 1.5 1-.4.8.9.8-.9 1 .4-.7-1.5h1v-1h-1.1a.9.9 0 0 1 0-.3 1 1 0 0 1 1-1c.4 0 .7.3 1 .6l.4-1 .2-.7a1.4 1.4 0 0 0-1.4-1.3c-.7 0-1.2.3-1.4.9 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7z"/>
  <path fill="#c8b100" d="M199.2 269.9h4.1v-1h-4.1v1z"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M199.2 269.9h4.1v-1h-4.1v1z"/>
  <path fill="#c8b100" d="M211.4 260.9s-1.3 1.4-1.3 2.7c0 1.3.6 2.4.6 2.4-.2-.5-.7-.8-1.4-.8-.8 0-1.4.6-1.4 1.3l.2.8.5.9c.2-.3.5-.5 1-.5a1 1 0 0 1 1 1 .9.9 0 0 1 0 .2h-1.2v1h1l-.8 1.5 1-.4.8.9.8-.9 1 .4-.7-1.5h1v-1h-1.1a.8.8 0 0 1 0-.3 1 1 0 0 1 1-1c.4 0 .8.3 1 .6l.4-1 .2-.7a1.4 1.4 0 0 0-1.4-1.3c-.6 0-1.2.3-1.4.9 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".3" d="M211.4 260.9s-1.3 1.4-1.3 2.7c0 1.3.6 2.4.6 2.4-.2-.5-.7-.8-1.4-.8-.8 0-1.4.6-1.4 1.3l.2.8.5.9c.2-.3.5-.5 1-.5a1 1 0 0 1 1 1 .9.9 0 0 1 0 .2h-1.2v1h1l-.8 1.5 1-.4.8.9.8-.9 1 .4-.7-1.5h1v-1h-1.1a.8.8 0 0 1 0-.3 1 1 0 0 1 1-1c.4 0 .8.3 1 .6l.4-1 .2-.7a1.4 1.4 0 0 0-1.4-1.3c-.6 0-1.2.3-1.4.9 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7z"/>
  <path fill="#c8b100" d="M209.4 269.9h4.1v-1h-4.1v1z"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M209.4 269.9h4.1v-1h-4.1v1z"/>
  <path fill="#c8b100" d="M206.3 269.6s-1.3 1.5-1.3 2.8.6 2.4.6 2.4c-.2-.5-.7-.9-1.4-.9-.8 0-1.4.6-1.4 1.4l.2.7.5 1c.1-.4.5-.6 1-.6a1 1 0 0 1 1 1 .9.9 0 0 1 0 .3h-1.2v1h1l-.8 1.5 1-.4.8.9.8-1 1 .5-.7-1.5h1v-1h-1.1a.9.9 0 0 1 0-.3 1 1 0 0 1 1-1c.4 0 .7.2.9.6l.5-1 .2-.7a1.4 1.4 0 0 0-1.4-1.4c-.7 0-1.2.4-1.4 1 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7"/>
  <path fill="none" stroke="#000" stroke-linejoin="round" stroke-width=".3" d="M206.3 269.6s-1.3 1.5-1.3 2.8.6 2.4.6 2.4c-.2-.5-.7-.9-1.4-.9-.8 0-1.4.6-1.4 1.4l.2.7.5 1c.1-.4.5-.6 1-.6a1 1 0 0 1 1 1 .9.9 0 0 1 0 .3h-1.2v1h1l-.8 1.5 1-.4.8.9.8-1 1 .5-.7-1.5h1v-1h-1.1a.9.9 0 0 1 0-.3 1 1 0 0 1 1-1c.4 0 .7.2.9.6l.5-1 .2-.7a1.4 1.4 0 0 0-1.4-1.4c-.7 0-1.2.4-1.4 1 0 0 .6-1.2.6-2.5s-1.4-2.7-1.4-2.7z"/>
  <path fill="#c8b100" d="M204.3 278.6h4.1v-1h-4.1v1z"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M204.3 278.6h4.1v-1h-4.1v1z"/>
  <path fill="#c8b100" d="M237.6 223.4h-.3a1.5 1.5 0 0 1-.3.4c-.2.2-.6.2-.8 0a.5.5 0 0 1-.1-.4.5.5 0 0 1-.5 0c-.3-.1-.3-.5-.1-.7v-.5h-.3l-.1.2c-.2.3-.5.3-.7.2a.6.6 0 0 1 0-.2h-.3c-.5.2-.7-1-.7-1.2l-.2.2s.2.7.1 1.2c0 .6-.3 1.2-.3 1.2a9 9 0 0 1 2.9 1.6 9 9 0 0 1 2.2 2.3l1.2-.5c.6-.2 1.3-.2 1.3-.2l.2-.2c-.3 0-1.5.1-1.5-.4v-.2a.7.7 0 0 1-.2 0c-.2-.2-.2-.4 0-.7l.2-.1v-.3h-.3l-.2.1c-.2.3-.6.3-.8 0a.4.4 0 0 1-.1-.4.6.6 0 0 1-.5 0c-.2-.2-.3-.5 0-.8l.2-.3v-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M237.6 223.4h-.3a1.5 1.5 0 0 1-.3.4c-.2.2-.6.2-.8 0a.5.5 0 0 1-.1-.4.5.5 0 0 1-.5 0c-.3-.1-.3-.5-.1-.7v-.5h-.3l-.1.2c-.2.3-.5.3-.7.2a.6.6 0 0 1 0-.2h-.3c-.5.2-.7-1-.7-1.2l-.2.2s.2.7.1 1.2c0 .6-.3 1.2-.3 1.2a9 9 0 0 1 2.9 1.6 9 9 0 0 1 2.2 2.3l1.2-.5c.6-.2 1.3-.2 1.3-.2l.2-.2c-.3 0-1.5.1-1.5-.4v-.2a.7.7 0 0 1-.2 0c-.2-.2-.2-.4 0-.7l.2-.1v-.3h-.3l-.2.1c-.2.3-.6.3-.8 0a.4.4 0 0 1-.1-.4.6.6 0 0 1-.5 0c-.2-.2-.3-.5 0-.8l.2-.3v-.3z"/>
  <path d="M235.4 224h.2v.3h-.1c-.1 0-.1-.2 0-.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M235.4 224h.2v.3h-.1c-.1 0-.1-.2 0-.2z"/>
  <path d="m236.3 224.8-.3-.2v-.2h.1l.4.3.3.2v.2h-.2l-.3-.3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m236.3 224.8-.3-.2v-.2h.1l.4.3.3.2v.2h-.2l-.3-.3"/>
  <path d="m234.6 223.7-.2-.2s-.1 0 0-.1l.3.1.3.1v.2h-.1l-.3-.1"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m234.6 223.7-.2-.2s-.1 0 0-.1l.3.1.3.1v.2h-.1l-.3-.1"/>
  <path d="M233.7 223h.2v.2h-.2s-.1-.1 0-.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M233.7 223h.2v.2h-.2s-.1-.1 0-.2z"/>
  <path d="M237.3 225.5v-.2h-.3l.1.2h.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M237.3 225.5v-.2h-.3l.1.2h.2z"/>
  <path d="m237.9 226.2.2.2h.1c.1 0 0-.1 0-.2l-.2-.2-.2-.2h-.1v.2l.2.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="m237.9 226.2.2.2h.1c.1 0 0-.1 0-.2l-.2-.2-.2-.2h-.1v.2l.2.2"/>
  <path d="M238.8 227v-.3h-.3v.2h.3"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M238.8 227v-.3h-.3v.2h.3z"/>
  <path fill="#c8b100" d="M236.2 221.1h-.6l-.1.9v.1h.2l.7-.5-.3-.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M236.2 221.1h-.6l-.1.9v.1h.2l.7-.5-.3-.5"/>
  <path fill="#c8b100" d="M234.6 221.6v.5l.9.1h.1v-.2l-.5-.7-.5.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M234.6 221.6v.5l.9.1h.1v-.2l-.5-.7-.5.3"/>
  <path fill="#c8b100" d="m236.4 222.6-.4.3-.6-.7v-.1h1.1v.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m236.4 222.6-.4.3-.6-.7v-.1h1.1v.5"/>
  <path fill="#c8b100" d="M235.3 222a.3.3 0 0 1 .4 0 .3.3 0 0 1 0 .3.3.3 0 0 1-.3 0 .3.3 0 0 1-.1-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M235.3 222a.3.3 0 0 1 .4 0 .3.3 0 0 1 0 .3.3.3 0 0 1-.3 0 .3.3 0 0 1-.1-.3z"/>
  <path fill="#c8b100" d="m233.2 221.1-.2-.7-.4-.4s.4-.2.8.1c.4.3 0 .9 0 .9l-.2.1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m233.2 221.1-.2-.7-.4-.4s.4-.2.8.1c.4.3 0 .9 0 .9l-.2.1z"/>
  <path fill="#c8b100" d="m234.2 221.4-.4.4-.6-.6v-.2h1v.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m234.2 221.4-.4.4-.6-.6v-.2h1v.4"/>
  <path fill="#c8b100" d="m233.1 221 .3-.1v.3c0 .2-.1.2-.2.2l-.1-.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m233.1 221 .3-.1v.3c0 .2-.1.2-.2.2l-.1-.3z"/>
  <path fill="#c8b100" d="M238.3 222.5h-.5l-.3.7v.2h.2l.8-.4-.2-.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M238.3 222.5h-.5l-.3.7v.2h.2l.8-.4-.2-.5"/>
  <path fill="#c8b100" d="M236.7 222.8v.5l.8.2h.1v-.2l-.4-.7-.5.2"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M236.7 222.8v.5l.8.2h.1v-.2l-.4-.7-.5.2"/>
  <path fill="#c8b100" d="m238.4 224-.5.2-.4-.7v-.2h.1l.9.2-.1.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m238.4 224-.5.2-.4-.7v-.2h.1l.9.2-.1.5"/>
  <path fill="#c8b100" d="M237.3 223.2h.4a.3.3 0 0 1 0 .4.3.3 0 0 1-.3 0 .3.3 0 0 1 0-.4"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M237.3 223.2h.4a.3.3 0 0 1 0 .4.3.3 0 0 1-.3 0 .3.3 0 0 1 0-.4z"/>
  <path fill="#c8b100" d="m240.2 224.3.1.5-.8.3h-.2v-.2l.4-.8.5.2"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m240.2 224.3.1.5-.8.3h-.2v-.2l.4-.8.5.2"/>
  <path fill="#c8b100" d="m240 225.8-.5.1-.3-.8v-.1h.2l.8.3-.1.5"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m240 225.8-.5.1-.3-.8v-.1h.2l.8.3-.1.5"/>
  <path fill="#c8b100" d="m238.6 224.3-.2.5.9.3h.1v-.1l-.3-.8-.5.1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m238.6 224.3-.2.5.9.3h.1v-.1l-.3-.8-.5.1"/>
  <path fill="#c8b100" d="M239.5 225.2a.3.3 0 0 0 0-.3.3.3 0 0 0-.4 0 .3.3 0 0 0 0 .3.3.3 0 0 0 .4 0"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M239.5 225.2a.3.3 0 0 0 0-.3.3.3 0 0 0-.4 0 .3.3 0 0 0 0 .3.3.3 0 0 0 .4 0z"/>
  <path fill="#c8b100" d="M240.8 227h.8l.5.3s.1-.4-.3-.7c-.3-.3-.8.2-.8.2l-.2.2"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M240.8 227h.8l.5.3s.1-.4-.3-.7c-.3-.3-.8.2-.8.2l-.2.2z"/>
  <path fill="#c8b100" d="m240.3 226.1-.3.5.8.5v-.1h.2l-.1-1-.6.1"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="m240.3 226.1-.3.5.8.5v-.1h.2l-.1-1-.6.1"/>
  <path fill="#c8b100" d="M241 227s.1-.1 0-.2h-.3c-.2 0-.2.1-.1.2h.3"/>
  <path fill="none" stroke="#000" stroke-width=".3" d="M241 227s.1-.1 0-.2h-.3c-.2 0-.2.1-.1.2h.3zm38-21.9v.6h-2.4v-.6h1v-1.3h-.7v-.5h.6v-.6h.6v.6h.6v.6h-.6v1.2h1"/>
  <path fill="none" stroke="#000" stroke-width="0" d="M134.4 217.1v-1.2m-.4 1.2v-1.2m-.2 1.2v-1.2m-.3 1.2v-1.2"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M133.2 217.1v-1.2m-.5 1.1v-1m.2 1v-1m-.7 1v-1m.2 1v-1m-.9 1v-1m.2 1v-1m.3 1v-1m-.7 1v-1m-.3.9v-.8m-.1.8v-.8m-.5.7v-.6m.2.6v-.6m-.4.5v-.5m-.2.5v-.4m-.3.3v-.3m-.3.3v-.2"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M129.2 216.6v-.2"/>
  <path fill="none" stroke="#000" stroke-width="0" d="M135.7 217v-1m-.5 1v-1m-.4 1.2V216m143 1.1V216m-.4 1.1V216m-.3 1.1V216m-.3 1.2V216"/>
  <path fill="none" stroke="#000" stroke-width=".1" d="M276.6 217.1V216m-.6 1v-1m.3 1v-1m-.8 1v-1m.3 1v-1m-.9 1v-1m.2 1v-1m.2 1v-1m-.6 1v-1m-.3.9v-.8m-.2.8v-.8m-.4.7v-.6m.2.6v-.6m-.5.6v-.6m-.2.5v-.4m-.3.4v-.4m-.2.3v-.2"/>
  <path fill="none" stroke="#000" stroke-width=".2" d="M272.6 216.6v-.2"/>
  <path fill="none" stroke="#000" stroke-width="0" d="M279.1 217v-1m-.6 1v-1m-.4 1.1V216"/>
</svg>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-kr" viewBox="0 0 640 480">
  <defs>
    <clipPath id="kr-a">
      <path fill-opacity=".7" d="M-95.8-.4h682.7v512H-95.8z"/>
    </clipPath>
  </defs>
  <g fill-rule="evenodd" clip-path="url(#kr-a)" transform="translate(89.8 .4) scale(.9375)">
    <path fill="#fff" d="M610.6 511.6h-730.2V-.4h730.2z"/>
    <path fill="#fff" d="M251.9 256a112.5 112.5 0 1 1-225 0 112.5 112.5 0 0 1 225 0z"/>
    <path fill="#c70000" d="M393 262.6c0 81-65 146.8-145.3 146.8s-145.2-65.8-145.2-146.8 65-146.9 145.3-146.9S393 181.6 393 262.6z"/>
    <path d="m-49.4 126.4 83.6-96.7 19.9 17.1-83.7 96.8zm27.4 23.7 83.6-96.7 19.9 17-83.7 96.9z"/>
    <path d="m-49.4 126.4 83.6-96.7 19.9 17.1-83.7 96.8z"/>
    <path d="m-49.4 126.4 83.6-96.7 19.9 17.1-83.7 96.8zm55.4 48 83.6-96.9 19.9 17.2-83.7 96.8z"/>
    <path d="m-49.4 126.4 83.6-96.7 19.9 17.1-83.7 96.8z"/>
    <path d="m-49.4 126.4 83.6-96.7 19.9 17.1-83.7 96.8zm508.8-96.8 83 97.4-20 17-83-97.4zm-55.7 47.5 83 97.4-20 17-83-97.4z"/>
    <path fill="#fff" d="M417.6 133.2 496 65.4l14.7 17-84 75.4-9.3-24.6z"/>
    <path d="m514.2 372-80.4 95.8-19.7-16.4 80.4-95.8zM431.8 53.1l83 97.4-19.9 17L412 70zm109.7 341.6L461 490.5l-19.8-16.4 80.5-95.8zm-55.1-45.8L406 444.7l-19.7-16.4 80.4-95.8z"/>
    <path fill="#3d5897" d="M104.6 236.7c4.6 37 11.3 78.2 68.2 82.4 21.3 1.3 62.8-5 77-63.2 18.8-55.8 75-71.8 113.3-41.6C385 228.5 391 251 392.4 268c-1.7 54-32.9 101-72.8 122-46 27.3-109.6 27.9-165.3-13.5-25.1-23.5-60.2-67-49.7-139.8z"/>
    <path fill="#fff" d="m436 370.6 78.6 67.6-14.6 17-87.1-71.8 23-12.8z"/>
    <path d="m-1.9 357.2 83 97.3-20 17-83-97.3z"/>
    <path fill="#fff" d="m-16.2 437.3 78.6-67.9 14.7 17-84 75.5-9.3-24.7z"/>
    <path d="m25.7 333.7 83 97.3-20 17-83-97.3zM-30 381.2l83 97.3-20 17-83-97.3z"/>
  </g>
</svg>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icons-pt" viewBox="0 0 640 480">
  <path fill="red" d="M256 0h384v480H256z"/>
  <path fill="#060" d="M0 0h256v480H0z"/>
  <g fill="#ff0" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width=".6">
    <path d="M339.5 306.2c-32.3-1-180-93.2-181-108l8.1-13.5c14.7 21.3 165.7 111 180.6 107.8l-7.7 13.7"/>
    <path d="M164.9 182.8c-2.9 7.8 38.6 33.4 88.4 63.8 49.9 30.3 92.9 49 96 46.4l1.5-2.8c-.6 1-2 1.3-4.3.6-13.5-3.9-48.6-20-92.1-46.4-43.6-26.4-81.4-50.7-87.3-61a6.3 6.3 0 0 1-.6-3.1h-.2l-1.2 2.2-.2.3zm175.3 123.8c-.5 1-1.6 1-3.5.8-12-1.3-48.6-19.1-91.9-45-50.4-30.2-92-57.6-87.4-64.8l1.2-2.2.2.1c-4 12.2 82.1 61.4 87.2 64.6 49.8 30.8 91.8 48.9 95.5 44.2l-1.3 2.3z"/>
    <path d="M256.2 207.2c32.2-.3 72-4.4 95-13.6l-5-8c-13.5 7.5-53.5 12.5-90.3 13.2-43.4-.4-74.1-4.5-89.5-14.8l-4.6 8.6c28.2 12 57.2 14.5 94.4 14.6"/>
    <path d="M352.5 193.8c-.8 1.3-15.8 6.4-37.8 10.2a381.2 381.2 0 0 1-58.6 4.3 416.1 416.1 0 0 1-56.2-3.6c-23.1-3.6-35-8.6-39.5-10.4l1.1-2.2c12.7 5 24.7 8 38.7 10.2A411.5 411.5 0 0 0 256 206a391.8 391.8 0 0 0 58.3-4.3c22.5-3.7 34.8-8.4 36.6-10.5l1.6 2.7zm-4.4-8.1c-2.4 2-14.6 6.3-36 9.7a388.2 388.2 0 0 1-55.8 4c-22 0-40.1-1.6-53.8-3.6-21.8-2.8-33.4-8-37.6-9.4l1.3-2.2c3.3 1.7 14.4 6.2 36.5 9.3a385 385 0 0 0 53.6 3.4 384 384 0 0 0 55.4-4c21.5-3 33.1-8.4 34.9-9.8l1.5 2.6zM150.3 246c19.8 10.7 63.9 16 105.6 16.4 38 .1 87.4-5.8 105.9-15.6l-.5-10.7c-5.8 9-58.8 17.7-105.8 17.4-47-.4-90.7-7.6-105.3-17v9.5"/>
    <path d="M362.8 244.5v2.5c-2.8 3.4-20.2 8.4-42 12a434 434 0 0 1-65.4 4.4 400 400 0 0 1-62-4.3 155 155 0 0 1-44.4-12v-2.9c9.7 6.4 35.9 11.2 44.7 12.6 15.8 2.4 36.1 4.2 61.7 4.2 26.9 0 48.4-1.9 65-4.4 15.7-2.3 38-8.2 42.4-12.1zm0-9v2.5c-2.8 3.3-20.2 8.3-42 11.9a434 434 0 0 1-65.4 4.5 414 414 0 0 1-62-4.3 155 155 0 0 1-44.4-12v-3c9.7 6.5 36 11.2 44.7 12.6a408 408 0 0 0 61.7 4.3c26.9 0 48.5-2 65-4.5 15.7-2.2 38-8.1 42.4-12zm-107 68.8c-45.6-.2-84.7-12.4-93-14.4l6 9.4a249.8 249.8 0 0 0 87.4 14.3c34.7-1 65-3.7 86.3-14.1l6.2-9.8c-14.5 6.9-64 14.6-93 14.6"/>
    <path d="M344.9 297.3a143 143 0 0 1-2.8 4c-10 3.6-26 7.4-32.6 8.4a295.5 295.5 0 0 1-53.7 5c-40.4-.6-73.5-8.5-89-15.3l-1.3-2.1.2-.4 2.1.9a286.5 286.5 0 0 0 88.2 14.5c18.8 0 37.5-2.1 52.6-4.8 23.2-4.7 32.6-8.2 35.5-9.8l.7-.4zm5.3-8.8a287.2 287.2 0 0 1-2 3.5c-5.4 2-20 6.2-41.3 9.2-14 1.9-22.7 3.8-50.6 4.3a347.4 347.4 0 0 1-94.2-14L161 289a390 390 0 0 0 95.4 14c25.5-.5 36.4-2.4 50.3-4.3 24.8-3.8 37.3-8 41-9.1a2.9 2.9 0 0 0 0-.2l2.6-1z"/>
    <path d="M350.8 237.6c.1 30-15.3 57-27.6 68.8a99.3 99.3 0 0 1-67.8 28.2c-30.3.5-58.8-19.2-66.5-27.9a101 101 0 0 1-27.5-67.4c1.8-32.8 14.7-55.6 33.3-71.3a99.6 99.6 0 0 1 64.2-22.7 98.2 98.2 0 0 1 71 35.6c12.5 15.2 18 31.7 20.9 56.7zM255.6 135a106 106 0 0 1 106 105.2 105.6 105.6 0 1 1-211.4 0c-.1-58 47.3-105.2 105.4-105.2"/>
    <path d="M255.9 134.5c58.2 0 105.6 47.4 105.6 105.6S314.1 345.7 256 345.7s-105.6-47.4-105.6-105.6c0-58.2 47.4-105.6 105.6-105.6zM152.6 240c0 56.8 46.7 103.3 103.3 103.3 56.6 0 103.3-46.5 103.3-103.3s-46.7-103.3-103.3-103.3S152.6 183.2 152.6 240z"/>
    <path d="M256 143.3a97 97 0 0 1 96.7 96.7 97.1 97.1 0 0 1-96.7 96.8c-53 0-96.7-43.6-96.7-96.8a97.1 97.1 0 0 1 96.7-96.7zM161.6 240c0 52 42.6 94.4 94.4 94.4s94.4-42.5 94.4-94.4c0-52-42.6-94.4-94.4-94.4a94.8 94.8 0 0 0-94.4 94.4z"/>
    <path d="M260.3 134h-9.1v212.3h9z"/>
    <path d="M259.3 132.8h2.3v214.7h-2.2V132.8zm-9 0h2.4v214.7h-2.3V132.8z"/>
    <path d="M361.6 244.2v-7.8l-6.4-6-36.3-9.6-52.2-5.3-63 3.2-44.8 10.6-9 6.7v7.9l22.9-10.3 54.4-8.5h52.3l38.4 4.2 26.6 6.4z"/>
    <path d="M256 223.8c24.9 0 49 2.3 68.3 6 19.8 4 33.7 9 38.5 14.5v2.8c-5.8-7-24.5-12-39-15-19-3.6-43-6-67.9-6-26.1 0-50.5 2.6-69.3 6.2-15 3-35.1 9-37.6 14.8v-2.9c1.3-4 16.3-10 37.3-14.3 18.9-3.7 43.3-6.1 69.6-6.1zm0-9.1a383 383 0 0 1 68.3 6c19.8 4 33.7 9 38.5 14.6v2.7c-5.8-6.9-24.5-12-39-14.9-19-3.7-43-6-67.9-6a376 376 0 0 0-69.2 6.2c-14.5 2.7-35.4 8.9-37.7 14.7v-2.8c1.4-4 16.6-10.3 37.3-14.3 19-3.7 43.3-6.2 69.7-6.2zm-.6-46.2c39.3-.2 73.6 5.5 89.3 13.5l5.7 10c-13.6-7.4-50.6-15-94.9-14-36.1.3-74.7 4-94 14.4l6.8-11.4c15.9-8.3 53.3-12.5 87.1-12.5"/>
    <path d="M256 176.7a354 354 0 0 1 61.3 4.3c16 3 31.3 7.4 33.5 9.8l1.7 3c-5.3-3.4-18.6-7.3-35.6-10.5s-38.7-4.3-61-4.2c-25.3-.1-45 1.2-61.8 4.2a108.9 108.9 0 0 0-33.3 10.3l1.7-3.1c6-3 15.3-6.7 31.1-9.6 17.5-3.2 37.4-4.1 62.4-4.2zm0-9c21.4-.2 42.6 1 59.1 4a96 96 0 0 1 30.6 10l2.5 4c-4.2-4.7-20-9.2-34.1-11.6-16.4-2.9-36.7-4-58.1-4.2a361 361 0 0 0-59.5 4.4 97.3 97.3 0 0 0-29.6 9.1l2.2-3.3c5.8-3 15.2-5.8 27-8.1a357 357 0 0 1 59.9-4.4zM308.4 284a276.4 276.4 0 0 0-52.5-4c-65.5.8-86.6 13.5-89.2 17.3l-5-8c16.8-12 52.4-18.8 94.6-18.2 21.9.4 40.8 1.9 56.6 5l-4.5 8"/>
    <path d="M255.6 278.9c18.2.3 36 1 53.3 4.2l-1.2 2.2c-16-3-33.2-4-52-4-24.3-.2-48.7 2.1-70 8.2-6.7 1.9-17.8 6.2-19 9.8l-1.2-2c.4-2.2 7-6.6 19.6-10 24.4-7 47.2-8.3 70.5-8.4zm.8-9.2a327 327 0 0 1 57.3 5l-1.3 2.3a299 299 0 0 0-56-4.9c-24.2 0-49.9 1.8-73.3 8.6-7.5 2.2-20.6 7-21 10.7l-1.2-2.2c.2-3.4 11.5-7.9 21.7-10.8 23.5-6.9 49.3-8.6 73.8-8.7z"/>
    <path d="m349.4 290.5-7.8 12.3-22.7-20.1-58.6-39.5-66.2-36.3-34.3-11.7 7.3-13.6 2.5-1.3 21.3 5.3 70.4 36.3 40.6 25.6L336 272l13.9 16z"/>
    <path d="M158.6 195.5c6-4 50.2 15.6 96.6 43.6 46.1 28 90.3 59.6 86.3 65.5l-1.3 2.1-.6.5c.1-.1.8-1 0-3.1-2-6.5-33.4-31.5-85.3-62.9-50.7-30.1-92.9-48.3-97-43.1l1.3-2.6zM351 290.4c3.8-7.6-37.2-38.5-88.1-68.6-52-29.5-89.6-46.9-96.5-41.7L165 183c0 .1 0-.2.4-.5 1.2-1 3.3-1 4.2-1 11.8.2 45.5 15.7 92.8 42.8 20.8 12 87.6 55 87.3 67 0 1 .1 1.2-.3 1.8l1.7-2.6z"/>
  </g>
  <g transform="translate(0 26.7) scale(1.06667)">
    <path fill="#fff" stroke="#000" stroke-width=".7" d="M180.6 211a58.7 58.7 0 0 0 17.5 41.7 59 59 0 0 0 41.8 17.6 59.4 59.4 0 0 0 42-17.4 59 59 0 0 0 17.4-41.8v-79.2l-118.7-.2V211z"/>
    <path fill="red" stroke="#000" stroke-width=".5" d="M182.8 211.1a56.4 56.4 0 0 0 16.8 40 57 57 0 0 0 40.2 16.8 56.9 56.9 0 0 0 40.2-16.6 56.4 56.4 0 0 0 16.7-40v-77H183v76.8m91-53.7v48.9l-.1 5.1a33.2 33.2 0 0 1-10 24 34 34 0 0 1-24 10c-9.4 0-17.7-4-23.9-10.2a34 34 0 0 1-10-24v-54l68 .2z"/>
    <g id="e">
      <g id="d" fill="#ff0" stroke="#000" stroke-width=".5">
        <path stroke="none" d="M190.2 154.4c.1-5.5 4-6.8 4-6.8.1 0 4.3 1.4 4.3 6.9h-8.3"/>
        <path d="m186.8 147.7-.7 6.3h4.2c0-5.2 4-6 4-6 .1 0 4 1.1 4.1 6h4.2l-.8-6.4h-15zm-1 6.4h17c.3 0 .6.3.6.7 0 .5-.3.8-.6.8h-17c-.3 0-.6-.3-.6-.8 0-.4.3-.7.7-.7z"/>
        <path d="M192 154c0-3.3 2.3-4.2 2.3-4.2s2.3 1 2.3 4.2H192m-5.8-9h16.3c.3 0 .6.4.6.8 0 .3-.3.6-.6.6h-16.3c-.3 0-.6-.3-.6-.7 0-.3.3-.6.6-.6zm.4 1.5H202c.3 0 .6.3.6.7 0 .4-.3.7-.6.7h-15.5c-.4 0-.6-.3-.6-.7 0-.4.2-.7.6-.7zm5-10.6h1.2v.8h.9v-.8h1.3v.9h.9v-1h1.2v2c0 .4-.2.6-.5.6h-4.4c-.3 0-.6-.2-.6-.5v-2zm4.6 2.7.3 6.4h-4.3l.3-6.5h3.7"/>
        <path id="a" d="M191 141.6v3.4h-4v-3.4h4z"/>
        <use xlink:href="#a" width="100%" height="100%" x="10.6"/>
        <path id="b" d="M186.3 139h1.2v1h.9v-1h1.2v1h.9v-1h1.2v2c0 .4-.2.6-.5.6h-4.3a.6.6 0 0 1-.6-.6v-2z"/>
        <use xlink:href="#b" width="100%" height="100%" x="10.6"/>
        <path fill="#000" stroke="none" d="M193.9 140.6c0-.6.9-.6.9 0v1.6h-.9v-1.6"/>
        <path id="c" fill="#000" stroke="none" d="M188.6 142.8c0-.6.8-.6.8 0v1.2h-.8v-1.2"/>
        <use xlink:href="#c" width="100%" height="100%" x="10.6"/>
      </g>
      <use xlink:href="#d" width="100%" height="100%" y="46.3"/>
      <use xlink:href="#d" width="100%" height="100%" transform="rotate(-45.2 312.8 180)"/>
    </g>
    <use xlink:href="#d" width="100%" height="100%" x="45.7"/>
    <use xlink:href="#e" width="100%" height="100%" transform="matrix(-1 0 0 1 479.8 0)"/>
    <g id="f" fill="#fff">
      <path fill="#039" d="M232.6 202.4a8.3 8.3 0 0 0 2.2 5.7 7.2 7.2 0 0 0 5.3 2.4c2.1 0 4-1 5.3-2.4a8.3 8.3 0 0 0 2.2-5.7v-10.8h-15v10.8"/>
      <circle cx="236.1" cy="195.7" r="1.5"/>
      <circle cx="244.4" cy="195.7" r="1.5"/>
      <circle cx="240.2" cy="199.7" r="1.5"/>
      <circle cx="236.1" cy="203.9" r="1.5"/>
      <circle cx="244.4" cy="203.9" r="1.5"/>
    </g>
    <use xlink:href="#f" width="100%" height="100%" y="-26"/>
    <use xlink:href="#f" width="100%" height="100%" x="-20.8"/>
    <use xlink:href="#f" width="100%" height="100%" x="20.8"/>
    <use xlink:href="#f" width="100%" height="100%" y="25.8"/>
  </g>
</svg>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-vu" viewBox="0 0 640 480">
  <defs>
    <clipPath id="vu-a">
      <path fill-opacity=".7" d="M0 0h682.7v512H0z"/>
    </clipPath>
  </defs>
  <g clip-path="url(#vu-a)" transform="scale(.9375)">
    <g fill-rule="evenodd">
      <path d="m0 0 347.4 219.4H768v73.2H347.4L0 512V0z"/>
      <path fill="#ff0" d="M0 493.7 354.7 267H768v-22H354.7L0 18.3v32.9L332.8 256 0 460.8v32.9z"/>
      <path fill="#40aa40" d="m0 512 354.7-226.7H768V512H0z"/>
      <path fill="#ce0000" d="m0 0 354.7 226.7H768V0H0z"/>
      <path fill="#ff0" d="M95.8 266.6c1.2.3 1.6.6 2.8-1.1.2-1 1-2.2 1.7-3.3.8-1.5 1.2-2 2-1 .6.7 2.8-.5 3.6.1 1.4 1 .6.8 1.7-.2.9-1.8.1-1.6-1-2.4-1-.6-3.1.6-4 0 .3-1.8.9-2 2-2.4.8.5 3.1-.4 3.8-.4 1 .2 2 .3 2.3-1.2.5-1 .3-.3-.2-1-.8-.7-3 .5-3.9 0-1-.9-.9-1.2-.2-2.6.8-.5 1.5-.3 2.6.4 1 .8 2.8-.7 3.8-.8.9-1 1.9-1.3 1.2-2.5-.3-1-.6-1-1.8-1.3-1.2-.8-2.8.7-3.3-.5 1-1.4 1.3-1.1 2.5-.3.8.2 3-1.1 3.8-1.2 1.1-.3.6 1 1.4-1.8-.3-1.2-2.3.7-3.4.4-1 .2-2-.2-2-1.4 0-1.5.8-1.6 1.9-1.4 1 .2 3.1-1 4-1 1 .6 1.5.4 2.4-1 .6-1.7-.1-1-1.3-2-.8-.5-3 .7-3.9.1.2-.6.5-1.4 1-1.7.9.2 1.6.2 2.7.8 1 .5 2.8-1.5 3.7-2.2-.2-1-2 .4-3-.3-.6-.5-1.5-1-1.7-1.5.6-1.7.3-1.6 2-1 .8-.3 2.3-.3 1.3-1.9-.2-.2-1-.2-1.8-.5-.9-.6-1.7-1.3-2.7-1.5-.7-.1-1.7-.4-2.2-.2 0 1 .2 1.6.1 2.8.5.7 1.3.7 1.5 1-.9.8-1.4.4-2.3.4-1.2-.7-.5-3.1-1.9-2.6.3.7.2 3.4.8 4 .6.4 1.4.8 1.5 1.3-1 1.5-1.3 1.4-2.5.7-1-.6-.6-2.8-1.5-2.7-1 .8-1 .7-.8 1.8 0 1.4-.5 3.4.7 4.2 1.3 1 1.5.8.4 2.7-.7.9-1.1.7-2 .3-.9-.6-.7-3-1.4-3.7-1.4-.8-.6-.8-1.7.2-.3 1.3 0 1.6.5 2.7.4.7.4 3 1.2 3.2 1.2.7 1.3.6-.2 2-1 0-1.6.3-2.4-.7-1-.8-.4-3.2-1.7-3.2-1.2.1-1.5.1-1.4 1.8.3 1.5-.3 3.8.9 4.7 1.1.5 1.8.4 2.2 1.1-.4.3-1 1.3-1.4 1.5-.8 0-1.6-.5-2.5-.7-1-.5-.5-1.4-1.4-2-1 .3-1-1-1.5.3.2 1.2-.2 2.6 1 3.4.8.5 1.5 1.7 2.4 2.3 1 1.2.6 1.4 0 3-.9.1-1.8-.5-2.7-1-.9-.7-.7-3-1.6-3.5-.7-.8-.5-1.4-1.7.2 0 1 .1 1.2.4 2 0 1-.2 3.2.8 3.9 1 .2 2.2.7 3 1 .8 1 .1.8-.8 2.2-.5 1.4-.5 1.7-1.4 2.4-.8 1-1 1.5-.4 2.8z"/>
      <path fill="#ff0" d="M121 267.9c.7-1.2 1.1-1.4 0-3.4-.8-.7-1.6-2-2.4-3.1-1-1.6-1.3-2.2 0-2.7.8-.3.6-3 1.5-3.7 1.4-1.1 1-.3.5-1.9-1.4-1.7-1.5-.8-2.7.2-1 .7-.7 3.5-1.5 4.2-1.6-1-1.6-1.8-1.5-3 .9-.7.9-3.6 1.2-4.3.6-1 1-2-.2-2.9-.8-1-.2-.4-1-.3-1 .7-.7 3.5-1.6 4.2-1.2.8-1.4.5-2.4-.8-.1-1 .3-1.7 1.4-2.6 1.1-.8.5-3.3.8-4.3-.6-1.4-.5-2.6-1.8-2.4-1 0-1.2.3-2 1.5-1.2 1-.4 3.2-1.8 3.2-.9-1.6-.4-1.8.8-2.8.5-.7.2-3.7.4-4.5.2-1.2 1-.2-1.1-2-1.2-.3-.2 2.6-1 3.6-.3 1.2-1 2-2 1.6-1.5-.6-1.2-1.5-.6-2.5s.3-3.8.7-4.7c1-1 1-1.4 0-3-1.3-1.4-1-.3-2.2.6-1 .7-.7 3.5-1.6 4.2-.5-.5-1-1-1.1-1.8.5-.8.7-1.6 1.8-2.5.8-.9-.4-3.5-.6-4.8-1-.2-.4 2.2-1.5 3-.7.5-1.4 1.2-2 1.2-1.3-1.3-1.4-1-.2-2.5.1-1 .7-2.5-1.2-2-.3 0-.5 1-1.1 1.6-1 .7-1.9 1.3-2.5 2.2-.4.7-1 1.7-1 2.3.8.5 1.5.5 2.6 1 .8-.2 1.2-1 1.5-1.1.3 1.2-.2 1.6-.5 2.6-1.2 1-3.2-.7-3.2 1 .8-.1 3.2 1 4 .7.6-.5 1.3-1.2 1.8-1 1 1.5.8 1.9-.3 2.8-1 .8-3-.4-3.1.5.3 1.4.2 1.4 1.3 1.6 1.3.5 2.9 1.9 4 1 1.5-1 1.5-1.3 2.7.6.6 1.1.3 1.5-.5 2.2-.9.8-3-.4-4 0-1.2 1.2-.9.4-.4 2 1 .8 1.4.7 2.7.5.8-.2 3 .8 3.4 0 1.1-1 1-1.1 1.7 1-.4 1.2-.3 1.8-1.6 2.3-1.1.8-3-.9-3.6.5-.4 1.4-.5 1.7 1.1 2.2 1.5.3 3.4 1.8 4.7 1 .9-1 1-1.8 1.9-2 .1.6.7 1.6.7 2.1-.2.9-1 1.5-1.6 2.4-.8.9-1.5 0-2.3.7-.1 1.1-1.4.6-.3 1.7 1 .2 2.3 1.2 3.4.4.9-.7 2.3-1 3.1-1.7 1.5-.6 1.5 0 2.8 1.2-.3 1-1.2 1.7-2 2.4-1 .7-3-.4-3.9.3-1 .5-1.4 0-.5 1.9 1 .5 1.2.3 2 .3 1 .5 2.8 1.6 3.9.8.6-1 1.6-2 2.2-2.8 1.1-.4.7.2 1.6 1.7 1.1 1.2 1.4 1.3 1.7 2.5.6 1.2 1 1.7 2.4 1.5z"/>
      <path fill="#ff0" d="M98 314.5c0-5.3-.8-10.6 0-10.6 46.8 0 58.5-32 58.5-53.2S140.3 208 109.7 208c-35 0-46.8 20.8-46.8 42.6A37 37 0 0 0 98 287.9c23.4 0 29.3-5.3 46.8-26.6-5.8 26.6-35 37.2-46.8 37.2-23.4 0-46.8-16-46.8-47.8 0-26.6 17.5-53.2 58.5-53.2 35.1 0 58.5 26.6 58.5 53.2 0 37.2-29.2 63.8-70.2 63.8z"/>
    </g>
  </g>
</svg>
                                                                                                                                                                                                                                                                                                                                     /*!
 * Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
@font-face {
  font-family: 'Font Awesome 5 Free';
  font-style: normal;
  font-weight: 900;
  font-display: block;
  src: url("../webfonts/fa-solid-900.eot");
  src: url("../webfonts/fa-solid-900.eot?#iefix") format("embedded-opentype"), url("../webfonts/fa-solid-900.woff2") format("woff2"), url("../webfonts/fa-solid-900.woff") format("woff"), url("../webfonts/fa-solid-900.ttf") format("truetype"), url("../webfonts/fa-solid-900.svg#fontawesome") format("svg"); }

.fa,
.fas {
  font-family: 'Font Awesome 5 Free';
  font-weight: 900; }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         FullCalendar.globalLocales.push(function () {
  'use strict';

  var srCyrl = {
    code: 'sr-cyrl',
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 7, // The week that contains Jan 1st is the first week of the year.
    },
    buttonText: {
      prev: 'Претходна',
      next: 'следећи',
      today: 'Данас',
      month: 'Месец',
      week: 'Недеља',
      day: 'Дан',
      list: 'Планер',
    },
    weekText: 'Сед',
    allDayText: 'Цео дан',
    moreLinkText: function(n) {
      return '+ још ' + n
    },
    noEventsText: 'Нема догађаја за приказ',
  };

  return srCyrl;

}());
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           �PNG

   
#dW  �IDATx��k�%Gu�m;���!�^����l0�[�HXĹ�H� �:w8;��������g1s�����]�&��<�� ���������Clfq؅!,"�·�Wu׫��{�v�Gwn�>U�UuN=�ΩS����d�5�x^ / 2ڄ���̈́�,ڬ +M�^���O��r�`:�S|{Y �`���`k?��a���6���1��@�5S�#�Gd��)�q�vXu�B@�*�J@`H�N�A�1n:�P��,D:A��q+�=���f�]S��q!���+Lm�>|���XhN�^�4
�|W�C���/��#�ڃ���qL���r����9�˒� �
�'0��3g*�)�l��f_*��T�՜���)��������\Rvp3�
�."̣`��nի.��\ߤ͔N�Cm�s %��,���F^ ��pxh8� 4^ / 
���`�W��]S��o��]`Y����L0i�]V	c��>�
� �t�@d�'��Gx$���Y���.�d�����8ދ����+1l!��£/��C}���>]�Ǧ�@������p�� �&+
�Ivi��((E d<�^W�\��-��L&����9I�����)�ƥ�����8;���!�5p
�U�a/iΔl� �E<�t!(f}7 �	~̧����jCl3�^�II �8,m�>,�U !�9�z�����ǒ�k�y��E<ߐ˿4��=�Y(R)'b1���do�+�]K'�q!���F��Pa�#��'���������xA R(v���w1w�s:�?q'�nf��OOg���c>�l.b����dp]
V�?� p�iC\ ����z�X�0�k����]���c��ަ�^BX f谧0�5�U��ڽ$�B|���	��y�;�A��.���|/���K��x�f�ಈ�sO)�<�!�qf5}��̻��<���A�3�M��7��qPɤ]��c�`�� Lq���h�ȴ TW����8wF��
��L"�z
�B_�q� X��� 0A���_�E8��a/(�O|��3\j�ݥh1i��q_V ��6�(!�,��mk�b?�'y#��<�M�r�CLtz鑫��W]�o�/.�\�3��l>��CH�4Z:`��3l�w������ɒ5S�&��,�HA	���?���O7��Ȫ����y�*9j�n�Rko�{lp�S��e�Y����<Ӈu�����r!����
��j�<s<�U�갆͙��<�>���y^�0.�e��L����b����?�
���+��y{�"����A�GH_�Y�$o��D�YL�v�6���}�If�0͂bQE<�cg�&��
72��~�~��h�2D��9�|��PՄ�x0cEQ��^��.�O�9 ߏod��������(]4�#eL���T�g��\g1�<fQ'��u�<�/?�'�^A=�!Ў�_\����1�����c�q�EA�=�!�b����.3�`�rij3$�

sWՔ=�,�ЉZ?,+���L�W��+�<��ڿ͙�#�c����`':��6Δ.S�K���?R��+@�0�z?!�X��,����n�Qq;{^���U�;+�|a�f�dzBVK���|=���h'�_��i�$��n�3<]%`�5�<�(]�LH�v~��A�r_a�U����� 7Ad����n:�p.����NE�:ZW�\��U�rf��	���,b���`G:����"����vGE��'xx1�(b���y��\�9֜���\��\��D��ح���Dݠvq6���.�8D:����)��=C�o���-��c�ml��`�i�v+����
�<�4!�|�.���iR?�q�����p��>�8bGnSy��A�RJm5���PV8��@3Zt������i���nu����g�c�"Ìm�4w��IV��$����!�I����c)�d�}�E�~J�^������/qwGb���*�X*Ț���qS���h�.�C����@Ñ�CZ�w�d��k�5�{��R�q9�Z�(����>�
^��0��{�G������;r��J؟�н^��"�<f��?Qb_fƅ�SEթ��
�
���HH�b<RH���?��`�i {�4��<�^�k��zR�.����ۤ���vG�!�����Ie��;"S��y�6��	�˜�e� �h��F:��+��O���W��H�?'��u�w���q��*�p1a�Ns��Чc���ȪA�*����7��1e�����Ne��ӣ2=@��[�	`z��ʸ���?Pӑ}���/k�廓t/<E�{��1n�=_�۝(#3C���P���x������4%}ϠW'�;��[=�4wGZ�S�6^�$�!��SJ��vs+�s�U�)�t8`�M���Á� ,�ɛ�1�`<1c��X�Ixm`������pxh8� 4^ ��u��`�!+ !P��	#�c�U�X-��`'�B�F*<-m
6"MC�����wDA?"��A���8�U\e(�;�]����N��\��{�x!�5}QyС�N�lC
G�[�;]|���:tT���:"+�j ��6���CV
��6"�aIA' ��r�`��*�_oQ�'�'Y4X��q�ń���

X���b��)�`��9	�@���N.��b���,�A�i-ݞ<]YL�u�7K
?̝�@:W)Oݒ�n�,p9�p��4&�u3uK«���pxh8� 4^ / 
�W ���{�s��<�x;�8�\<�H;���v�
! O /��}ytOF��.7���Q��7��P���ȳ}���/#E���/���0�t%�9�;�M�KL*��%�!��������V
�A�ֺ=�{� �]��CX�SC�W/�1���'�-�VXeEٶ`5�)7��1���~�+�`��%��?�`�p�x�K;��*u��~�佁����1�<���f��e�*��}�kP�#�ʱ��	�Q
���}�P���z yh�J{(;�0����5��4[W���?k���*�   %tEXtdate:create 2021-10-07T14:34:24+00:00����   %tEXtdate:modify 1985-10-26T08:15:00+00:00"�S   tEXtSoftware Adobe ImageReadyq�e<    IEND�B`�                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              /*! jQuery Validation Plugin - v1.19.3 - 1/9/2021
 * https://jqueryvalidation.org/
 * Copyright (c) 2021 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate.min"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){return a.extend(a.validator.messages,{required:"تکمیل این فیلد اجباری است.",remote:"لطفا این فیلد را تصحیح کنید.",email:"لطفا یک ایمیل صحیح وارد کنید.",url:"لطفا آدرس صحیح وارد کنید.",date:"لطفا تاریخ صحیح وارد کنید.",dateFA:"لطفا یک تاریخ صحیح وارد کنید.",dateISO:"لطفا تاریخ صحیح وارد کنید (ISO).",number:"لطفا عدد صحیح وارد کنید.",digits:"لطفا تنها رقم وارد کنید.",creditcard:"لطفا کریدیت کارت صحیح وارد کنید.",equalTo:"لطفا مقدار برابری وارد کنید.",extension:"لطفا مقداری وارد کنید که",alphanumeric:"لطفا مقدار را عدد (انگلیسی) وارد کنید.",maxlength:a.validator.format("لطفا بیشتر از {0} حرف وارد نکنید."),minlength:a.validator.format("لطفا کمتر از {0} حرف وارد نکنید."),rangelength:a.validator.format("لطفا مقداری بین {0} تا {1} حرف وارد کنید."),range:a.validator.format("لطفا مقداری بین {0} تا {1} حرف وارد کنید."),max:a.validator.format("لطفا مقداری کمتر از {0} وارد کنید."),min:a.validator.format("لطفا مقداری بیشتر از {0} وارد کنید."),minWords:a.validator.format("لطفا حداقل {0} کلمه وارد کنید."),maxWords:a.validator.format("لطفا حداکثر {0} کلمه وارد کنید.")}),a});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   /*! jQuery Validation Plugin - v1.19.3 - 1/9/2021
 * https://jqueryvalidation.org/
 * Copyright (c) 2021 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate.min"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){return a.extend(a.validator.messages,{required:"Dit is een verplicht veld.",remote:"Controleer dit veld.",email:"Vul hier een geldig e-mailadres in.",url:"Vul hier een geldige URL in.",date:"Vul hier een geldige datum in.",dateISO:"Vul hier een geldige datum in (ISO-formaat).",number:"Vul hier een geldig getal in.",digits:"Vul hier alleen getallen in.",creditcard:"Vul hier een geldig creditcardnummer in.",equalTo:"Vul hier dezelfde waarde in.",extension:"Vul hier een waarde in met een geldige extensie.",maxlength:a.validator.format("Vul hier maximaal {0} tekens in."),minlength:a.validator.format("Vul hier minimaal {0} tekens in."),rangelength:a.validator.format("Vul hier een waarde in van minimaal {0} en maximaal {1} tekens."),range:a.validator.format("Vul hier een waarde in van minimaal {0} en maximaal {1}."),max:a.validator.format("Vul hier een waarde in kleiner dan of gelijk aan {0}."),min:a.validator.format("Vul hier een waarde in groter dan of gelijk aan {0}."),step:a.validator.format("Vul hier een veelvoud van {0} in."),iban:"Vul hier een geldig IBAN in.",dateNL:"Vul hier een geldige datum in.",phoneNL:"Vul hier een geldig Nederlands telefoonnummer in.",mobileNL:"Vul hier een geldig Nederlands mobiel telefoonnummer in.",postalcodeNL:"Vul hier een geldige postcode in.",bankaccountNL:"Vul hier een geldig bankrekeningnummer in.",giroaccountNL:"Vul hier een geldig gironummer in.",bankorgiroaccountNL:"Vul hier een geldig bank- of gironummer in."}),a});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             /*! jQuery Validation Plugin - v1.19.3 - 1/9/2021
 * https://jqueryvalidation.org/
 * Copyright (c) 2021 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate.min"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){return a.extend(a.validator.messages,{required:"这是必填字段",remote:"请修正此字段",email:"请输入有效的电子邮件地址",url:"请输入有效的网址",date:"请输入有效的日期",dateISO:"请输入有效的日期 (YYYY-MM-DD)",number:"请输入有效的数字",digits:"只能输入数字",creditcard:"请输入有效的信用卡号码",equalTo:"你的输入不相同",extension:"请输入有效的后缀",maxlength:a.validator.format("最多可以输入 {0} 个字符"),minlength:a.validator.format("最少要输入 {0} 个字符"),rangelength:a.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),range:a.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),step:a.validator.format("请输入 {0} 的整数倍值"),max:a.validator.format("请输入不大于 {0} 的数值"),min:a.validator.format("请输入不小于 {0} 的数值")}),a});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 /** Add World Map Data Points */
jQuery.fn.vectorMap('addMap', 'asia_en', {"width":950,"height":550,"paths":{"id":{"path":"m 615.27242,460.80117 -3.29462,12.37981 -17.87084,6.03301 -5.34842,-6.27548 -2.59577,0.71313 4.84924,18.71232 7.25958,0.81296 9.6842,3.66545 v 3.66545 l 4.43562,-0.81296 6.46089,-8.94255 v -7.31664 l 3.63692,-7.31663 4.03627,0.81296 -4.84923,-10.16912 -0.74165,-6.54647 -5.66219,0.58476 0,0 m -84.43367,-9.74124 -0.39934,3.25183 9.6842,16.27345 h 2.82396 l 20.18136,33.75921 8.07254,0.81296 4.03627,-11.79505 -6.46088,-4.06479 -1.21231,-6.50368 -36.7258,-31.73393 0,0 m 95.62969,44.98374 3.22331,3.9507 -2.09658,5.93318 v 1.12673 h 4.76366 l 1.68297,-14.83294 1.54034,0.42787 2.79544,13.54932 2.66708,0.71313 2.52445,-5.79056 -2.52445,-8.75714 -2.09658,-3.80807 6.58925,-4.80644 -1.54035,-2.12511 -6.304,4.09332 h -1.68296 l -3.08069,-4.52119 0.98411,-1.98248 5.19153,-2.53872 7.84434,2.3961 2.38183,-0.14263 5.89039,-5.5053 -2.38183,-2.39609 -5.46252,4.23594 h -3.50856 l -5.31989,-2.53871 -3.77955,0.14262 -4.20742,6.77466 -2.66707,11.72373 -1.42625,4.67808 0,0 m 35.17119,-26.5424 -2.66708,6.48941 4.20742,5.5053 h 1.39772 l 1.82559,-3.66545 0.98411,-1.26935 -1.82559,-1.98248 -2.66708,-0.98411 -1.25509,-4.09332 0,0 m 8.27222,21.32235 -5.74777,1.26936 -1.68297,1.83985 1.39772,2.39609 3.77955,-1.41198 2.38183,-1.41198 3.50856,2.82396 1.54034,-1.26935 -2.79544,-3.39447 -2.38182,-0.84148 0,0 m -95.30166,18.35576 -3.92217,2.68134 0.84149,2.25347 12.47964,2.82396 6.304,1.12674 2.66707,2.82396 7.14549,0.5705 3.36593,2.82396 3.08069,-0.71312 2.8097,-2.53871 -5.19153,-2.39609 -4.4784,-3.80808 -11.63816,-2.82396 -13.46375,-2.82397 0,0 m 40.79059,12.27997 -3.08068,1.69723 1.82559,1.98248 4.47841,-1.69723 -3.22332,-1.98248 0,0 m 5.3199,-1.26936 0.55623,2.68134 3.22331,0.84149 1.2551,-1.55461 -1.39772,-2.12511 -3.63692,0.15689 0,0 m 7.71598,7.05991 -3.92217,0.5705 3.50856,2.96659 h 2.79544 l -2.38183,-3.53709 0,0 m 1.11247,-4.66382 -0.84149,1.69723 6.30401,0.98411 4.90628,-2.82396 -2.79544,-0.84149 -4.47841,1.26936 -1.68297,-1.41198 -1.41198,1.12673 0,0 m 57.39207,-40.47681 -5.94744,0.67033 -3.82233,2.79544 1.58313,3.19479 6.47515,1.19804 v 1.19805 l -4.09332,3.32315 1.98248,6.91728 1.98248,0.12836 1.71149,-6.78892 h 3.16626 l 1.32641,6.6463 15.44623,12.77915 0.39935,9.98371 5.2771,5.71924 2.38183,-0.12836 0.52771,-35.25676 -8.97108,-6.24695 -8.45763,5.71924 -3.0379,1.86838 -5.02038,-3.19479 -0.12836,-10.11207 -2.78118,-0.41361 0,0 z","name":"Indonesia"},"ye":{"path":"m 355.61037,425.50163 3.0379,3.39446 4.10758,-2.48167 1.4833,-0.49918 -1.88265,-1.8256 -3.6084,1.06969 -3.13773,0.3423 0,0 m -39.40714,-14.86147 2.0538,6.10433 v 5.9617 l 4.9348,4.4784 34.77184,-14.1626 0.32804,-3.89365 -5.57662,-10.01224 -13.99146,4.46415 -8.02975,7.90139 -9.31338,-5.5053 -5.17727,4.66382 0,0 z","name":"Yemen"},"my":{"path":"m 590.2561,472.95278 4.30725,4.97759 16.51591,-5.71924 3.2661,-12.608 7.35942,-0.52771 6.73188,-4.87776 -8.72862,-6.36105 -1.99674,-3.4943 -4.30726,7.94419 1.58313,4.56398 -2.62429,3.80807 -4.94906,-1.26936 -11.99472,8.79993 0.31377,5.09169 -5.47677,-0.32803 0,0 m -44.82687,-24.91649 2.86676,6.43236 0.64181,8.35779 3.83659,5.94744 9.25633,5.6194 3.50856,0.32804 -0.64181,-5.79055 -3.0379,-7.38795 -4.44988,-9.456 -0.37083,1.65444 -5.36268,-0.24246 -3.85086,-5.53382 -2.39609,0.0713 0,0 z","name":"Malaysia"},"bn":{"path":"m 612.5483,453.45602 -4.10759,4.97759 3.36594,1.05542 1.8969,-2.65281 -1.15525,-3.3802 0,0 z","name":"Brunei Darussalam"},"tl":{"path":"m 650.15836,523.58445 -7.28811,6.0758 0.69886,1.55461 3.08069,-0.5705 3.63692,-3.39446 7.14549,-0.98411 -1.39772,-2.39609 -5.87613,-0.28525 0,0 z","name":"Timor-Leste"},"ph":{"path":"m 626.24024,422.47799 -1.22657,2.33904 -0.6846,2.88101 -6.81744,8.65731 0.41361,1.7828 2.86675,-0.41361 8.85698,-9.89814 -3.40873,-5.34841 0,0 m 11.03913,-3.29463 -0.14262,7.14549 2.59576,2.61002 0.95559,5.07743 2.59576,0.55624 1.22657,-3.16626 -2.03953,-1.51182 -0.54197,-8.92829 -4.64956,-1.78281 0,0 m 7.37369,2.75265 -0.14263,6.31827 1.49756,2.4674 2.59576,-3.02364 -0.68459,-5.49104 -3.2661,-0.27099 0,0 m 1.62592,-5.5053 2.59576,3.43725 1.22657,3.29463 h 2.32478 l -0.41361,-5.63367 -2.59577,-1.78281 -3.13773,0.6846 0,0 m 5.0489,12.92178 0.54197,4.12184 -4.77791,3.85086 -3.9507,0.41361 -4.22169,4.53546 0.14263,2.06805 3.9507,-1.24083 2.72412,-1.7828 2.32478,5.90465 4.09332,2.88101 1.64018,-0.55623 1.49756,-1.78281 -3.2661,-3.29462 1.91117,-1.51182 2.18215,1.7828 1.49756,-2.4674 -1.49756,-3.02364 -0.27098,-6.73187 -4.5212,-3.16626 0,0 m -22.22089,-41.90306 -3.67971,2.61002 -0.41361,8.2437 5.7335,11.1247 1.91117,1.51182 2.45314,-1.65444 4.22169,0.68459 0.81295,3.70824 3.13774,0.27099 1.49756,-2.0538 -1.91117,-2.61002 -2.32478,-2.19642 -4.90628,-0.54197 -2.59576,-4.26447 2.99511,-4.53546 0.27099,-3.97922 -2.03953,-5.07743 -5.16301,-1.24083 0,0 m 1.91117,24.58845 1.08395,3.85086 1.91116,1.24083 1.3692,-1.7828 -2.18216,-3.02364 -2.18215,-0.28525 0,0 z","name":"Philippines"},"cn":{"path":"m 584.10898,383.45594 -3.40872,0.95558 -2.45314,3.02364 2.03953,3.97922 2.99511,0.27099 3.40872,-3.02364 0.81296,-3.97922 -3.39446,-1.22657 0,0 m -127.54903,-142.76706 -4.93481,12.40832 -6.80319,-0.35656 -7.174,15.70295 6.09006,7.75877 -12.55095,17.32887 -6.44663,-1.08394 -4.30725,5.41972 1.06968,3.25184 5.02038,0.35656 2.51019,5.77629 5.02038,1.08395 15.4177,19.86758 v 10.11208 l 7.53057,4.69234 8.24369,-1.44051 10.39733,6.13285 12.55095,3.6084 6.09006,-0.72738 6.81745,-0.72739 14.33375,-9.38469 4.66382,0.72739 1.78281,4.23595 3.9507,1.18378 5.37694,7.94418 -3.57988,7.94418 2.15363,5.41973 6.09007,2.16789 1.06968,6.50368 7.17401,0.72738 1.06968,-3.25184 10.39732,-5.41973 6.44663,0.35657 7.53057,8.30074 5.02038,-2.16789 3.22331,0.35656 1.44051,3.97922 2.51019,0.35656 3.57987,-5.04891 14.33376,-5.41972 12.90751,-15.53181 4.30726,-14.80441 -0.35656,-9.75551 -5.37694,-1.08395 3.22331,-3.6084 -0.71312,-5.77629 -13.62064,-13.72047 v -6.86023 l 3.93644,-5.04891 3.93643,-1.81133 0.35656,-3.97922 H 598.2288 l -1.79707,5.41973 -4.66382,-1.08395 -5.7335,-6.13285 3.57988,-9.38469 5.02038,-5.41973 4.66382,0.35656 -0.71313,8.30075 2.51019,2.16789 6.09007,-6.13285 2.15363,-0.35656 -0.71313,-4.69235 5.73351,-6.86023 4.30725,0.35656 2.51019,-7.94418 2.93807,-1.55461 0.29951,-4.94907 -2.85249,-2.99511 -0.24246,-7.81582 5.49104,-0.35656 -0.35656,-20.15284 -3.85086,2.31052 -1.44051,5.16301 -6.43236,-0.0143 -18.64101,-10.48289 -13.46375,-16.23066 -13.66342,-0.14263 -3.48004,3.02364 4.42136,10.12633 -1.54035,9.49879 -5.5053,2.28199 -3.09495,-0.24246 -0.2282,9.39895 3.22331,0.72739 5.73351,-2.52446 7.53057,3.6084 v 3.6084 l -5.37694,0.35656 -4.30726,9.38469 -3.93644,0.35656 -13.97719,18.41282 -14.69032,6.50367 -10.04076,0.72739 -6.80319,-4.69235 -9.6842,5.06317 -10.39732,-3.25184 -2.51019,-6.86023 -17.55707,-1.08395 -9.31337,-15.16098 h -3.93644 l -3.16626,-7.03138 -3.76528,-0.29951 z","name":"China"},"tw":{"path":"m 623.51612,352.27824 -5.04891,3.85086 -0.27099,7.41647 4.36431,5.07743 1.08395,-0.95558 -0.12836,-15.38918 0,0 z","name":"Taiwan"},"jp":{"path":"m 646.00799,306.7953 -2.32478,2.33905 0.95558,3.29462 2.03953,0.14262 1.3692,7.14549 1.64018,1.7828 2.86675,-2.61002 1.22657,-4.67808 -3.55135,-5.07743 -4.22168,-2.33905 0,0 m 12.55095,-4.66381 -3.9507,3.70823 -0.14262,4.26447 0.95558,1.24083 5.31989,-4.53545 -0.41361,-4.53546 -1.76854,-0.14262 0,0 m -5.46252,-8.79993 -6.96007,7.9727 1.22657,1.92543 3.40873,0.41361 6.40383,-4.94906 4.50694,-0.82723 4.09332,4.80645 3.13773,-1.09821 1.22657,-4.67808 5.86187,-0.14263 5.7335,-6.87449 -2.99511,-11.40996 -1.3692,-6.04728 2.99512,-2.4674 -6.81745,-10.29748 -1.76854,0.14262 -3.67971,4.12185 v 3.43725 l 1.64018,1.92543 0.54197,9.07091 -4.22168,5.22006 -2.45314,-1.51182 -1.91117,4.26447 -0.41361,3.97922 1.49755,2.33904 -0.95558,1.78281 -3.13774,-2.61003 h -2.18215 l -1.91117,1.09821 -1.49756,0.41361 0,0 m 11.738,-62.09868 -2.18216,1.92543 1.09821,4.12184 1.91117,1.92543 -0.14263,6.31827 -2.45314,0.95558 -1.91117,4.26447 5.59088,7.68746 3.67971,-1.24084 0.6846,-1.92543 -3.9507,-3.56561 2.45314,-3.16626 2.59577,0.41361 2.03953,2.19642 0.14262,-4.53546 5.59088,-4.53546 3.13774,-0.82722 -2.59577,-4.39283 -1.22657,-1.92543 -2.03953,1.36919 -1.76854,2.19642 -3.82233,-0.82722 -3.9507,-2.61003 -2.88101,-3.82233 0,0 z","name":"Japan"},"ru":{"path":"m 222.95538,214.51729 -2.13937,-0.21393 -3.85086,4.60676 v 2.15363 l 1.28362,0.49919 2.49593,0.0713 4.13611,-3.3802 0.57049,-1.15526 -2.49592,-2.5815 0,0 m 462.45974,12.45112 -3.82233,5.36267 0.27098,2.61003 1.91117,-0.82722 4.49267,-5.63367 -2.85249,-1.51181 0,0 m 5.04891,-7.83009 -1.3692,3.70824 0.14263,2.4674 2.32478,-1.51182 2.18215,-4.39283 v -1.64018 l -3.28036,1.36919 0,0 m 8.04402,-32.70378 -1.76855,2.19642 0.14263,3.43724 1.64018,-0.14262 2.72413,-4.80644 -2.73839,-0.6846 0,0 m -3.2661,8.38632 v 6.04727 l 1.91116,0.6846 1.3692,-2.19642 v -4.66382 l -3.28036,0.12837 0,0 m -55.78042,-21.85007 -0.12836,8.79993 11.03913,17.04362 3.95069,14.83294 6.96008,13.19276 2.72412,0.95559 2.32478,-1.92543 1.08395,-3.16627 -9.95519,-10.85372 0.27099,-5.63366 2.18215,-0.95558 0.54198,-3.29463 -19.49677,-27.61209 -1.49755,-1.38346 0,0 m 76.91736,-27.3411 -2.72413,0.27098 1.64018,2.33904 3.40873,2.33905 0.95558,-1.09821 -3.28036,-3.85086 0,0 m 5.30563,1.65444 0.41361,2.33904 4.22168,1.24083 0.41361,-1.65444 -5.0489,-1.92543 0,0 m -439.95361,-93.832618 2.45314,0.984108 -1.72576,2.966589 v 4.207421 l -3.67971,2.224941 h -3.92217 l -2.21068,-2.724127 0.24246,-2.966588 1.72576,-2.224942 h 3.43725 l 3.67971,-2.467402 0,0 m 9.32764,-2.724127 v 2.966588 l 2.45314,1.98248 3.43724,-0.242462 2.95233,-2.724126 v -1.98248 h -2.6956 l -2.21068,0.741647 -1.72576,-1.98248 -2.21067,1.240833 0,0 m 14.00572,0.256724 1.72575,3.708235 3.43725,0.242462 2.45314,-0.984109 -1.22657,-3.465774 -3.19479,-0.741647 -3.19478,1.240833 0,0 m 13.99145,-4.949068 -2.6956,-0.499186 -2.45314,2.481666 1.22657,2.224941 0.74165,3.465774 3.19479,-2.467403 0.74164,-2.724127 -0.75591,-2.481665 0,0 m 14.97557,26.228634 -0.74165,3.465774 -5.64793,4.949068 -12.0375,2.724127 -9.82682,16.330498 -1.72576,4.706608 9.82683,2.48166 1.46903,-5.93317 2.95232,-9.156492 7.61615,-3.964959 6.38957,-4.949068 4.66382,-1.98248 h 2.45314 v -6.674824 l -5.3912,-1.996742 0,0 m -31.67689,36.126775 6.63204,0.74164 2.21068,7.6732 5.64792,5.93317 -1.96821,3.96496 h -3.43725 l -3.19479,-3.70823 -7.11696,-0.24246 -2.95232,-3.96496 v -2.72413 l 4.42135,-1.24083 -0.24246,-6.43236 0,0 m 103.64518,-84.376623 -3.19479,-1.982479 h -3.67971 l -0.74164,2.224941 -3.92218,2.224941 -2.95232,0.984109 -0.48492,2.966588 6.87449,0.499186 8.10107,-6.917286 0,0 m 7.60188,0.741647 -1.72575,3.708236 -3.43725,-0.242462 -5.40547,3.96496 -1.46903,4.949068 h 3.43725 l 1.96822,-3.223313 4.66382,3.465774 4.42135,-1.982479 3.19479,-2.724127 -1.22657,-4.207421 -1.72575,-2.966589 -2.69561,-0.741647 0,0 m 7.13123,2.724127 1.72575,6.931548 2.6956,6.432362 2.95233,-5.191529 5.64793,-1.240833 v -3.708236 l -3.67971,-2.724126 -9.3419,-0.499186 0,0 m 134.75157,-11.096181 3.83659,3.223312 2.72413,-1.126733 0.7987,-4.521195 -5.59088,-3.865122 -3.67971,2.424615 -8.95681,0.81296 v 4.036271 l -9.44174,0.156887 v 6.603512 l 11.03913,8.215168 2.88101,-2.09658 -0.64181,-5.804814 7.04565,-1.768543 -1.44051,-2.73839 -2.55297,-2.581502 3.97922,-0.969846 0,0 m 10.24043,-3.865123 2.55298,4.834969 9.92666,-1.126733 2.72413,-3.551349 -0.64181,-3.0664252 -2.72413,-1.1267331 -2.55298,1.9396923 -7.35942,1.611656 -1.92543,0.484923 0,0 m -0.64181,18.854951 -4.96333,-1.28362 -2.86675,3.066426 -1.28362,4.193158 6.71761,-0.64181 5.12022,-2.581502 -2.72413,-2.752652 0,0 m 128.63298,-27.8830777 -4.16463,-1.2836199 -4.79218,1.768543 -2.39609,3.5513486 3.0379,4.036272 8.00123,-3.5513489 1.59739,-1.7685431 -1.28362,-2.7526517 0,0 m -26.68503,98.6533297 2.51019,8.67156 5.02038,1.44051 5.02038,-7.94418 -2.86675,-5.419732 1.06968,-4.692344 h 7.53058 l -1.79707,3.608399 0.71312,13.007347 -10.75388,26.72782 1.06968,5.77629 -0.35656,9.75551 20.06726,29.25228 3.93643,1.08394 0.35656,-23.83254 3.93644,-3.6084 -4.30726,-9.38469 3.57987,-3.97922 -7.88713,-10.46863 -4.30726,0.35656 -1.42624,-17.32887 11.11044,-2.89528 0.71313,-5.06317 5.7335,-1.4405 3.22331,2.89527 3.93643,-15.88836 6.80319,-11.55258 5.37694,-2.895276 4.66382,0.356561 v -5.419729 l -7.53057,-1.440506 -10.39732,-8.671566 5.02038,-5.77629 -4.30726,-9.755512 3.57987,-3.608398 4.30726,5.77629 10.75389,3.979221 11.82356,1.083946 1.44051,-5.048905 -6.09007,-6.132851 6.80319,-9.384688 -15.4177,-5.419729 -3.93644,7.944182 -5.02038,-6.503675 -28.31095,-9.755512 -26.8847,4.692344 -3.93644,2.167892 v 2.167891 l 5.7335,2.895277 -0.71312,6.860235 -10.39732,-4.335783 -22.93401,9.028127 -3.93644,-8.300742 h -15.77426 l -7.17401,7.58762 -25.4442,-5.77629 -23.29057,4.692344 -2.86675,7.216797 3.57987,1.083946 -0.35656,5.419728 -22.57745,2.524453 1.44051,7.216797 -20.79464,-3.608399 5.02038,-9.384688 -21.15121,-1.083946 1.79707,9.755512 -6.80318,3.251837 -5.73351,-5.419728 -23.29057,3.979221 -8.95681,8.300743 -0.35656,5.048905 -5.73351,0.356561 -0.71312,-5.77629 18.28445,-15.888362 V 44.380597 l -11.82356,-3.251837 -15.4177,5.048905 -6.44663,-6.503674 h -2.86675 l -3.57987,7.216796 2.86675,3.251838 -20.43808,11.196018 -17.55707,13.36391 -10.75389,14.804417 v 6.132851 l 11.46701,4.692349 -5.7335,4.33578 -12.18013,-4.33578 -5.02038,4.33578 -7.53057,-8.671568 -1.44051,3.251837 8.24369,26.000431 2.15363,0.72739 5.73351,-2.89528 2.86675,2.16789 v 4.69235 l -5.37694,-2.16789 -3.22332,2.52445 2.15363,4.69234 -1.79707,12.27997 -11.11044,1.08394 -0.71312,-3.97922 6.44662,-3.97922 1.44051,-10.83946 -7.17401,-9.38469 -2.51019,-16.24492 -11.467,-1.81133 -1.06969,5.77629 2.15363,2.89528 -4.66382,3.97922 1.79707,10.83946 6.80319,2.89527 1.4405,7.94418 -6.81745,-4.33578 -17.55706,-3.25184 -2.15363,5.77629 -13.9772,5.04891 -2.15363,-3.6084 -18.28445,10.11207 -0.35656,6.86024 -7.17401,1.08394 2.15363,-5.0489 v -5.04891 l -7.17401,-2.52445 -4.66382,1.81133 3.93643,7.58762 2.86676,5.04891 v 3.97922 l -5.37695,-1.08395 -1.06968,-1.08394 -5.37694,5.77629 2.86675,5.0489 -12.18013,-0.35656 3.93644,5.06317 -1.06969,2.16789 h -6.44662 l -4.66382,-3.25184 -1.06968,-9.02812 -7.53057,-2.89528 v -3.6084 l 15.77426,3.25184 8.60025,0.72738 3.57988,-5.41973 -3.22331,-5.77629 -22.93401,-9.02812 -7.91566,1.96821 -2.70987,2.32478 0.84149,5.34842 3.36594,0.58476 -0.78444,8.41484 10.38306,24.38878 -7.50205,11.89488 -0.51344,2.68134 3.80807,2.68134 -3.43725,2.26773 -2.28199,0.0428 0.42787,10.4829 3.152,4.46415 0.0428,4.33578 4.03627,0.37082 6.17564,2.35331 6.5322,8.98534 0.0713,2.36756 -2.1251,3.63692 4.87775,-0.27098 4.7494,1.36919 6.4181,9.08518 15.80278,1.44051 -0.68459,10.81093 -5.44826,4.66382 1.12674,1.82559 -5.37694,5.77629 -1.42625,5.41973 3.22331,4.69234 10.39733,3.6084 4.30725,-2.52445 27.59783,10.46863 1.06969,-2.89527 -5.73351,-5.41973 v -6.86024 l -3.57987,-1.08394 0.71312,-5.77629 5.7335,-6.86024 -10.28322,-7.70172 0.71312,-10.71109 10.99635,-7.23106 12.90751,0.72738 2.15363,3.97922 13.26407,0.72739 9.6842,-5.41973 -5.02038,-5.41973 1.06969,-10.11207 25.08763,-12.27997 19.29709,8.70009 6.44663,-5.77629 18.99757,18.05626 14.33376,-1.44051 5.02038,5.04891 13.62063,1.4405 8.95682,-12.27996 11.467,5.06317 6.09006,1.08394 6.09007,-5.41973 -5.37694,-3.60839 4.66382,-7.2168 13.26407,4.33578 2.86675,5.77629 5.7335,0.35656 3.57988,-2.52445 9.6842,-0.35656 1.06968,2.52445 11.11044,0.72739 7.53057,-7.94418 15.41771,1.81133 4.66381,-1.81133 1.42625,-8.67157 -4.66382,-10.46863 4.66382,-3.97923 h 14.69032 l 13.97719,16.61575 17.91363,10.11207 h 5.37694 l 0.71312,-4.33578 6.44663,-3.97922 0.71312,23.47598 -5.7335,0.35656 v 5.77629 l 3.22331,3.97922 -0.59902,5.16301 2.38183,0.98411 1.4405,-3.6084 2.15363,0.72738 1.42625,1.44051 6.44662,-1.44051 6.44663,-18.78363 0.71312,-23.47599 -8.24369,-18.78364 -10.39733,-12.63652 -5.02038,0.72738 v 3.97922 l -12.18012,-4.69234 4.66382,-10.11207 3.93643,-26.72782 16.48739,-5.04891 7.88713,-5.0489 h 8.60025 l -2.15363,2.89527 2.15363,3.6084 7.53057,-7.94418 4.30726,0.35656 -0.71312,-4.69234 -6.81745,-1.44051 4.66382,-16.97231 6.14711,-5.81907 0,0 z","name":"Russian Federation"},"mv":{"path":"m 436.59252,455.60965 0.42788,3.72249 2.38183,0.87001 0.42787,-3.28036 -3.23758,-1.31214 0,0 m 3.0379,7.87286 -0.21393,4.59251 1.74002,0.87001 1.52608,-3.06643 -3.05217,-2.39609 0,0 m 0.44214,8.97108 -1.52608,1.52608 1.74002,1.52608 2.16789,-1.52608 -2.38183,-1.52608 0,0 z","name":"Maldives"},"lk":{"path":"m 471.02206,437.48208 0.35657,3.87938 0.35656,2.82397 -2.09658,0.35656 1.05542,6.34679 3.152,1.76854 4.89202,-2.82396 -1.39772,-6.68909 0.35656,-2.4674 -4.54972,-4.22169 -2.12511,1.0269 0,0 z","name":"Sri Lanka"},"mn":{"path":"m 461.40918,240.8315 8.30074,-11.01061 9.96945,4.60677 6.77466,1.81133 8.30074,-7.61614 -5.63366,-4.15037 3.70823,-5.23432 11.06766,3.90791 3.83659,6.28974 6.93155,0.18541 3.62266,-2.6956 7.45926,-0.29951 1.62592,2.76691 12.39406,0.62755 7.84435,-8.00123 10.85372,1.14099 -0.62755,10.89651 4.74939,1.08395 5.83334,-2.65282 6.17564,3.05216 -0.14262,1.54035 -4.47841,0.12836 -4.66382,9.78404 -3.62266,0.35656 -14.09129,18.41281 -14.39081,6.34679 -8.9996,0.69886 -7.47352,-4.82071 -9.55584,5.10596 -9.41321,-2.9238 -2.66708,-6.83171 -17.82806,-1.2551 -9.12796,-15.47475 -4.43562,-0.28525 -2.29625,-5.49104 0,0 z","name":"Mongolia"},"kp":{"path":"m 610.42319,275.20399 2.62429,1.09821 0.7987,9.18501 5.20579,0.29951 4.90628,-5.74776 -1.69723,-1.51182 0.19967,-6.16138 4.50694,-5.44825 -2.29626,-4.13611 1.49756,-1.71149 0.82722,-4.27873 -2.61003,-1.18379 -2.22494,1.12674 -2.75265,8.35779 -4.44988,-0.38509 -5.14874,6.0758 0.61328,4.42136 0,0 z","name":"North Korea"},"kr":{"path":"m 624.77121,280.80913 8.81419,7.18827 1.49756,6.96008 -0.29951,3.73676 -4.30726,4.84923 -3.70824,0.19967 -4.20742,-9.08518 -1.59739,-4.33578 1.69723,-1.31214 -0.39935,-1.81133 -2.09658,-0.94132 4.60677,-5.44826 0,0 z","name":"South Korea"},"kz":{"path":"m 322.90658,267.14571 5.84761,-2.49593 6.53219,-0.2282 0.4564,9.98371 h -3.82233 l -2.9238,4.76366 3.82233,6.34679 5.63367,3.18052 0.51344,3.63693 2.06806,-0.6846 1.91117,-2.26773 3.152,0.6846 1.58313,3.18052 h 4.05053 v -4.07906 l -2.48166,-7.25958 -1.12674,-5.89039 7.20254,-3.18052 9.6842,1.58313 6.0758,6.11859 13.73473,-1.35494 7.65893,10.88225 8.99961,0.4564 2.48166,-4.07906 3.152,-0.6846 0.4564,-4.53546 4.72087,-0.2282 2.48166,2.95233 2.48167,-5.89039 21.3794,2.95233 3.59414,-4.76366 -6.0758,-7.48778 8.10107,-17.68543 6.5322,0.45639 4.50693,-10.88224 -8.9996,-0.9128 -5.17727,-4.99185 -14.26245,1.65444 -18.37002,-17.75674 -6.47515,5.74776 -19.63939,-8.91402 -24.08927,11.79504 -0.67033,8.38631 5.63366,6.57499 -10.98208,6.20416 -14.24818,-0.31377 -2.98085,-4.37857 -11.16749,-0.61329 -10.58274,6.80319 -0.2282,9.29911 9.85535,7.91566 0,0 z","name":"Kazakhstan"},"tm":{"path":"m 347.38094,294.20157 -0.88427,3.75102 h -5.91892 v 5.07743 l 6.36105,4.19316 -1.96822,5.74776 v 2.65282 l 2.63856,0.44213 3.50856,-4.63529 7.90139,-1.76854 16.88673,6.40383 0.21394,4.6353 9.42748,0.88427 10.52568,-11.0534 -1.31214,-3.53708 -7.01713,-1.54035 -19.73922,-12.82193 -0.88427,-4.6353 h -7.45926 l -3.29462,6.1899 h -3.29463 l -5.69071,0.0143 0,0 z","name":"Turkmenistan"},"uz":{"path":"m 397.39933,310.56059 4.39283,0.2282 v -7.51631 l -4.16463,-2.42461 7.01712,-8.84272 h 2.85249 l 2.85249,3.32315 7.45926,-2.86675 -10.31175,-3.53709 -0.39935,-2.13936 -2.45314,0.59902 -2.41035,4.19316 -10.39733,-0.3423 -7.6304,-10.79667 -13.4067,1.32641 -6.38957,-6.33253 -8.84272,-1.49756 -6.4181,2.61003 3.7225,12.3798 0.0428,4.16464 2.70986,0.0571 3.32315,-6.33253 8.84271,0.1141 1.31215,4.86349 18.95479,12.57948 7.33089,1.68297 2.01101,4.50693 0,0 z","name":"Uzbekistan"},"tj":{"path":"m 399.21066,300.26311 5.86186,-7.27385 h 2.21068 l 0.77017,1.62592 -2.70986,1.96821 v 1.62592 l 1.7828,1.28362 8.57173,0.51345 2.79544,-1.19804 1.26936,0.25672 0.85575,2.73839 5.09169,0.51345 2.55298,5.3912 -0.77018,1.62592 -1.01263,0.0856 -1.01263,-2.05379 -2.21068,-0.17115 -3.82234,0.51345 -0.25672,3.59414 -3.82233,-0.25673 0.17114,-4.53545 -2.79543,-2.73839 -4.25021,3.50856 0.0856,2.31051 -3.73676,1.28362 h -2.21068 l 0.17115,-7.95844 -3.57987,-2.65281 0,0 z","name":"Tajikistan"},"kg":{"path":"m 408.6524,282.24964 -0.44214,3.6084 0.35656,2.22494 12.40833,4.16463 -10.89651,4.39283 -1.24083,-1.02689 -2.35331,1.51182 0.1141,0.82722 1.2551,0.5705 7.64467,0.19967 3.87938,-1.16952 4.9776,-6.27547 6.23269,1.08394 7.5163,-10.41158 -20.11004,-2.73839 -2.78118,6.74613 -3.50856,-3.76528 -3.05216,0.0571 0,0 z","name":"Kyrgyz Republic"},"af":{"path":"m 376.29091,321.95628 2.26773,17.77101 5.64793,1.24083 0.52771,3.19479 -4.05054,3.3802 7.54484,6.09006 14.66179,-5.2771 1.16952,-6.24695 9.2278,-5.76203 3.53709,-13.34965 2.63855,-2.83823 -2.73839,-4.76365 8.92829,-5.51957 -1.141,-1.59739 -4.12184,0.25672 -0.37083,3.79381 -5.53382,-0.0571 -0.0998,-5.06316 -1.78281,-2.12511 -2.99511,2.72413 0.0856,2.49593 -4.52119,1.71149 -8.34353,-0.52771 -10.83946,11.3529 -9.69846,-0.88427 0,0 z","name":"Afghanistan"},"pk":{"path":"m 389.14137,354.46039 3.70824,5.50531 -0.35656,2.83822 -4.93481,1.95396 -0.35656,4.62103 h 5.64793 l 1.93969,-1.5974 h 10.75388 l 9.69847,8.52895 1.24083,-4.09332 h 7.23106 l 0.17115,-5.14875 -7.40221,-7.10269 1.58313,-3.90791 7.58762,-0.52771 10.22617,-21.32236 -5.64793,-4.43562 -2.11084,-7.45926 13.749,-1.24083 -8.11533,-11.55258 -4.32152,-1.16952 -1.76855,2.13937 -1.3264,0.0998 -8.11533,5.14875 2.65281,4.44988 -2.99511,3.19479 -3.70824,13.67768 -9.17075,5.86187 -1.24083,6.40383 -14.61901,5.13448 0,0 z","name":"Pakistan"},"in":{"path":"m 457.38717,444.55625 6.5322,-3.19479 3.87938,-14.03424 -0.17115,-17.22903 22.22089,-23.98943 v -5.69072 l 4.57824,-1.78281 -0.17114,-6.57498 -4.93481,-9.59863 2.82396,-5.14874 6.17564,5.69072 7.92992,0.35656 v 3.19478 l -2.4674,2.66708 0.52771,1.42625 4.23594,0.17115 0.88428,4.79218 h 1.24083 l 3.18052,-5.69072 1.58313,-14.91851 5.29137,-3.73677 0.17115,-5.14874 -2.11084,-4.09332 -3.35168,-0.17115 -13.12144,8.67157 0.82722,5.57661 -9.21354,-0.0285 -3.25184,-3.97922 -1.76854,0.2282 0.59902,5.53382 -19.92463,-1.42624 -12.35128,-5.5053 -0.65607,-6.77466 -8.22943,-5.10596 -0.0998,-10.51142 -5.64793,-6.46089 -12.97882,1.24083 1.41198,5.64793 6.36105,5.14874 -10.99634,22.50614 -7.35942,0.55624 -1.21231,2.70986 7.24532,6.70335 -0.35656,6.77466 -7.40221,-0.1141 -0.7987,3.36594 6.14712,-0.27099 0.17115,2.66708 -4.4071,2.31051 2.82396,5.33416 5.46252,1.7828 3.35167,-2.48166 1.58314,-4.43562 1.93969,-0.88427 2.29625,2.31051 -0.69886,5.69072 -1.58313,2.66708 0.35656,4.62103 23.4332,48.63493 0,0 z","name":"India"},"np":{"path":"m 457.68668,344.07733 0.65607,6.09007 11.52406,5.22005 18.46986,1.3692 -0.69886,-4.46415 -12.33701,-3.39446 -10.46864,-6.23269 -7.14548,1.41198 0,0 z","name":"Nepal"},"bt":{"path":"m 492.21606,351.9502 2.21067,3.02364 7.47353,0.0571 -0.75591,-4.13611 -8.92829,1.05542 0,0 z","name":"Bhutan"},"bd":{"path":"m 492.45852,359.12421 -1.86838,3.3802 4.84923,9.21354 0.14262,7.18827 0.88427,1.92543 5.69072,0.0998 3.22331,-3.09495 2.33904,1.41198 0.47066,4.37857 1.86838,-1.16952 0.1141,-5.59088 -1.56887,-0.18541 -0.9841,-4.74939 -3.96496,-0.14263 -0.98411,-2.63855 2.42461,-3.23758 0.0428,-1.59739 h -7.04565 l -5.63366,-5.19153 0,0 z","name":"Bangladesh"},"mm":{"path":"m 540.76542,431.2066 -3.9507,-6.33252 2.86675,-4.02201 -2.70986,-4.97759 -2.55298,-0.48493 -0.48493,-8.35779 -3.82233,-7.40221 -1.11247,1.76855 -2.55298,4.33578 -3.19479,0.48492 -1.59739,-2.09658 -0.7987,-5.63366 -2.39609,-4.50694 -9.75551,-9.19927 2.39609,-1.58313 0.44214,-6.66056 3.56561,-5.99023 1.54034,-14.90425 5.16301,-3.52283 0.17115,-5.43399 3.09495,1.0269 4.87775,7.05991 -3.62266,7.75877 2.43888,6.09006 6.03301,2.36756 1.09821,6.63204 8.10107,1.2551 -2.2392,3.86512 -10.21191,4.02201 -1.11247,6.58925 7.50204,9.64141 0.31377,5.14874 -1.75428,1.76854 0.15689,1.61166 5.59088,8.20091 0.15689,8.51468 -1.64018,2.96658 0,0 z","name":"Myanmar"},"th":{"path":"m 541.6069,383.88381 4.62103,5.94744 v 7.23106 l 1.59739,0.7987 7.34516,-3.53709 1.44051,0.48493 8.7714,10.12633 -0.31377,6.91729 -2.86675,-0.48493 -2.55298,-1.61165 -1.91117,0.15688 -3.35167,5.61941 0.64181,3.05216 2.70986,1.44051 -0.15688,3.3802 -1.91117,0.96984 -6.54646,-4.50693 v -4.02201 l -2.70987,-0.15689 -1.11247,1.76855 -0.5705,17.9992 4.23595,7.73025 7.50205,7.23106 -0.31378,2.09657 -3.99348,-0.15688 -3.66545,-5.46252 h -3.8366 l -4.79218,-3.86512 -1.44051,-4.02201 2.06806,-3.3802 0.71312,-3.05216 2.25347,-3.99349 -0.0998,-9.18501 -5.5053,-7.95844 -0.2282,-0.96985 1.7828,-1.79707 -0.41361,-6.31826 -7.33089,-9.28485 0.85574,-5.34842 9.08518,-3.8366 0,0 z","name":"Thailand"},"kh":{"path":"m 556.51115,425.2449 5.83334,6.23269 10.85372,-8.04402 0.95559,-12.69357 -5.60514,3.86512 -2.90954,-1.62592 -3.9507,-0.52771 -2.21068,-1.55461 -1.06968,0.0571 -2.89528,4.7494 0.47066,2.19641 2.93807,1.64018 -0.35656,4.46415 -2.0538,1.24083 0,0 z","name":"Cambodia"},"la":{"path":"m 549.36567,373.12993 -3.45151,1.75428 -2.86675,8.35779 4.79218,6.10433 -0.7987,6.74614 0.7987,0.32803 7.9727,-3.86512 10.69684,11.95193 -0.25673,7.53057 2.32478,1.25509 5.74777,-4.66382 -0.47066,-3.69397 -16.58723,-15.76 0.15689,-2.41035 2.06805,-1.44051 -1.4405,-4.02201 -6.86024,-1.12673 -1.82559,-7.04565 0,0 z","name":"Lao People's Democratic Republic"},"vn":{"path":"m 563.04335,432.3476 1.69723,2.66708 0.31378,3.05216 4.46414,0.48492 5.41973,-7.23106 5.10596,-1.4405 2.70986,-7.38795 -1.26936,-11.89488 -5.26284,-7.23106 -5.54809,-4.43562 -7.05991,-12.12307 5.06317,-8.4719 -7.24532,-8.315 -5.80482,-0.25673 -5.22005,2.80971 1.5546,6.71761 6.96008,1.22657 1.86838,5.17726 -2.45314,1.5974 0.15688,1.28362 16.3305,15.97394 0.64181,4.69234 -0.98411,14.83294 -11.43848,8.27222 0,0 z","name":"Vietnam"},"ir":{"path":"m 312.86582,308.97746 -1.74002,1.81133 0.17115,2.86675 2.1679,3.0379 7.68745,8.41484 -1.16952,3.36594 h -1.34067 l -0.67033,3.36594 4.35004,5.56235 4.00775,0.3423 8.02976,11.11044 4.50693,0.3423 3.50856,2.52445 0.17115,5.04891 13.87736,8.0868 h 5.17726 l 3.18053,-2.6956 4.00775,-0.17115 2.33904,5.39121 14.98982,2.08231 0.44214,-5.5053 4.96333,-1.79707 0.2282,-1.96822 -3.9507,-5.3912 -8.79992,-7.07417 4.62103,-4.20742 -0.32804,-1.85412 -5.79055,-0.89853 -2.45314,-19.53955 -0.28525,-4.49267 -15.70295,-6.00449 -6.96007,1.56887 -3.89365,4.77792 -3.45151,-0.2282 -0.99837,0.84148 -7.68746,-0.49918 -9.69846,-7.07418 -3.6084,-3.95069 -1.65444,0.39935 -2.98086,3.40872 -5.26284,-0.99837 0,0 z","name":"Iran"},"tr":{"path":"m 297.24845,296.48356 -3.18053,3.36593 -11.6952,-0.34229 -7.01713,-4.20743 -6.84597,-0.17114 -7.85861,5.56235 -7.35942,0.3423 -0.67033,4.20742 h -8.35779 l -3.33742,3.0379 v 1.68297 l 2.01101,1.68297 v 1.85411 l -0.84148,2.19642 0.84148,1.85412 2.68134,-1.34067 2.68134,2.86675 -0.67034,2.02527 -0.99837,1.35493 1.49756,1.68297 7.35942,1.51182 5.17727,-2.19642 v -3.19479 l 2.51019,0.49919 6.01875,3.53708 6.51794,-1.01263 2.83822,-2.6956 1.83986,0.67033 v 3.0379 h 2.51019 l 2.16789,-4.20742 19.05462,-2.02526 8.31501,-1.01264 -2.19642,-2.88101 -0.0428,-3.89365 1.6687,-1.99674 -6.0758,-4.87776 0.32804,-4.20742 h -3.33742 l -5.53382,-2.70986 0,0 m -50.8884,0.72738 -0.2282,5.06317 4.42135,-1.35493 2.02527,-1.35493 -0.59902,-2.19642 -2.09658,-1.66871 -3.52282,1.51182 0,0 z","name":"Turkey"},"om":{"path":"m 353.84182,398.67397 10.53995,-6.0758 1.86838,-8.91403 -2.31052,-1.32641 0.95559,-9.55583 2.011,-1.16953 2.15363,3.3802 12.82194,6.70335 v 3.7225 l -15.5318,22.8627 -7.14549,0.24246 -5.36268,-9.86961 0,0 z","name":"Oman"},"ae":{"path":"m 347.60914,375.99668 1.24083,4.96333 14.06277,1.24084 0.98411,-10.18339 2.70986,-1.48329 0.74165,-3.7225 -4.43562,1.24083 -4.93481,7.45926 -10.36879,0.48492 0,0 z","name":"United Arab Emirates"},"qa":{"path":"m 345.64092,367.55332 -0.74165,5.71924 2.19642,1.6687 1.99674,-0.18541 0.74165,-7.20253 -1.72576,-1.24084 -2.4674,1.24084 0,0 z","name":"Qatar"},"kw":{"path":"m 332.3198,350.65232 -3.20905,-1.74002 -2.22495,2.23921 0.24247,4.4784 5.17726,1.98248 0.0143,-6.96007 0,0 z","name":"Kuwait"},"sa":{"path":"m 333.33243,359.30962 9.99797,13.93441 3.22332,2.56724 1.4405,6.24695 15.38918,1.21231 1.74002,0.9128 -1.72576,7.70172 -10.11207,5.9617 -14.79016,4.4784 -7.88713,7.70172 -9.37042,-5.46251 -5.67646,4.96333 -7.90139,-12.90751 -5.41973,-2.48167 -1.96822,-2.98085 v -6.46089 l -19.72496,-23.8468 -0.74164,-4.22169 h 5.67645 l 6.90302,-5.9617 0.24246,-2.98085 -1.96821,-1.98248 3.95069,-3.22331 8.38632,0.49918 14.30523,11.92341 8.44337,-0.38509 0.54197,2.08232 7.04565,2.70986 0,0 z","name":"Saudi Arabia"},"sy":{"path":"m 280.09073,324.92287 -0.49919,3.62266 4.02201,1.68297 -0.17115,10.04076 4.02201,-0.0856 4.02201,-3.0379 1.51182,-0.25673 9.12796,-7.25958 1.83986,-10.53995 -18.24167,1.85412 -1.92543,4.22168 -3.70823,-0.24246 0,0 z","name":"Syrian Arab Republic"},"iq":{"path":"m 305.24968,319.07527 -2.22494,10.99634 -9.21354,7.6732 0.58476,3.62266 8.9996,0.61328 14.33376,11.66668 8.01549,-0.2282 0.21394,-2.6956 2.93806,-3.152 4.10758,2.32478 0.54198,-0.51345 -7.94419,-10.56847 -3.76528,-0.2282 -5.00612,-6.43236 0.99837,-4.73513 1.52608,-0.19968 0.52771,-2.09658 -6.81744,-7.174 -7.81582,1.12673 0,0 z","name":"Iraq"},"jo":{"path":"m 283.27125,341.53862 -3.50856,12.23717 -0.15689,1.86839 h 5.51957 l 6.17564,-5.44826 0.15688,-2.06805 -2.52445,-2.58151 4.5212,-3.75102 -0.65608,-3.48003 -1.24083,0.28524 -3.76528,2.69561 -4.5212,0.24246 0,0 z","name":"Jordan"},"lb":{"path":"m 279.42039,329.64374 0.0856,2.78118 -1.16952,4.22168 4.022,0.3423 0.25673,-5.99023 -3.19479,-1.35493 0,0 z","name":"Lebanon"},"il":{"path":"m 278.1653,337.65923 -2.25347,7.17401 2.9238,8.60026 3.35168,-12.56522 v -2.6956 l -4.02201,-0.51345 0,0 z","name":"Israel"}}});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         //! moment.js locale configuration
//! locale : Arabic (Saudi Arabia) [ar-sa]
//! author : Suhail Alkowaileet : https://github.com/xsoh

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var symbolMap = {
            1: '١',
            2: '٢',
            3: '٣',
            4: '٤',
            5: '٥',
            6: '٦',
            7: '٧',
            8: '٨',
            9: '٩',
            0: '٠',
        },
        numberMap = {
            '١': '1',
            '٢': '2',
            '٣': '3',
            '٤': '4',
            '٥': '5',
            '٦': '6',
            '٧': '7',
            '٨': '8',
            '٩': '9',
            '٠': '0',
        };

    var arSa = moment.defineLocale('ar-sa', {
        months: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split(
            '_'
        ),
        monthsShort: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split(
            '_'
        ),
        weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
        weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
        weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        meridiemParse: /ص|م/,
        isPM: function (input) {
            return 'م' === input;
        },
        meridiem: function (hour, minute, isLower) {
            if (hour < 12) {
                return 'ص';
            } else {
                return 'م';
            }
        },
        calendar: {
            sameDay: '[اليوم على الساعة] LT',
            nextDay: '[غدا على الساعة] LT',
            nextWeek: 'dddd [على الساعة] LT',
            lastDay: '[أمس على الساعة] LT',
            lastWeek: 'dddd [على الساعة] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'في %s',
            past: 'منذ %s',
            s: 'ثوان',
            ss: '%d ثانية',
            m: 'دقيقة',
            mm: '%d دقائق',
            h: 'ساعة',
            hh: '%d ساعات',
            d: 'يوم',
            dd: '%d أيام',
            M: 'شهر',
            MM: '%d أشهر',
            y: 'سنة',
            yy: '%d سنوات',
        },
        preparse: function (string) {
            return string
                .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
                    return numberMap[match];
                })
                .replace(/،/g, ',');
        },
        postformat: function (string) {
            return string
                .replace(/\d/g, function (match) {
                    return symbolMap[match];
                })
                .replace(/,/g, '،');
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 6, // The week that contains Jan 6th is the first week of the year.
        },
    });

    return arSa;

})));
                                                                                                                                                                                                                                                                                                                                              //! moment.js locale configuration
//! locale : French (Canada) [fr-ca]
//! author : Jonathan Abourbih : https://github.com/jonbca

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var frCa = moment.defineLocale('fr-ca', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
            '_'
        ),
        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
            '_'
        ),
        monthsParseExact: true,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            ss: '%d secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans',
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
        ordinal: function (number, period) {
            switch (period) {
                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'D':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
    });

    return frCa;

})));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    //! moment.js locale configuration
//! locale : Burmese [my]
//! author : Squar team, mysquar.com
//! author : David Rossellat : https://github.com/gholadr
//! author : Tin Aung Lin : https://github.com/thanyawzinmin

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var symbolMap = {
            1: '၁',
            2: '၂',
            3: '၃',
            4: '၄',
            5: '၅',
            6: '၆',
            7: '၇',
            8: '၈',
            9: '၉',
            0: '၀',
        },
        numberMap = {
            '၁': '1',
            '၂': '2',
            '၃': '3',
            '၄': '4',
            '၅': '5',
            '၆': '6',
            '၇': '7',
            '၈': '8',
            '၉': '9',
            '၀': '0',
        };

    var my = moment.defineLocale('my', {
        months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split(
            '_'
        ),
        monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
        weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split(
            '_'
        ),
        weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
        weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[ယနေ.] LT [မှာ]',
            nextDay: '[မနက်ဖြန်] LT [မှာ]',
            nextWeek: 'dddd LT [မှာ]',
            lastDay: '[မနေ.က] LT [မှာ]',
            lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'လာမည့် %s မှာ',
            past: 'လွန်ခဲ့သော %s က',
            s: 'စက္ကန်.အနည်းငယ်',
            ss: '%d စက္ကန့်',
            m: 'တစ်မိနစ်',
            mm: '%d မိနစ်',
            h: 'တစ်နာရီ',
            hh: '%d နာရီ',
            d: 'တစ်ရက်',
            dd: '%d ရက်',
            M: 'တစ်လ',
            MM: '%d လ',
            y: 'တစ်နှစ်',
            yy: '%d နှစ်',
        },
        preparse: function (string) {
            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4, // The week that contains Jan 4th is the first week of the year.
        },
    });

    return my;

})));
                                                                                                                                                                                                                                                                                                                                              //! moment.js locale configuration
//! locale : Vietnamese [vi]
//! author : Bang Nguyen : https://github.com/bangnk
//! author : Chien Kira : https://github.com/chienkira

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var vi = moment.defineLocale('vi', {
        months: 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split(
            '_'
        ),
        monthsShort: 'Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12'.split(
            '_'
        ),
        monthsParseExact: true,
        weekdays: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split(
            '_'
        ),
        weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
        weekdaysParseExact: true,
        meridiemParse: /sa|ch/i,
        isPM: function (input) {
            return /^ch$/i.test(input);
        },
        meridiem: function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'sa' : 'SA';
            } else {
                return isLower ? 'ch' : 'CH';
            }
        },
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM [năm] YYYY',
            LLL: 'D MMMM [năm] YYYY HH:mm',
            LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
            l: 'DD/M/YYYY',
            ll: 'D MMM YYYY',
            lll: 'D MMM YYYY HH:mm',
            llll: 'ddd, D MMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[Hôm nay lúc] LT',
            nextDay: '[Ngày mai lúc] LT',
            nextWeek: 'dddd [tuần tới lúc] LT',
            lastDay: '[Hôm qua lúc] LT',
            lastWeek: 'dddd [tuần trước lúc] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: '%s tới',
            past: '%s trước',
            s: 'vài giây',
            ss: '%d giây',
            m: 'một phút',
            mm: '%d phút',
            h: 'một giờ',
            hh: '%d giờ',
            d: 'một ngày',
            dd: '%d ngày',
            w: 'một tuần',
            ww: '%d tuần',
            M: 'một tháng',
            MM: '%d tháng',
            y: 'một năm',
            yy: '%d năm',
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: function (number) {
            return number;
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4, // The week that contains Jan 4th is the first week of the year.
        },
    });

    return vi;

})));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          /* This is a compiled file, to make changes persist, consider editing under the templates directory */
.pace {
  -webkit-pointer-events: none;
  pointer-events: none;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 12px;
  background: #fff;
}

.pace-inactive {
  display: none;
}

.pace .pace-progress {
  background-color: #22df80;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 100%;
  width: 100%;
  overflow: hidden;
}

.pace .pace-activity {
  position: fixed;
  top: 0;
  right: -32px;
  bottom: 0;
  left: 0;

  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);

  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.2)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.2)), color-stop(0.75, rgba(255, 255, 255, 0.2)), color-stop(0.75, transparent), to(transparent));
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
  -webkit-background-size: 32px 32px;
  -moz-background-size: 32px 32px;
  -o-background-size: 32px 32px;
  background-size: 32px 32px;

  -webkit-animation: pace-theme-barber-shop-motion 500ms linear infinite;
  -moz-animation: pace-theme-barber-shop-motion 500ms linear infinite;
  -ms-animation: pace-theme-barber-shop-motion 500ms linear infinite;
  -o-animation: pace-theme-barber-shop-motion 500ms linear infinite;
  animation: pace-theme-barber-shop-motion 500ms linear infinite;
}

@-webkit-keyframes pace-theme-barber-shop-motion {
  0% { -webkit-transform: none; transform: none; }
  100% { -webkit-transform: translate(-32px, 0); transform: translate(-32px, 0); }
}
@-moz-keyframes pace-theme-barber-shop-motion {
  0% { -moz-transform: none; transform: none; }
  100% { -moz-transform: translate(-32px, 0); transform: translate(-32px, 0); }
}
@-o-keyframes pace-theme-barber-shop-motion {
  0% { -o-transform: none; transform: none; }
  100% { -o-transform: translate(-32px, 0); transform: translate(-32px, 0); }
}
@-ms-keyframes pace-theme-barber-shop-motion {
  0% { -ms-transform: none; transform: none; }
  100% { -ms-transform: translate(-32px, 0); transform: translate(-32px, 0); }
}
@keyframes pace-theme-barber-shop-motion {
  0% { transform: none; transform: none; }
  100% { transform: translate(-32px, 0); transform: translate(-32px, 0); }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    /* This is a compiled file, to make changes persist, consider editing under the templates directory */
.pace.pace-inactive {
  display: none;
}

.pace {
  -webkit-pointer-events: none;
  pointer-events: none;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  z-index: 2000;
  position: fixed;
  height: 60px;
  width: 100px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.pace .pace-progress {
  z-index: 2000;
  position: absolute;
  height: 60px;
  width: 100px;

  -webkit-transform: translate3d(0, 0, 0) !important;
  -ms-transform: translate3d(0, 0, 0) !important;
  transform: translate3d(0, 0, 0) !important;
}

.pace .pace-progress:before {
  content: attr(data-progress-text);
  text-align: center;
  color: #fff;
  background: #7c60e0;
  border-radius: 50%;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 100;
  line-height: 1;
  padding: 20% 0 7px;
  width: 50%;
  height: 40%;
  margin: 10px 0 0 30px;
  display: block;
  z-index: 999;
  position: absolute;
}

.pace .pace-activity {
  font-size: 15px;
  line-height: 1;
  z-index: 2000;
  position: absolute;
  height: 60px;
  width: 100px;

  display: block;
  -webkit-animation: pace-theme-center-atom-spin 2s linear infinite;
  -moz-animation: pace-theme-center-atom-spin 2s linear infinite;
  -o-animation: pace-theme-center-atom-spin 2s linear infinite;
  animation: pace-theme-center-atom-spin 2s linear infinite;
}

.pace .pace-activity {
  border-radius: 50%;
  border: 5px solid #7c60e0;
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  width: 100px;
}

.pace .pace-activity:after {
  border-radius: 50%;
  border: 5px solid #7c60e0;
  content: ' ';
  display: block;
  position: absolute;
  top: -5px;
  left: -5px;
  height: 60px;
  width: 100px;

  -webkit-transform: rotate(60deg);
  -moz-transform: rotate(60deg);
  -o-transform: rotate(60deg);
  transform: rotate(60deg);
}

.pace .pace-activity:before {
  border-radius: 50%;
  border: 5px solid #7c60e0;
  content: ' ';
  display: block;
  position: absolute;
  top: -5px;
  left: -5px;
  height: 60px;
  width: 100px;

  -webkit-transform: rotate(120deg);
  -moz-transform: rotate(120deg);
  -o-transform: rotate(120deg);
  transform: rotate(120deg);
}

@-webkit-keyframes pace-theme-center-atom-spin {
  0%   { -webkit-transform: rotate(0deg) }
  100% { -webkit-transform: rotate(359deg) }
}
@-moz-keyframes pace-theme-center-atom-spin {
  0%   { -moz-transform: rotate(0deg) }
  100% { -moz-transform: rotate(359deg) }
}
@-o-keyframes pace-theme-center-atom-spin {
  0%   { -o-transform: rotate(0deg) }
  100% { -o-transform: rotate(359deg) }
}
@keyframes pace-theme-center-atom-spin {
  0%   { transform: rotate(0deg) }
  100% { transform: rotate(359deg) }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            /* This is a compiled file, to make changes persist, consider editing under the templates directory */
.pace {
  -webkit-pointer-events: none;
  pointer-events: none;

  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.pace .pace-activity {
  display: block;
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: #ffffff;
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  -webkit-transform: translateX(100%) translateY(-100%) rotate(45deg);
  transform: translateX(100%) translateY(-100%) rotate(45deg);
  pointer-events: none;
}

.pace.pace-active .pace-activity {
  -webkit-transform: translateX(50%) translateY(-50%) rotate(45deg);
  transform: translateX(50%) translateY(-50%) rotate(45deg);
}

.pace .pace-activity::before,
.pace .pace-activity::after {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    bottom: 30px;
    left: 50%;
    display: block;
    border: 5px solid #fff;
    border-radius: 50%;
    content: '';
}

.pace .pace-activity::before {
    margin-left: -40px;
    width: 80px;
    height: 80px;
    border-right-color: rgba(0, 0, 0, .2);
    border-left-color: rgba(0, 0, 0, .2);
    -webkit-animation: pace-theme-corner-indicator-spin 3s linear infinite;
    animation: pace-theme-corner-indicator-spin 3s linear infinite;
}

.pace .pace-activity::after {
    bottom: 50px;
    margin-left: -20px;
    width: 40px;
    height: 40px;
    border-top-color: rgba(0, 0, 0, .2);
    border-bottom-color: rgba(0, 0, 0, .2);
    -webkit-animation: pace-theme-corner-indicator-spin 1s linear infinite;
    animation: pace-theme-corner-indicator-spin 1s linear infinite;
}

@-webkit-keyframes pace-theme-corner-indicator-spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(359deg); }
}
@keyframes pace-theme-corner-indicator-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(359deg); }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              {"version":3,"file":"popper-utils.js","sources":["../../src/utils/getStyleComputedProperty.js","../../src/utils/getParentNode.js","../../src/utils/getScrollParent.js","../../src/utils/getReferenceNode.js","../../src/utils/isBrowser.js","../../src/utils/isIE.js","../../src/utils/getOffsetParent.js","../../src/utils/isOffsetContainer.js","../../src/utils/getRoot.js","../../src/utils/findCommonOffsetParent.js","../../src/utils/getScroll.js","../../src/utils/includeScroll.js","../../src/utils/getBordersSize.js","../../src/utils/getWindowSizes.js","../../src/utils/getClientRect.js","../../src/utils/getBoundingClientRect.js","../../src/utils/getOffsetRectRelativeToArbitraryNode.js","../../src/utils/getViewportOffsetRectRelativeToArtbitraryNode.js","../../src/utils/isFixed.js","../../src/utils/getFixedPositionOffsetParent.js","../../src/utils/getBoundaries.js","../../src/utils/computeAutoPlacement.js","../../src/utils/debounce.js","../../src/utils/find.js","../../src/utils/findIndex.js","../../src/utils/getOffsetRect.js","../../src/utils/getOuterSizes.js","../../src/utils/getOppositePlacement.js","../../src/utils/getPopperOffsets.js","../../src/utils/getReferenceOffsets.js","../../src/utils/getSupportedPropertyName.js","../../src/utils/isFunction.js","../../src/utils/isModifierEnabled.js","../../src/utils/isModifierRequired.js","../../src/utils/isNumeric.js","../../src/utils/getWindow.js","../../src/utils/removeEventListeners.js","../../src/utils/runModifiers.js","../../src/utils/setAttributes.js","../../src/utils/setStyles.js","../../src/utils/setupEventListeners.js","../../src/utils/index.js"],"sourcesContent":["/**\n * Get CSS computed property of the given element\n * @method\n * @memberof Popper.Utils\n * @argument {Eement} element\n * @argument {String} property\n */\nexport default function getStyleComputedProperty(element, property) {\n  if (element.nodeType !== 1) {\n    return [];\n  }\n  // NOTE: 1 DOM access here\n  const window = element.ownerDocument.defaultView;\n  const css = window.getComputedStyle(element, null);\n  return property ? css[property] : css;\n}\n","/**\n * Returns the parentNode or the host of the element\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @returns {Element} parent\n */\nexport default function getParentNode(element) {\n  if (element.nodeName === 'HTML') {\n    return element;\n  }\n  return element.parentNode || element.host;\n}\n","import getStyleComputedProperty from './getStyleComputedProperty';\nimport getParentNode from './getParentNode';\n\n/**\n * Returns the scrolling parent of the given element\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @returns {Element} scroll parent\n */\nexport default function getScrollParent(element) {\n  // Return body, `getScroll` will take care to get the correct `scrollTop` from it\n  if (!element) {\n    return document.body\n  }\n\n  switch (element.nodeName) {\n    case 'HTML':\n    case 'BODY':\n      return element.ownerDocument.body\n    case '#document':\n      return element.body\n  }\n\n  // Firefox want us to check `-x` and `-y` variations as well\n  const { overflow, overflowX, overflowY } = getStyleComputedProperty(element);\n  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {\n    return element;\n  }\n\n  return getScrollParent(getParentNode(element));\n}\n","/**\n * Returns the reference node of the reference object, or the reference object itself.\n * @method\n * @memberof Popper.Utils\n * @param {Element|Object} reference - the reference element (the popper will be relative to this)\n * @returns {Element} parent\n */\nexport default function getReferenceNode(reference) {\n  return reference && reference.referenceNode ? reference.referenceNode : reference;\n}\n","export default typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';\n","import isBrowser from './isBrowser';\n\nconst isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);\nconst isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);\n\n/**\n * Determines if the browser is Internet Explorer\n * @method\n * @memberof Popper.Utils\n * @param {Number} version to check\n * @returns {Boolean} isIE\n */\nexport default function isIE(version) {\n  if (version === 11) {\n    return isIE11;\n  }\n  if (version === 10) {\n    return isIE10;\n  }\n  return isIE11 || isIE10;\n}\n","import getStyleComputedProperty from './getStyleComputedProperty';\nimport isIE from './isIE';\n/**\n * Returns the offset parent of the given element\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @returns {Element} offset parent\n */\nexport default function getOffsetParent(element) {\n  if (!element) {\n    return document.documentElement;\n  }\n\n  const noOffsetParent = isIE(10) ? document.body : null;\n\n  // NOTE: 1 DOM access here\n  let offsetParent = element.offsetParent || null;\n  // Skip hidden elements which don't have an offsetParent\n  while (offsetParent === noOffsetParent && element.nextElementSibling) {\n    offsetParent = (element = element.nextElementSibling).offsetParent;\n  }\n\n  const nodeName = offsetParent && offsetParent.nodeName;\n\n  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {\n    return element ? element.ownerDocument.documentElement : document.documentElement;\n  }\n\n  // .offsetParent will return the closest TH, TD or TABLE in case\n  // no offsetParent is present, I hate this job...\n  if (\n    ['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 &&\n    getStyleComputedProperty(offsetParent, 'position') === 'static'\n  ) {\n    return getOffsetParent(offsetParent);\n  }\n\n  return offsetParent;\n}\n","import getOffsetParent from './getOffsetParent';\n\nexport default function isOffsetContainer(element) {\n  const { nodeName } = element;\n  if (nodeName === 'BODY') {\n    return false;\n  }\n  return (\n    nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element\n  );\n}\n","/**\n * Finds the root node (document, shadowDOM root) of the given element\n * @method\n * @memberof Popper.Utils\n * @argument {Element} node\n * @returns {Element} root node\n */\nexport default function getRoot(node) {\n  if (node.parentNode !== null) {\n    return getRoot(node.parentNode);\n  }\n\n  return node;\n}\n","import isOffsetContainer from './isOffsetContainer';\nimport getRoot from './getRoot';\nimport getOffsetParent from './getOffsetParent';\n\n/**\n * Finds the offset parent common to the two provided nodes\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element1\n * @argument {Element} element2\n * @returns {Element} common offset parent\n */\nexport default function findCommonOffsetParent(element1, element2) {\n  // This check is needed to avoid errors in case one of the elements isn't defined for any reason\n  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {\n    return document.documentElement;\n  }\n\n  // Here we make sure to give as \"start\" the element that comes first in the DOM\n  const order =\n    element1.compareDocumentPosition(element2) &\n    Node.DOCUMENT_POSITION_FOLLOWING;\n  const start = order ? element1 : element2;\n  const end = order ? element2 : element1;\n\n  // Get common ancestor container\n  const range = document.createRange();\n  range.setStart(start, 0);\n  range.setEnd(end, 0);\n  const { commonAncestorContainer } = range;\n\n  // Both nodes are inside #document\n  if (\n    (element1 !== commonAncestorContainer &&\n      element2 !== commonAncestorContainer) ||\n    start.contains(end)\n  ) {\n    if (isOffsetContainer(commonAncestorContainer)) {\n      return commonAncestorContainer;\n    }\n\n    return getOffsetParent(commonAncestorContainer);\n  }\n\n  // one of the nodes is inside shadowDOM, find which one\n  const element1root = getRoot(element1);\n  if (element1root.host) {\n    return findCommonOffsetParent(element1root.host, element2);\n  } else {\n    return findCommonOffsetParent(element1, getRoot(element2).host);\n  }\n}\n","/**\n * Gets the scroll value of the given element in the given side (top and left)\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @argument {String} side `top` or `left`\n * @returns {number} amount of scrolled pixels\n */\nexport default function getScroll(element, side = 'top') {\n  const upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';\n  const nodeName = element.nodeName;\n\n  if (nodeName === 'BODY' || nodeName === 'HTML') {\n    const html = element.ownerDocument.documentElement;\n    const scrollingElement = element.ownerDocument.scrollingElement || html;\n    return scrollingElement[upperSide];\n  }\n\n  return element[upperSide];\n}\n","import getScroll from './getScroll';\n\n/*\n * Sum or subtract the element scroll values (left and top) from a given rect object\n * @method\n * @memberof Popper.Utils\n * @param {Object} rect - Rect object you want to change\n * @param {HTMLElement} element - The element from the function reads the scroll values\n * @param {Boolean} subtract - set to true if you want to subtract the scroll values\n * @return {Object} rect - The modifier rect object\n */\nexport default function includeScroll(rect, element, subtract = false) {\n  const scrollTop = getScroll(element, 'top');\n  const scrollLeft = getScroll(element, 'left');\n  const modifier = subtract ? -1 : 1;\n  rect.top += scrollTop * modifier;\n  rect.bottom += scrollTop * modifier;\n  rect.left += scrollLeft * modifier;\n  rect.right += scrollLeft * modifier;\n  return rect;\n}\n","/*\n * Helper to detect borders of a given element\n * @method\n * @memberof Popper.Utils\n * @param {CSSStyleDeclaration} styles\n * Result of `getStyleComputedProperty` on the given element\n * @param {String} axis - `x` or `y`\n * @return {number} borders - The borders size of the given axis\n */\n\nexport default function getBordersSize(styles, axis) {\n  const sideA = axis === 'x' ? 'Left' : 'Top';\n  const sideB = sideA === 'Left' ? 'Right' : 'Bottom';\n\n  return (\n    parseFloat(styles[`border${sideA}Width`]) +\n    parseFloat(styles[`border${sideB}Width`])\n  );\n}\n","import isIE from './isIE';\n\nfunction getSize(axis, body, html, computedStyle) {\n  return Math.max(\n    body[`offset${axis}`],\n    body[`scroll${axis}`],\n    html[`client${axis}`],\n    html[`offset${axis}`],\n    html[`scroll${axis}`],\n    isIE(10)\n      ? (parseInt(html[`offset${axis}`]) + \n      parseInt(computedStyle[`margin${axis === 'Height' ? 'Top' : 'Left'}`]) + \n      parseInt(computedStyle[`margin${axis === 'Height' ? 'Bottom' : 'Right'}`]))\n    : 0 \n  );\n}\n\nexport default function getWindowSizes(document) {\n  const body = document.body;\n  const html = document.documentElement;\n  const computedStyle = isIE(10) && getComputedStyle(html);\n\n  return {\n    height: getSize('Height', body, html, computedStyle),\n    width: getSize('Width', body, html, computedStyle),\n  };\n}\n","/**\n * Given element offsets, generate an output similar to getBoundingClientRect\n * @method\n * @memberof Popper.Utils\n * @argument {Object} offsets\n * @returns {Object} ClientRect like output\n */\nexport default function getClientRect(offsets) {\n  return {\n    ...offsets,\n    right: offsets.left + offsets.width,\n    bottom: offsets.top + offsets.height,\n  };\n}\n","import getStyleComputedProperty from './getStyleComputedProperty';\nimport getBordersSize from './getBordersSize';\nimport getWindowSizes from './getWindowSizes';\nimport getScroll from './getScroll';\nimport getClientRect from './getClientRect';\nimport isIE from './isIE';\n\n/**\n * Get bounding client rect of given element\n * @method\n * @memberof Popper.Utils\n * @param {HTMLElement} element\n * @return {Object} client rect\n */\nexport default function getBoundingClientRect(element) {\n  let rect = {};\n\n  // IE10 10 FIX: Please, don't ask, the element isn't\n  // considered in DOM in some circumstances...\n  // This isn't reproducible in IE10 compatibility mode of IE11\n  try {\n    if (isIE(10)) {\n      rect = element.getBoundingClientRect();\n      const scrollTop = getScroll(element, 'top');\n      const scrollLeft = getScroll(element, 'left');\n      rect.top += scrollTop;\n      rect.left += scrollLeft;\n      rect.bottom += scrollTop;\n      rect.right += scrollLeft;\n    }\n    else {\n      rect = element.getBoundingClientRect();\n    }\n  }\n  catch(e){}\n\n  const result = {\n    left: rect.left,\n    top: rect.top,\n    width: rect.right - rect.left,\n    height: rect.bottom - rect.top,\n  };\n\n  // subtract scrollbar size from sizes\n  const sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};\n  const width =\n    sizes.width || element.clientWidth || result.width;\n  const height =\n    sizes.height || element.clientHeight || result.height;\n\n  let horizScrollbar = element.offsetWidth - width;\n  let vertScrollbar = element.offsetHeight - height;\n\n  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`\n  // we make this check conditional for performance reasons\n  if (horizScrollbar || vertScrollbar) {\n    const styles = getStyleComputedProperty(element);\n    horizScrollbar -= getBordersSize(styles, 'x');\n    vertScrollbar -= getBordersSize(styles, 'y');\n\n    result.width -= horizScrollbar;\n    result.height -= vertScrollbar;\n  }\n\n  return getClientRect(result);\n}\n","import getStyleComputedProperty from './getStyleComputedProperty';\nimport includeScroll from './includeScroll';\nimport getScrollParent from './getScrollParent';\nimport getBoundingClientRect from './getBoundingClientRect';\nimport runIsIE from './isIE';\nimport getClientRect from './getClientRect';\n\nexport default function getOffsetRectRelativeToArbitraryNode(children, parent, fixedPosition = false) {\n  const isIE10 = runIsIE(10);\n  const isHTML = parent.nodeName === 'HTML';\n  const childrenRect = getBoundingClientRect(children);\n  const parentRect = getBoundingClientRect(parent);\n  const scrollParent = getScrollParent(children);\n\n  const styles = getStyleComputedProperty(parent);\n  const borderTopWidth = parseFloat(styles.borderTopWidth);\n  const borderLeftWidth = parseFloat(styles.borderLeftWidth);\n\n  // In cases where the parent is fixed, we must ignore negative scroll in offset calc\n  if(fixedPosition && isHTML) {\n    parentRect.top = Math.max(parentRect.top, 0);\n    parentRect.left = Math.max(parentRect.left, 0);\n  }\n  let offsets = getClientRect({\n    top: childrenRect.top - parentRect.top - borderTopWidth,\n    left: childrenRect.left - parentRect.left - borderLeftWidth,\n    width: childrenRect.width,\n    height: childrenRect.height,\n  });\n  offsets.marginTop = 0;\n  offsets.marginLeft = 0;\n\n  // Subtract margins of documentElement in case it's being used as parent\n  // we do this only on HTML because it's the only element that behaves\n  // differently when margins are applied to it. The margins are included in\n  // the box of the documentElement, in the other cases not.\n  if (!isIE10 && isHTML) {\n    const marginTop = parseFloat(styles.marginTop);\n    const marginLeft = parseFloat(styles.marginLeft);\n\n    offsets.top -= borderTopWidth - marginTop;\n    offsets.bottom -= borderTopWidth - marginTop;\n    offsets.left -= borderLeftWidth - marginLeft;\n    offsets.right -= borderLeftWidth - marginLeft;\n\n    // Attach marginTop and marginLeft because in some circumstances we may need them\n    offsets.marginTop = marginTop;\n    offsets.marginLeft = marginLeft;\n  }\n\n  if (\n    isIE10 && !fixedPosition\n      ? parent.contains(scrollParent)\n      : parent === scrollParent && scrollParent.nodeName !== 'BODY'\n  ) {\n    offsets = includeScroll(offsets, parent);\n  }\n\n  return offsets;\n}\n","import getOffsetRectRelativeToArbitraryNode from './getOffsetRectRelativeToArbitraryNode';\nimport getScroll from './getScroll';\nimport getClientRect from './getClientRect';\n\nexport default function getViewportOffsetRectRelativeToArtbitraryNode(element, excludeScroll = false) {\n  const html = element.ownerDocument.documentElement;\n  const relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);\n  const width = Math.max(html.clientWidth, window.innerWidth || 0);\n  const height = Math.max(html.clientHeight, window.innerHeight || 0);\n\n  const scrollTop = !excludeScroll ? getScroll(html) : 0;\n  const scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;\n\n  const offset = {\n    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,\n    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,\n    width,\n    height,\n  };\n\n  return getClientRect(offset);\n}\n","import getStyleComputedProperty from './getStyleComputedProperty';\nimport getParentNode from './getParentNode';\n\n/**\n * Check if the given element is fixed or is inside a fixed parent\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @argument {Element} customContainer\n * @returns {Boolean} answer to \"isFixed?\"\n */\nexport default function isFixed(element) {\n  const nodeName = element.nodeName;\n  if (nodeName === 'BODY' || nodeName === 'HTML') {\n    return false;\n  }\n  if (getStyleComputedProperty(element, 'position') === 'fixed') {\n    return true;\n  }\n  const parentNode = getParentNode(element);\n  if (!parentNode) {\n    return false;\n  }\n  return isFixed(parentNode);\n}\n","import getStyleComputedProperty from './getStyleComputedProperty';\nimport isIE from './isIE';\n/**\n * Finds the first parent of an element that has a transformed property defined\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @returns {Element} first transformed parent or documentElement\n */\n\nexport default function getFixedPositionOffsetParent(element) {\n  // This check is needed to avoid errors in case one of the elements isn't defined for any reason\n   if (!element || !element.parentElement || isIE()) {\n    return document.documentElement;\n  }\n  let el = element.parentElement;\n  while (el && getStyleComputedProperty(el, 'transform') === 'none') {\n    el = el.parentElement;\n  }\n  return el || document.documentElement;\n\n}\n","import getScrollParent from './getScrollParent';\nimport getParentNode from './getParentNode';\nimport getReferenceNode from './getReferenceNode';\nimport findCommonOffsetParent from './findCommonOffsetParent';\nimport getOffsetRectRelativeToArbitraryNode from './getOffsetRectRelativeToArbitraryNode';\nimport getViewportOffsetRectRelativeToArtbitraryNode from './getViewportOffsetRectRelativeToArtbitraryNode';\nimport getWindowSizes from './getWindowSizes';\nimport isFixed from './isFixed';\nimport getFixedPositionOffsetParent from './getFixedPositionOffsetParent';\n\n/**\n * Computed the boundaries limits and return them\n * @method\n * @memberof Popper.Utils\n * @param {HTMLElement} popper\n * @param {HTMLElement} reference\n * @param {number} padding\n * @param {HTMLElement} boundariesElement - Element used to define the boundaries\n * @param {Boolean} fixedPosition - Is in fixed position mode\n * @returns {Object} Coordinates of the boundaries\n */\nexport default function getBoundaries(\n  popper,\n  reference,\n  padding,\n  boundariesElement,\n  fixedPosition = false\n) {\n  // NOTE: 1 DOM access here\n\n  let boundaries = { top: 0, left: 0 };\n  const offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));\n\n  // Handle viewport case\n  if (boundariesElement === 'viewport' ) {\n    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);\n  }\n\n  else {\n    // Handle other cases based on DOM element used as boundaries\n    let boundariesNode;\n    if (boundariesElement === 'scrollParent') {\n      boundariesNode = getScrollParent(getParentNode(reference));\n      if (boundariesNode.nodeName === 'BODY') {\n        boundariesNode = popper.ownerDocument.documentElement;\n      }\n    } else if (boundariesElement === 'window') {\n      boundariesNode = popper.ownerDocument.documentElement;\n    } else {\n      boundariesNode = boundariesElement;\n    }\n\n    const offsets = getOffsetRectRelativeToArbitraryNode(\n      boundariesNode,\n      offsetParent,\n      fixedPosition\n    );\n\n    // In case of HTML, we need a different computation\n    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {\n      const { height, width } = getWindowSizes(popper.ownerDocument);\n      boundaries.top += offsets.top - offsets.marginTop;\n      boundaries.bottom = height + offsets.top;\n      boundaries.left += offsets.left - offsets.marginLeft;\n      boundaries.right = width + offsets.left;\n    } else {\n      // for all the other DOM elements, this one is good\n      boundaries = offsets;\n    }\n  }\n\n  // Add paddings\n  padding = padding || 0;\n  const isPaddingNumber = typeof padding === 'number';\n  boundaries.left += isPaddingNumber ? padding : padding.left || 0; \n  boundaries.top += isPaddingNumber ? padding : padding.top || 0; \n  boundaries.right -= isPaddingNumber ? padding : padding.right || 0; \n  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0; \n\n  return boundaries;\n}\n","import getBoundaries from '../utils/getBoundaries';\n\nfunction getArea({ width, height }) {\n  return width * height;\n}\n\n/**\n * Utility used to transform the `auto` placement to the placement with more\n * available space.\n * @method\n * @memberof Popper.Utils\n * @argument {Object} data - The data object generated by update method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The data object, properly modified\n */\nexport default function computeAutoPlacement(\n  placement,\n  refRect,\n  popper,\n  reference,\n  boundariesElement,\n  padding = 0\n) {\n  if (placement.indexOf('auto') === -1) {\n    return placement;\n  }\n\n  const boundaries = getBoundaries(\n    popper,\n    reference,\n    padding,\n    boundariesElement\n  );\n\n  const rects = {\n    top: {\n      width: boundaries.width,\n      height: refRect.top - boundaries.top,\n    },\n    right: {\n      width: boundaries.right - refRect.right,\n      height: boundaries.height,\n    },\n    bottom: {\n      width: boundaries.width,\n      height: boundaries.bottom - refRect.bottom,\n    },\n    left: {\n      width: refRect.left - boundaries.left,\n      height: boundaries.height,\n    },\n  };\n\n  const sortedAreas = Object.keys(rects)\n    .map(key => ({\n      key,\n      ...rects[key],\n      area: getArea(rects[key]),\n    }))\n    .sort((a, b) => b.area - a.area);\n\n  const filteredAreas = sortedAreas.filter(\n    ({ width, height }) =>\n      width >= popper.clientWidth && height >= popper.clientHeight\n  );\n\n  const computedPlacement = filteredAreas.length > 0\n    ? filteredAreas[0].key\n    : sortedAreas[0].key;\n\n  const variation = placement.split('-')[1];\n\n  return computedPlacement + (variation ? `-${variation}` : '');\n}\n","import isBrowser from './isBrowser';\n\nconst timeoutDuration = (function(){\n  const longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];\n  for (let i = 0; i < longerTimeoutBrowsers.length; i += 1) {\n    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {\n      return 1;\n    }\n  }\n  return 0;\n}());\n\nexport function microtaskDebounce(fn) {\n  let called = false\n  return () => {\n    if (called) {\n      return\n    }\n    called = true\n    window.Promise.resolve().then(() => {\n      called = false\n      fn()\n    })\n  }\n}\n\nexport function taskDebounce(fn) {\n  let scheduled = false;\n  return () => {\n    if (!scheduled) {\n      scheduled = true;\n      setTimeout(() => {\n        scheduled = false;\n        fn();\n      }, timeoutDuration);\n    }\n  };\n}\n\nconst supportsMicroTasks = isBrowser && window.Promise\n\n\n/**\n* Create a debounced version of a method, that's asynchronously deferred\n* but called in the minimum time possible.\n*\n* @method\n* @memberof Popper.Utils\n* @argument {Function} fn\n* @returns {Function}\n*/\nexport default (supportsMicroTasks\n  ? microtaskDebounce\n  : taskDebounce);\n","/**\n * Mimics the `find` method of Array\n * @method\n * @memberof Popper.Utils\n * @argument {Array} arr\n * @argument prop\n * @argument value\n * @returns index or -1\n */\nexport default function find(arr, check) {\n  // use native find if supported\n  if (Array.prototype.find) {\n    return arr.find(check);\n  }\n\n  // use `filter` to obtain the same behavior of `find`\n  return arr.filter(check)[0];\n}\n","import find from './find';\n\n/**\n * Return the index of the matching object\n * @method\n * @memberof Popper.Utils\n * @argument {Array} arr\n * @argument prop\n * @argument value\n * @returns index or -1\n */\nexport default function findIndex(arr, prop, value) {\n  // use native findIndex if supported\n  if (Array.prototype.findIndex) {\n    return arr.findIndex(cur => cur[prop] === value);\n  }\n\n  // use `find` + `indexOf` if `findIndex` isn't supported\n  const match = find(arr, obj => obj[prop] === value);\n  return arr.indexOf(match);\n}\n","import getWindowSizes from './getWindowSizes';\nimport getClientRect from './getClientRect';\n\n/**\n * Get the position of the given element, relative to its offset parent\n * @method\n * @memberof Popper.Utils\n * @param {Element} element\n * @return {Object} position - Coordinates of the element and its `scrollTop`\n */\nexport default function getOffsetRect(element) {\n  let elementRect;\n  if (element.nodeName === 'HTML') {\n    const { width, height } = getWindowSizes(element.ownerDocument);\n    elementRect = {\n      width,\n      height,\n      left: 0,\n      top: 0,\n    };\n  } else {\n    elementRect = {\n      width: element.offsetWidth,\n      height: element.offsetHeight,\n      left: element.offsetLeft,\n      top: element.offsetTop,\n    };\n  }\n\n  // position\n  return getClientRect(elementRect);\n}\n","/**\n * Get the outer sizes of the given element (offset size + margins)\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @returns {Object} object containing width and height properties\n */\nexport default function getOuterSizes(element) {\n  const window = element.ownerDocument.defaultView;\n  const styles = window.getComputedStyle(element);\n  const x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);\n  const y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);\n  const result = {\n    width: element.offsetWidth + y,\n    height: element.offsetHeight + x,\n  };\n  return result;\n}\n","/**\n * Get the opposite placement of the given one\n * @method\n * @memberof Popper.Utils\n * @argument {String} placement\n * @returns {String} flipped placement\n */\nexport default function getOppositePlacement(placement) {\n  const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };\n  return placement.replace(/left|right|bottom|top/g, matched => hash[matched]);\n}\n","import getOuterSizes from './getOuterSizes';\nimport getOppositePlacement from './getOppositePlacement';\n\n/**\n * Get offsets to the popper\n * @method\n * @memberof Popper.Utils\n * @param {Object} position - CSS position the Popper will get applied\n * @param {HTMLElement} popper - the popper element\n * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)\n * @param {String} placement - one of the valid placement options\n * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper\n */\nexport default function getPopperOffsets(popper, referenceOffsets, placement) {\n  placement = placement.split('-')[0];\n\n  // Get popper node sizes\n  const popperRect = getOuterSizes(popper);\n\n  // Add position, width and height to our offsets object\n  const popperOffsets = {\n    width: popperRect.width,\n    height: popperRect.height,\n  };\n\n  // depending by the popper placement we have to compute its offsets slightly differently\n  const isHoriz = ['right', 'left'].indexOf(placement) !== -1;\n  const mainSide = isHoriz ? 'top' : 'left';\n  const secondarySide = isHoriz ? 'left' : 'top';\n  const measurement = isHoriz ? 'height' : 'width';\n  const secondaryMeasurement = !isHoriz ? 'height' : 'width';\n\n  popperOffsets[mainSide] =\n    referenceOffsets[mainSide] +\n    referenceOffsets[measurement] / 2 -\n    popperRect[measurement] / 2;\n  if (placement === secondarySide) {\n    popperOffsets[secondarySide] =\n      referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];\n  } else {\n    popperOffsets[secondarySide] =\n      referenceOffsets[getOppositePlacement(secondarySide)];\n  }\n\n  return popperOffsets;\n}\n","import findCommonOffsetParent from './findCommonOffsetParent';\nimport getOffsetRectRelativeToArbitraryNode from './getOffsetRectRelativeToArbitraryNode';\nimport getFixedPositionOffsetParent from './getFixedPositionOffsetParent';\nimport getReferenceNode from './getReferenceNode';\n\n/**\n * Get offsets to the reference element\n * @method\n * @memberof Popper.Utils\n * @param {Object} state\n * @param {Element} popper - the popper element\n * @param {Element} reference - the reference element (the popper will be relative to this)\n * @param {Element} fixedPosition - is in fixed position mode\n * @returns {Object} An object containing the offsets which will be applied to the popper\n */\nexport default function getReferenceOffsets(state, popper, reference, fixedPosition = null) {\n  const commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));\n  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);\n}\n","/**\n * Get the prefixed supported property name\n * @method\n * @memberof Popper.Utils\n * @argument {String} property (camelCase)\n * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)\n */\nexport default function getSupportedPropertyName(property) {\n  const prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];\n  const upperProp = property.charAt(0).toUpperCase() + property.slice(1);\n\n  for (let i = 0; i < prefixes.length; i++) {\n    const prefix = prefixes[i];\n    const toCheck = prefix ? `${prefix}${upperProp}` : property;\n    if (typeof document.body.style[toCheck] !== 'undefined') {\n      return toCheck;\n    }\n  }\n  return null;\n}\n","/**\n * Check if the given variable is a function\n * @method\n * @memberof Popper.Utils\n * @argument {Any} functionToCheck - variable to check\n * @returns {Boolean} answer to: is a function?\n */\nexport default function isFunction(functionToCheck) {\n  const getType = {};\n  return (\n    functionToCheck &&\n    getType.toString.call(functionToCheck) === '[object Function]'\n  );\n}\n","/**\n * Helper used to know if the given modifier is enabled.\n * @method\n * @memberof Popper.Utils\n * @returns {Boolean}\n */\nexport default function isModifierEnabled(modifiers, modifierName) {\n  return modifiers.some(\n    ({ name, enabled }) => enabled && name === modifierName\n  );\n}\n","import find from './find';\n\n/**\n * Helper used to know if the given modifier depends from another one.<br />\n * It checks if the needed modifier is listed and enabled.\n * @method\n * @memberof Popper.Utils\n * @param {Array} modifiers - list of modifiers\n * @param {String} requestingName - name of requesting modifier\n * @param {String} requestedName - name of requested modifier\n * @returns {Boolean}\n */\nexport default function isModifierRequired(\n  modifiers,\n  requestingName,\n  requestedName\n) {\n  const requesting = find(modifiers, ({ name }) => name === requestingName);\n\n  const isRequired =\n    !!requesting &&\n    modifiers.some(modifier => {\n      return (\n        modifier.name === requestedName &&\n        modifier.enabled &&\n        modifier.order < requesting.order\n      );\n    });\n\n  if (!isRequired) {\n    const requesting = `\\`${requestingName}\\``;\n    const requested = `\\`${requestedName}\\``;\n    console.warn(\n      `${requested} modifier is required by ${requesting} modifier in order to work, be sure to include it before ${requesting}!`\n    );\n  }\n  return isRequired;\n}\n","/**\n * Tells if a given input is a number\n * @method\n * @memberof Popper.Utils\n * @param {*} input to check\n * @return {Boolean}\n */\nexport default function isNumeric(n) {\n  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);\n}\n","/**\n * Get the window associated with the element\n * @argument {Element} element\n * @returns {Window}\n */\nexport default function getWindow(element) {\n  const ownerDocument = element.ownerDocument;\n  return ownerDocument ? ownerDocument.defaultView : window;\n}\n","import getWindow from './getWindow';\n\n/**\n * Remove event listeners used to update the popper position\n * @method\n * @memberof Popper.Utils\n * @private\n */\nexport default function removeEventListeners(reference, state) {\n  // Remove resize event listener on window\n  getWindow(reference).removeEventListener('resize', state.updateBound);\n\n  // Remove scroll event listener on scroll parents\n  state.scrollParents.forEach(target => {\n    target.removeEventListener('scroll', state.updateBound);\n  });\n\n  // Reset state\n  state.updateBound = null;\n  state.scrollParents = [];\n  state.scrollElement = null;\n  state.eventsEnabled = false;\n  return state;\n}\n","import isFunction from './isFunction';\nimport findIndex from './findIndex';\nimport getClientRect from '../utils/getClientRect';\n\n/**\n * Loop trough the list of modifiers and run them in order,\n * each of them will then edit the data object.\n * @method\n * @memberof Popper.Utils\n * @param {dataObject} data\n * @param {Array} modifiers\n * @param {String} ends - Optional modifier name used as stopper\n * @returns {dataObject}\n */\nexport default function runModifiers(modifiers, data, ends) {\n  const modifiersToRun = ends === undefined\n    ? modifiers\n    : modifiers.slice(0, findIndex(modifiers, 'name', ends));\n\n  modifiersToRun.forEach(modifier => {\n    if (modifier['function']) { // eslint-disable-line dot-notation\n      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');\n    }\n    const fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation\n    if (modifier.enabled && isFunction(fn)) {\n      // Add properties to offsets to make them a complete clientRect object\n      // we do this before each modifier to make sure the previous one doesn't\n      // mess with these values\n      data.offsets.popper = getClientRect(data.offsets.popper);\n      data.offsets.reference = getClientRect(data.offsets.reference);\n\n      data = fn(data, modifier);\n    }\n  });\n\n  return data;\n}\n","/**\n * Set the attributes to the given popper\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element - Element to apply the attributes to\n * @argument {Object} styles\n * Object with a list of properties and values which will be applied to the element\n */\nexport default function setAttributes(element, attributes) {\n  Object.keys(attributes).forEach(function(prop) {\n    const value = attributes[prop];\n    if (value !== false) {\n      element.setAttribute(prop, attributes[prop]);\n    } else {\n      element.removeAttribute(prop);\n    }\n  });\n}\n","import isNumeric from './isNumeric';\n\n/**\n * Set the style to the given popper\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element - Element to apply the style to\n * @argument {Object} styles\n * Object with a list of properties and values which will be applied to the element\n */\nexport default function setStyles(element, styles) {\n  Object.keys(styles).forEach(prop => {\n    let unit = '';\n    // add unit if the value is numeric and is one of the following\n    if (\n      ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !==\n        -1 &&\n      isNumeric(styles[prop])\n    ) {\n      unit = 'px';\n    }\n    element.style[prop] = styles[prop] + unit;\n  });\n}\n","import getScrollParent from './getScrollParent';\nimport getWindow from './getWindow';\n\nfunction attachToScrollParents(scrollParent, event, callback, scrollParents) {\n  const isBody = scrollParent.nodeName === 'BODY';\n  const target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;\n  target.addEventListener(event, callback, { passive: true });\n\n  if (!isBody) {\n    attachToScrollParents(\n      getScrollParent(target.parentNode),\n      event,\n      callback,\n      scrollParents\n    );\n  }\n  scrollParents.push(target);\n}\n\n/**\n * Setup needed event listeners used to update the popper position\n * @method\n * @memberof Popper.Utils\n * @private\n */\nexport default function setupEventListeners(\n  reference,\n  options,\n  state,\n  updateBound\n) {\n  // Resize event listener on window\n  state.updateBound = updateBound;\n  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });\n\n  // Scroll event listener on scroll parents\n  const scrollElement = getScrollParent(reference);\n  attachToScrollParents(\n    scrollElement,\n    'scroll',\n    state.updateBound,\n    state.scrollParents\n  );\n  state.scrollElement = scrollElement;\n  state.eventsEnabled = true;\n\n  return state;\n}\n","import computeAutoPlacement from './computeAutoPlacement';\nimport debounce from './debounce';\nimport findIndex from './findIndex';\nimport getBordersSize from './getBordersSize';\nimport getBoundaries from './getBoundaries';\nimport getBoundingClientRect from './getBoundingClientRect';\nimport getClientRect from './getClientRect';\nimport getOffsetParent from './getOffsetParent';\nimport getOffsetRect from './getOffsetRect';\nimport getOffsetRectRelativeToArbitraryNode from './getOffsetRectRelativeToArbitraryNode';\nimport getOuterSizes from './getOuterSizes';\nimport getParentNode from './getParentNode';\nimport getPopperOffsets from './getPopperOffsets';\nimport getReferenceOffsets from './getReferenceOffsets';\nimport getScroll from './getScroll';\nimport getScrollParent from './getScrollParent';\nimport getStyleComputedProperty from './getStyleComputedProperty';\nimport getSupportedPropertyName from './getSupportedPropertyName';\nimport getWindowSizes from './getWindowSizes';\nimport isFixed from './isFixed';\nimport isFunction from './isFunction';\nimport isModifierEnabled from './isModifierEnabled';\nimport isModifierRequired from './isModifierRequired';\nimport isNumeric from './isNumeric';\nimport removeEventListeners from './removeEventListeners';\nimport runModifiers from './runModifiers';\nimport setAttributes from './setAttributes';\nimport setStyles from './setStyles';\nimport setupEventListeners from './setupEventListeners';\n\n/** @namespace Popper.Utils */\nexport {\n  computeAutoPlacement,\n  debounce,\n  findIndex,\n  getBordersSize,\n  getBoundaries,\n  getBoundingClientRect,\n  getClientRect,\n  getOffsetParent,\n  getOffsetRect,\n  getOffsetRectRelativeToArbitraryNode,\n  getOuterSizes,\n  getParentNode,\n  getPopperOffsets,\n  getReferenceOffsets,\n  getScroll,\n  getScrollParent,\n  getStyleComputedProperty,\n  getSupportedPropertyName,\n  getWindowSizes,\n  isFixed,\n  isFunction,\n  isModifierEnabled,\n  isModifierRequired,\n  isNumeric,\n  removeEventListeners,\n  runModifiers,\n  setAttributes,\n  setStyles,\n  setupEventListeners,\n};\n\n// This is here just for backward compatibility with versions lower than v1.10.3\n// you should import the utilities using named exports, if you want them all use:\n// ```\n// import * as PopperUtils from 'popper-utils';\n// ```\n// The default export will be removed in the next major version.\nexport default {\n  computeAutoPlacement,\n  debounce,\n  findIndex,\n  getBordersSize,\n  getBoundaries,\n  getBoundingClientRect,\n  getClientRect,\n  getOffsetParent,\n  getOffsetRect,\n  getOffsetRectRelativeToArbitraryNode,\n  getOuterSizes,\n  getParentNode,\n  getPopperOffsets,\n  getReferenceOffsets,\n  getScroll,\n  getScrollParent,\n  getStyleComputedProperty,\n  getSupportedPropertyName,\n  getWindowSizes,\n  isFixed,\n  isFunction,\n  isModifierEnabled,\n  isModifierRequired,\n  isNumeric,\n  removeEventListeners,\n  runModifiers,\n  setAttributes,\n  setStyles,\n  setupEventListeners,\n};\n"],"names":["getStyleComputedProperty","element","property","nodeType","window","ownerDocument","defaultView","css","getComputedStyle","getParentNode","nodeName","parentNode","host","getScrollParent","document","body","overflow","overflowX","overflowY","test","getReferenceNode","reference","referenceNode","navigator","isIE11","isBrowser","MSInputMethodContext","documentMode","isIE10","userAgent","isIE","version","getOffsetParent","documentElement","noOffsetParent","offsetParent","nextElementSibling","indexOf","isOffsetContainer","firstElementChild","getRoot","node","findCommonOffsetParent","element1","element2","order","compareDocumentPosition","Node","DOCUMENT_POSITION_FOLLOWING","start","end","range","createRange","setStart","setEnd","commonAncestorContainer","contains","element1root","getScroll","side","upperSide","html","scrollingElement","includeScroll","rect","subtract","scrollTop","scrollLeft","modifier","top","bottom","left","right","getBordersSize","styles","axis","sideA","sideB","parseFloat","getSize","computedStyle","Math","max","parseInt","getWindowSizes","getClientRect","offsets","width","height","getBoundingClientRect","e","result","sizes","clientWidth","clientHeight","horizScrollbar","offsetWidth","vertScrollbar","offsetHeight","getOffsetRectRelativeToArbitraryNode","children","parent","fixedPosition","runIsIE","isHTML","childrenRect","parentRect","scrollParent","borderTopWidth","borderLeftWidth","marginTop","marginLeft","getViewportOffsetRectRelativeToArtbitraryNode","excludeScroll","relativeOffset","innerWidth","innerHeight","offset","isFixed","getFixedPositionOffsetParent","parentElement","el","getBoundaries","popper","padding","boundariesElement","boundaries","boundariesNode","isPaddingNumber","getArea","computeAutoPlacement","placement","refRect","rects","sortedAreas","Object","keys","map","key","sort","a","b","area","filteredAreas","filter","computedPlacement","length","variation","split","timeoutDuration","longerTimeoutBrowsers","i","microtaskDebounce","fn","called","Promise","resolve","then","taskDebounce","scheduled","supportsMicroTasks","find","arr","check","Array","prototype","findIndex","prop","value","cur","match","obj","getOffsetRect","elementRect","offsetLeft","offsetTop","getOuterSizes","x","marginBottom","y","marginRight","getOppositePlacement","hash","replace","matched","getPopperOffsets","referenceOffsets","popperRect","popperOffsets","isHoriz","mainSide","secondarySide","measurement","secondaryMeasurement","getReferenceOffsets","state","commonOffsetParent","getSupportedPropertyName","prefixes","upperProp","charAt","toUpperCase","slice","prefix","toCheck","style","isFunction","functionToCheck","getType","toString","call","isModifierEnabled","modifiers","modifierName","some","name","enabled","isModifierRequired","requestingName","requestedName","requesting","isRequired","requested","warn","isNumeric","n","isNaN","isFinite","getWindow","removeEventListeners","removeEventListener","updateBound","scrollParents","forEach","scrollElement","eventsEnabled","runModifiers","data","ends","modifiersToRun","undefined","setAttributes","attributes","setAttribute","removeAttribute","setStyles","unit","attachToScrollParents","event","callback","isBody","target","addEventListener","passive","push","setupEventListeners","options"],"mappings":"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"}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    /*! Select2 4.0.13 | https://github.com/select2/select2/blob/master/LICENSE.md */

!function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;e.define("select2/i18n/gl",[],function(){return{errorLoading:function(){return"Non foi posíbel cargar os resultados."},inputTooLong:function(e){var n=e.input.length-e.maximum;return 1===n?"Elimine un carácter":"Elimine "+n+" caracteres"},inputTooShort:function(e){var n=e.minimum-e.input.length;return 1===n?"Engada un carácter":"Engada "+n+" caracteres"},loadingMore:function(){return"Cargando máis resultados…"},maximumSelected:function(e){return 1===e.maximum?"Só pode seleccionar un elemento":"Só pode seleccionar "+e.maximum+" elementos"},noResults:function(){return"Non se atoparon resultados"},searching:function(){return"Buscando…"},removeAllItems:function(){return"Elimina todos os elementos"}}}),e.define,e.require}();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    export default class Sparkline {
  constructor(element, options = {}) {
    this.element = element;
    this.options = { ...Sparkline.options, ...options };

    init: {
      this.element.innerHTML = "<canvas></canvas>";
      this.canvas = this.element.firstChild;
      this.context = this.canvas.getContext("2d");
      this.ratio = window.devicePixelRatio || 1;

      if (this.options.tooltip) {
        this.canvas.style.position = "relative";
        this.canvas.addEventListener('mousemove', e => {
          const x = e.offsetX || e.layerX || 0;
          const delta = ((this.options.width - this.options.dotRadius * 2) / (this._points.length - 1));
          const index = minmax(0, Math.round((x - this.options.dotRadius) / delta), this._points.length - 1);

          this.canvas.title = this.options.tooltip(this._points[index], index, this._points);
        }, false);
      }
    }
  }

  set points(points) {
    this.draw(points);
  }

  get points() {
    return this._points;
  }

  draw(points = []) {
    this._points = points;

    this.canvas.width = this.options.width * this.ratio;
    this.canvas.style.width = `${this.options.width}px`;

    const pxHeight = this.options.height || this.element.offsetHeight;
    this.canvas.height = pxHeight * this.ratio;
    this.canvas.style.height = `${pxHeight}px`;

    const lineWidth = this.options.lineWidth * this.ratio;
    const offsetX = Math.max(this.options.dotRadius * this.ratio, lineWidth / 2);
    const offsetY = Math.max(this.options.dotRadius * this.ratio, lineWidth / 2);
    const width = this.canvas.width - offsetX * 2;
    const height = this.canvas.height - offsetY * 2;

    const minValue = Math.min.apply(Math, points);
    const maxValue = Math.max.apply(Math, points);
    const bottomValue = this.options.minValue != undefined ? this.options.minValue : Math.min(minValue, this.options.maxMinValue != undefined ? this.options.maxMinValue : minValue);
    const topValue = this.options.maxValue != undefined ? this.options.maxValue : Math.max(maxValue, this.options.minMaxValue != undefined ? this.options.minMaxValue : maxValue);
    let minX = offsetX;
    let maxX = offsetX;

    let x = offsetX;
    const y = index => (topValue === bottomValue)
      ? offsetY + height / 2
      : (offsetY + height) - ((points[index] - bottomValue) / (topValue - bottomValue)) * height;
    const delta = width / (points.length - 1);

    const line = (style, x, y) => {
      if (!style) return;

      this.context.save();
      this.context.strokeStyle = style.color || 'black';
      this.context.lineWidth = (style.width || 1) * this.ratio;
      this.context.globalAlpha = style.alpha || 1;
      this.context.beginPath();
      this.context.moveTo(style.direction != 'right' ? offsetX : x, y);
      this.context.lineTo(style.direction != 'left' ? width + offsetX : x, y);
      this.context.stroke();
      this.context.restore();
    }

    const dot = (color, lineStyle, x, y) => {
      this.context.beginPath();
      this.context.fillStyle = color;
      this.context.arc(x, y, this.options.dotRadius * this.ratio, 0, Math.PI * 2, false);
      this.context.fill();
      line(lineStyle, x, y);
    }

    this.context.save();

    this.context.strokeStyle = this.options.lineColor;
    this.context.fillStyle = this.options.lineColor;
    this.context.lineWidth = lineWidth;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    if (this.options.fillBelow && points.length > 1) {
      this.context.save();
      this.context.beginPath();
      this.context.moveTo(x, y(0));
      for (let i = 1; i < points.length; i++) {
        x += delta;

        minX = points[i] == minValue ? x : minX;
        maxX = points[i] == maxValue ? x : maxX;

        this.context.lineTo(x, y(i));
      }
      this.context.lineTo(width + offsetX, height + offsetY + lineWidth / 2);
      this.context.lineTo(offsetX, height + offsetY + lineWidth / 2);
      this.context.fill();
      if (this.options.fillLighten > 0) {
        this.context.fillStyle = 'white';
        this.context.globalAlpha = this.options.fillLighten;
        this.context.fill();
        this.context.globalAlpha = 1;
      } else if (this.options.fillLighten < 0) {
        this.context.fillStyle = 'black';
        this.context.globalAlpha = -this.options.fillLighten;
        this.context.fill();
      }
      this.context.restore();
    }

    x = offsetX;
    this.context.beginPath();
    this.context.moveTo(x, y(0));
    for (let i = 1; i < points.length; i++) {
      x += delta;
      this.context.lineTo(x, y(i));
    }
    this.context.stroke();

    this.context.restore();

    line(this.options.bottomLine, 0, offsetY);
    line(this.options.topLine, 0, height + offsetY + lineWidth / 2);

    dot(this.options.startColor, this.options.startLine, offsetX + (points.length == 1 ? width / 2 : 0), y(0));
    dot(this.options.endColor, this.options.endLine, offsetX + (points.length == 1 ? width / 2 : width), y(points.length - 1));
    dot(this.options.minColor, this.options.minLine, minX + (points.length == 1 ? width / 2 : 0), y(points.indexOf(minValue)));
    dot(this.options.maxColor, this.options.maxLine, maxX + (points.length == 1 ? width / 2 : 0), y(points.indexOf(maxValue)));
  }

  static init(element, options) {
    return new Sparkline(element, options);
  }

  static draw(element, points, options) {
    const sparkline = new Sparkline(element, options);
    sparkline.draw(points);
    return sparkline;
  }
}

Sparkline.options = {
  width: 100,
  height: null,
  lineColor: "black",
  lineWidth: 1.5,
  startColor: "transparent",
  endColor: "black",
  maxColor: "transparent",
  minColor: "transparent",
  minValue: null,
  maxValue: null,
  minMaxValue: null,
  maxMinValue: null,
  dotRadius: 2.5,
  tooltip: null,
  fillBelow: true,
  fillLighten: 0.5,
  startLine: false,
  endLine: false,
  minLine: false,
  maxLine: false,
  bottomLine: false,
  topLine: false,
  averageLine: false
};

function minmax(a, b, c) {
  return Math.max(a, Math.min(b, c));
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 /*! Summernote v0.8.20 | (c) 2013- Alan Hong and contributors | MIT license */
!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var t=r();for(var o in t)("object"==typeof exports?exports:e)[o]=t[o]}}(self,(function(){return(e=jQuery).extend(e.summernote.lang,{"bg-BG":{font:{bold:"Удебелен",italic:"Наклонен",underline:"Подчертан",clear:"Изчисти стиловете",height:"Височина",name:"Шрифт",strikethrough:"Задраскано",subscript:"Долен индекс",superscript:"Горен индекс",size:"Размер на шрифта"},image:{image:"Изображение",insert:"Постави картинка",resizeFull:"Цял размер",resizeHalf:"Размер на 50%",resizeQuarter:"Размер на 25%",floatLeft:"Подравни в ляво",floatRight:"Подравни в дясно",floatNone:"Без подравняване",shapeRounded:"Форма: Заоблено",shapeCircle:"Форма: Кръг",shapeThumbnail:"Форма: Миниатюра",shapeNone:"Форма: Без",dragImageHere:"Пуснете изображението тук",dropImage:"Пуснете Изображение или Текст",selectFromFiles:"Изберете файл",maximumFileSize:"Максимален размер на файла",maximumFileSizeError:"Достигнат Максимален размер на файла.",url:"URL адрес на изображение",remove:"Премахни изображение",original:"Оригинал"},video:{video:"Видео",videoLink:"Видео линк",insert:"Добави Видео",url:"Видео URL?",providers:"(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)"},link:{link:"Връзка",insert:"Добави връзка",unlink:"Премахни връзка",edit:"Промени",textToDisplay:"Текст за показване",url:"URL адрес",openInNewWindow:"Отвори в нов прозорец"},table:{table:"Таблица",addRowAbove:"Добави ред отгоре",addRowBelow:"Добави ред отдолу",addColLeft:"Добави колона отляво",addColRight:"Добави колона отдясно",delRow:"Изтрии ред",delCol:"Изтрии колона",delTable:"Изтрии таблица"},hr:{insert:"Добави хоризонтална линия"},style:{style:"Стил",p:"Нормален",blockquote:"Цитат",pre:"Код",h1:"Заглавие 1",h2:"Заглавие 2",h3:"Заглавие 3",h4:"Заглавие 4",h5:"Заглавие 5",h6:"Заглавие 6"},lists:{unordered:"Символен списък",ordered:"Цифров списък"},options:{help:"Помощ",fullscreen:"На цял екран",codeview:"Преглед на код"},paragraph:{paragraph:"Параграф",outdent:"Намаляване на отстъпа",indent:"Абзац",left:"Подравняване в ляво",center:"Център",right:"Подравняване в дясно",justify:"Разтягане по ширина"},color:{recent:"Последния избран цвят",more:"Още цветове",background:"Цвят на фона",foreground:"Цвят на шрифта",transparent:"Прозрачен",setTransparent:"Направете прозрачен",reset:"Възстанови",resetToDefault:"Възстанови оригиналните",cpSelect:"Изберете"},shortcut:{shortcuts:"Клавишни комбинации",close:"Затвори",textFormatting:"Форматиране на текста",action:"Действие",paragraphFormatting:"Форматиране на параграф",documentStyle:"Стил на документа",extraKeys:"Екстра бутони"},help:{insertParagraph:"Добави Параграф",undo:"Отмени последната промяна",redo:"Върни последната промяна",tab:"Tab",untab:"Untab",bold:"Удебели",italic:"Приложи наклонен стил",underline:"Приложи подчераване",strikethrough:"Приложи зачеркнат стил",removeFormat:"Изчисти стилове",justifyLeft:"Подравняване в ляво",justifyCenter:"Подравняване в центъра",justifyRight:"Подравняване в дясно",justifyFull:"Двустранно подравняване",insertUnorderedList:"Toggle unordered list",insertOrderedList:"Toggle ordered list",outdent:"Outdent on current paragraph",indent:"Indent on current paragraph",formatPara:"Change current block's format as a paragraph(P tag)",formatH1:"Change current block's format as H1",formatH2:"Change current block's format as H2",formatH3:"Change current block's format as H3",formatH4:"Change current block's format as H4",formatH5:"Change current block's format as H5",formatH6:"Change current block's format as H6",insertHorizontalRule:"Вмъкни хоризонтално правило","linkDialog.show":"Show Link Dialog"},history:{undo:"Назад",redo:"Напред"},specialChar:{specialChar:"SPECIAL CHARACTERS",select:"Избери Специални символи"}}}),{};var e}));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           /*! Summernote v0.8.20 | (c) 2013- Alan Hong and contributors | MIT license */
!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var a=r();for(var i in a)("object"==typeof exports?exports:e)[i]=a[i]}}(self,(function(){return(e=jQuery).extend(e.summernote.lang,{"fr-FR":{font:{bold:"Gras",italic:"Italique",underline:"Souligné",clear:"Effacer la mise en forme",height:"Interligne",name:"Famille de police",strikethrough:"Barré",superscript:"Exposant",subscript:"Indice",size:"Taille de police"},image:{image:"Image",insert:"Insérer une image",resizeFull:"Taille originale",resizeHalf:"Redimensionner à 50 %",resizeQuarter:"Redimensionner à 25 %",floatLeft:"Aligné à gauche",floatRight:"Aligné à droite",floatNone:"Pas d'alignement",shapeRounded:"Forme: Rectangle arrondi",shapeCircle:"Forme: Cercle",shapeThumbnail:"Forme: Vignette",shapeNone:"Forme: Aucune",dragImageHere:"Faites glisser une image ou un texte dans ce cadre",dropImage:"Lachez l'image ou le texte",selectFromFiles:"Choisir un fichier",maximumFileSize:"Taille de fichier maximale",maximumFileSizeError:"Taille maximale du fichier dépassée",url:"URL de l'image",remove:"Supprimer l'image",original:"Original"},video:{video:"Vidéo",videoLink:"Lien vidéo",insert:"Insérer une vidéo",url:"URL de la vidéo",providers:"(YouTube, Google Drive, Vimeo, Vine, Instagram, DailyMotion or Youku)"},link:{link:"Lien",insert:"Insérer un lien",unlink:"Supprimer un lien",edit:"Modifier",textToDisplay:"Texte à afficher",url:"URL du lien",openInNewWindow:"Ouvrir dans une nouvelle fenêtre",useProtocol:"Utiliser le protocole par défaut"},table:{table:"Tableau",addRowAbove:"Ajouter une ligne au-dessus",addRowBelow:"Ajouter une ligne en dessous",addColLeft:"Ajouter une colonne à gauche",addColRight:"Ajouter une colonne à droite",delRow:"Supprimer la ligne",delCol:"Supprimer la colonne",delTable:"Supprimer le tableau"},hr:{insert:"Insérer une ligne horizontale"},style:{style:"Style",p:"Normal",blockquote:"Citation",pre:"Code source",h1:"Titre 1",h2:"Titre 2",h3:"Titre 3",h4:"Titre 4",h5:"Titre 5",h6:"Titre 6"},lists:{unordered:"Liste à puces",ordered:"Liste numérotée"},options:{help:"Aide",fullscreen:"Plein écran",codeview:"Afficher le code HTML"},paragraph:{paragraph:"Paragraphe",outdent:"Diminuer le retrait",indent:"Augmenter le retrait",left:"Aligner à gauche",center:"Centrer",right:"Aligner à droite",justify:"Justifier"},color:{recent:"Dernière couleur sélectionnée",more:"Plus de couleurs",background:"Couleur de fond",foreground:"Couleur de police",transparent:"Transparent",setTransparent:"Définir la transparence",reset:"Restaurer",resetToDefault:"Restaurer la couleur par défaut"},shortcut:{shortcuts:"Raccourcis",close:"Fermer",textFormatting:"Mise en forme du texte",action:"Action",paragraphFormatting:"Mise en forme des paragraphes",documentStyle:"Style du document",extraKeys:"Touches supplémentaires"},help:{insertParagraph:"Insérer paragraphe",undo:"Défaire la dernière commande",redo:"Refaire la dernière commande",tab:"Tabulation",untab:"Tabulation arrière",bold:"Mettre en caractère gras",italic:"Mettre en italique",underline:"Mettre en souligné",strikethrough:"Mettre en texte barré",removeFormat:"Nettoyer les styles",justifyLeft:"Aligner à gauche",justifyCenter:"Centrer",justifyRight:"Aligner à droite",justifyFull:"Justifier à gauche et à droite",insertUnorderedList:"Basculer liste à puces",insertOrderedList:"Basculer liste ordonnée",outdent:"Diminuer le retrait du paragraphe",indent:"Augmenter le retrait du paragraphe",formatPara:"Changer le paragraphe en cours en normal (P)",formatH1:"Changer le paragraphe en cours en entête H1",formatH2:"Changer le paragraphe en cours en entête H2",formatH3:"Changer le paragraphe en cours en entête H3",formatH4:"Changer le paragraphe en cours en entête H4",formatH5:"Changer le paragraphe en cours en entête H5",formatH6:"Changer le paragraphe en cours en entête H6",insertHorizontalRule:"Insérer séparation horizontale","linkDialog.show":"Afficher fenêtre d'hyperlien"},history:{undo:"Annuler la dernière action",redo:"Restaurer la dernière action annulée"},specialChar:{specialChar:"Caractères spéciaux",select:"Choisir des caractères spéciaux"}}}),{};var e}));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        /*! Summernote v0.8.20 | (c) 2013- Alan Hong and contributors | MIT license */
!function(e,i){if("object"==typeof exports&&"object"==typeof module)module.exports=i();else if("function"==typeof define&&define.amd)define([],i);else{var n=i();for(var t in n)("object"==typeof exports?exports:e)[t]=n[t]}}(self,(function(){return(e=jQuery).extend(e.summernote.lang,{"nl-NL":{font:{bold:"Vet",italic:"Cursief",underline:"Onderstrepen",clear:"Stijl verwijderen",height:"Regelhoogte",name:"Lettertype",strikethrough:"Doorhalen",subscript:"Subscript",superscript:"Superscript",size:"Tekstgrootte"},image:{image:"Afbeelding",insert:"Afbeelding invoegen",resizeFull:"Volledige breedte",resizeHalf:"Halve breedte",resizeQuarter:"Kwart breedte",floatLeft:"Links uitlijnen",floatRight:"Rechts uitlijnen",floatNone:"Geen uitlijning",shapeRounded:"Shape: Rounded",shapeCircle:"Shape: Circle",shapeThumbnail:"Shape: Thumbnail",shapeNone:"Shape: None",dragImageHere:"Sleep hier een afbeelding naar toe",dropImage:"Drop image or Text",selectFromFiles:"Selecteer een bestand",maximumFileSize:"Maximum file size",maximumFileSizeError:"Maximum file size exceeded.",url:"URL van de afbeelding",remove:"Verwijder afbeelding",original:"Original"},video:{video:"Video",videoLink:"Video link",insert:"Video invoegen",url:"URL van de video",providers:"(YouTube, Vimeo, Vine, Instagram, DailyMotion of Youku)"},link:{link:"Link",insert:"Link invoegen",unlink:"Link verwijderen",edit:"Wijzigen",textToDisplay:"Tekst van link",url:"Naar welke URL moet deze link verwijzen?",openInNewWindow:"Open in nieuw venster"},table:{table:"Tabel",addRowAbove:"Rij hierboven invoegen",addRowBelow:"Rij hieronder invoegen",addColLeft:"Kolom links toevoegen",addColRight:"Kolom rechts toevoegen",delRow:"Verwijder rij",delCol:"Verwijder kolom",delTable:"Verwijder tabel"},hr:{insert:"Horizontale lijn invoegen"},style:{style:"Stijl",p:"Normaal",blockquote:"Quote",pre:"Code",h1:"Kop 1",h2:"Kop 2",h3:"Kop 3",h4:"Kop 4",h5:"Kop 5",h6:"Kop 6"},lists:{unordered:"Ongeordende lijst",ordered:"Geordende lijst"},options:{help:"Help",fullscreen:"Volledig scherm",codeview:"Bekijk Code"},paragraph:{paragraph:"Paragraaf",outdent:"Inspringen verkleinen",indent:"Inspringen vergroten",left:"Links uitlijnen",center:"Centreren",right:"Rechts uitlijnen",justify:"Uitvullen"},color:{recent:"Recente kleur",more:"Meer kleuren",background:"Achtergrond kleur",foreground:"Tekst kleur",transparent:"Transparant",setTransparent:"Transparant",reset:"Standaard",resetToDefault:"Standaard kleur"},shortcut:{shortcuts:"Toetsencombinaties",close:"sluiten",textFormatting:"Tekststijlen",action:"Acties",paragraphFormatting:"Paragraafstijlen",documentStyle:"Documentstijlen",extraKeys:"Extra keys"},help:{insertParagraph:"Alinea invoegen",undo:"Laatste handeling ongedaan maken",redo:"Laatste handeling opnieuw uitvoeren",tab:"Tab",untab:"Herstel tab",bold:"Stel stijl in als vet",italic:"Stel stijl in als cursief",underline:"Stel stijl in als onderstreept",strikethrough:"Stel stijl in als doorgestreept",removeFormat:"Verwijder stijl",justifyLeft:"Lijn links uit",justifyCenter:"Set center align",justifyRight:"Lijn rechts uit",justifyFull:"Lijn uit op volledige breedte",insertUnorderedList:"Zet ongeordende lijstweergave aan",insertOrderedList:"Zet geordende lijstweergave aan",outdent:"Verwijder inspringing huidige alinea",indent:"Inspringen op huidige alinea",formatPara:"Wijzig formattering huidig blok in alinea(P tag)",formatH1:"Formatteer huidig blok als H1",formatH2:"Formatteer huidig blok als H2",formatH3:"Formatteer huidig blok als H3",formatH4:"Formatteer huidig blok als H4",formatH5:"Formatteer huidig blok als H5",formatH6:"Formatteer huidig blok als H6",insertHorizontalRule:"Invoegen horizontale lijn","linkDialog.show":"Toon Link Dialoogvenster"},history:{undo:"Ongedaan maken",redo:"Opnieuw doorvoeren"},specialChar:{specialChar:"SPECIALE TEKENS",select:"Selecteer Speciale Tekens"}}}),{};var e}));                                                                                                                                              /*!
 * 
 * Super simple WYSIWYG editor v0.8.20
 * https://summernote.org
 *
 *
 * Copyright 2013- Alan Hong and contributors
 * Summernote may be freely distributed under the MIT license.
 *
 * Date: 2021-10-14T21:15Z
 *
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
(function ($) {
  $.extend($.summernote.lang, {
    'uk-UA': {
      font: {
        bold: 'Напівжирний',
        italic: 'Курсив',
        underline: 'Підкреслений',
        clear: 'Прибрати стилі шрифту',
        height: 'Висота лінії',
        name: 'Шрифт',
        strikethrough: 'Закреслений',
        subscript: 'Нижній індекс',
        superscript: 'Верхній індекс',
        size: 'Розмір шрифту'
      },
      image: {
        image: 'Картинка',
        insert: 'Вставити картинку',
        resizeFull: 'Відновити розмір',
        resizeHalf: 'Зменшити до 50%',
        resizeQuarter: 'Зменшити до 25%',
        floatLeft: 'Розташувати ліворуч',
        floatRight: 'Розташувати праворуч',
        floatNone: 'Початкове розташування',
        shapeRounded: 'Форма: Заокруглена',
        shapeCircle: 'Форма: Коло',
        shapeThumbnail: 'Форма: Мініатюра',
        shapeNone: 'Форма: Немає',
        dragImageHere: 'Перетягніть сюди картинку',
        dropImage: 'Перетягніть картинку',
        selectFromFiles: 'Вибрати з файлів',
        maximumFileSize: 'Maximum file size',
        maximumFileSizeError: 'Maximum file size exceeded.',
        url: 'URL картинки',
        remove: 'Видалити картинку',
        original: 'Original'
      },
      video: {
        video: 'Відео',
        videoLink: 'Посилання на відео',
        insert: 'Вставити відео',
        url: 'URL відео',
        providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion чи Youku)'
      },
      link: {
        link: 'Посилання',
        insert: 'Вставити посилання',
        unlink: 'Прибрати посилання',
        edit: 'Редагувати',
        textToDisplay: 'Текст, що відображається',
        url: 'URL для переходу',
        openInNewWindow: 'Відкривати у новому вікні',
        useProtocol: 'Використовувати протокол за замовчуванням'
      },
      table: {
        table: 'Таблиця',
        addRowAbove: 'Add row above',
        addRowBelow: 'Add row below',
        addColLeft: 'Add column left',
        addColRight: 'Add column right',
        delRow: 'Delete row',
        delCol: 'Delete column',
        delTable: 'Delete table'
      },
      hr: {
        insert: 'Вставити горизонтальну лінію'
      },
      style: {
        style: 'Стиль',
        p: 'Нормальний',
        blockquote: 'Цитата',
        pre: 'Код',
        h1: 'Заголовок 1',
        h2: 'Заголовок 2',
        h3: 'Заголовок 3',
        h4: 'Заголовок 4',
        h5: 'Заголовок 5',
        h6: 'Заголовок 6'
      },
      lists: {
        unordered: 'Маркований список',
        ordered: 'Нумерований список'
      },
      options: {
        help: 'Допомога',
        fullscreen: 'На весь екран',
        codeview: 'Початковий код'
      },
      paragraph: {
        paragraph: 'Параграф',
        outdent: 'Зменшити відступ',
        indent: 'Збільшити відступ',
        left: 'Вирівняти по лівому краю',
        center: 'Вирівняти по центру',
        right: 'Вирівняти по правому краю',
        justify: 'Розтягнути по ширині'
      },
      color: {
        recent: 'Останній колір',
        more: 'Ще кольори',
        background: 'Колір фону',
        foreground: 'Колір шрифту',
        transparent: 'Прозорий',
        setTransparent: 'Зробити прозорим',
        reset: 'Відновити',
        resetToDefault: 'Відновити початкові'
      },
      shortcut: {
        shortcuts: 'Комбінації клавіш',
        close: 'Закрити',
        textFormatting: 'Форматування тексту',
        action: 'Дія',
        paragraphFormatting: 'Форматування параграфу',
        documentStyle: 'Стиль документу',
        extraKeys: 'Extra keys'
      },
      help: {
        'insertParagraph': 'Insert Paragraph',
        'undo': 'Undoes the last command',
        'redo': 'Redoes the last command',
        'tab': 'Tab',
        'untab': 'Untab',
        'bold': 'Set a bold style',
        'italic': 'Set a italic style',
        'underline': 'Set a underline style',
        'strikethrough': 'Set a strikethrough style',
        'removeFormat': 'Clean a style',
        'justifyLeft': 'Set left align',
        'justifyCenter': 'Set center align',
        'justifyRight': 'Set right align',
        'justifyFull': 'Set full align',
        'insertUnorderedList': 'Toggle unordered list',
        'insertOrderedList': 'Toggle ordered list',
        'outdent': 'Outdent on current paragraph',
        'indent': 'Indent on current paragraph',
        'formatPara': 'Change current block\'s format as a paragraph(P tag)',
        'formatH1': 'Change current block\'s format as H1',
        'formatH2': 'Change current block\'s format as H2',
        'formatH3': 'Change current block\'s format as H3',
        'formatH4': 'Change current block\'s format as H4',
        'formatH5': 'Change current block\'s format as H5',
        'formatH6': 'Change current block\'s format as H6',
        'insertHorizontalRule': 'Insert horizontal rule',
        'linkDialog.show': 'Show Link Dialog'
      },
      history: {
        undo: 'Відмінити',
        redo: 'Повторити'
      },
      specialChar: {
        specialChar: 'SPECIAL CHARACTERS',
        select: 'Select Special characters'
      }
    }
  });
})(jQuery);
/******/ 	return __webpack_exports__;
/******/ })()
;
});