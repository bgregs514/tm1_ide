/*
* A TM1 rule syntax highlighter
* @exports js/langRule
*/ 

module.exports = {
	// Set defaultToken to invalid to see what you do not tokenize yet
	// defaultToken: 'invalid',
	ignoreCase: true,
	defaultToken: "invalid",
	keywords: [
		'attrn', 'attrs', 'cubeattrn', 'cubeattrs', 'dimensionattrn', 'dimensionattrs', 'elementattrn', 'elementattrs',
		'consolidatedavg', 'consolidatechildren', 'consolidatedcount', 'consolidatedcountunique', 'consolidatedmax', 'consolidatedmin',
		'cellvalues', 'cellvaluen', 'db', 'isleaf', 'isundefinedcellvalue', 'undef', 'undefinedcellvalue', 'undefvals',
		'date', 'dates', 'day', 'dayno', 'month', 'now', 'time', 'timst', 'timvl', 'today', 'year',
		'dimix', 'dimnm', 'dimsiz', 'dnext', 'dnlev', 'dtype', 'tabdim',
		'elcomp', 'elcompn', 'elementcomponent', 'elementcomponentcount', 'elementcount', 'elementfirst', 'elementindex',
		'elementisancestor', 'elementiscomponent', 'elementisparent', 'elementlevel', 'elementname', 'elementnext', 'elementparent',
		'elementparentcount', 'elementtype', 'elementweight', 'elisanc', 'eliscomp', 'elispar', 'ellev', 'elpar', 'elparn',
		'elweight', 'levelcount', 'fv', 'paymt', 'pv', 'hierarchy', 'hierarchycount', 'hierarchyindex', 'hierarchyn',
		'continue', 'if', 'stet', 'abs', 'acos', 'asin', 'atan', 'cos', 'exp', 'int', 'isund', 'ln', 'log', 'max', 'min',
		'mod', 'rand', 'round', 'roundp', 'sign', 'sin', 'sqrt', 'tan', 'capit', 'char', 'code', 'delet', 'fill', 'insrt',
		'long', 'lower', 'number', 'scan', 'str', 'subst', 'trim', 'upper', 'feeders', 'feedstrings', 'skipcheck'
	],
	
	typeKeywords: [
		'N:', 'S:', 'C:'
	],
	
	comment: [
		'#'
	],
	
	operators: [
		'=', '>', '<', '~', '<=', '>=', '<>', '@=',
		'+', '-', '*', '/', '\\', '&', '|', '^', '%'
	],
	
	// we include these common regular expressions
	symbols:  /[=><!~:&|+\-*\/\^%#@]+/,
	
	// C# style strings
	escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
	
	// The main tokenizer for our languages
	tokenizer: {
		root: [
		// identifiers and keywords
		[/[a-z]:/, { cases: { '@typeKeywords': 'keyword',
								'@default' : 'comment' } } ],
		[/[a-z_$][\w$]*/, { cases: { '@keywords': 'keyword',
										'@default': 'identifier' } }],
		// whitespace
		{ include: '@whitespace' },

		// comments
		[/^#.*/, 'comment'],
	
		// delimiters and operators
		[/[{}()\[\]]/, '@brackets'],
		[/[<>](?!@symbols)/, '@brackets'],
		[/@symbols/, { cases: { '@operators': 'operator',
								'@default'  : '' } } ],
	
		// numbers
		[/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
		[/0[xX][0-9a-fA-F]+/, 'number.hex'],
		[/\d+/, 'number'],
	
		// delimiter: after number because of .\d floats
		[/[;,]/, 'delimiter'],

				// strings
		[/'([^'\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
		[/'/,  { token: 'string.quote', bracket: '@open', next: '@string' } ]
		],
		string: [
		[/[^\\']+/,  'string'],
		[/@escapes/, 'string.escape'],
		[/\\./,      'string.escape.invalid'],
		[/'/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
		],
		whitespace: [
		[/[ \t\r\n]+/, 'white'],
		]
	}
};