/*
* This includes all of the TM1 rule function definitions
* Optional parameters are enclosed by <>
*/
module.exports = function(monaco) {
	return [
		{
			label: 'ATTRN',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ATTRN(${1:dimension}, ${2:element}, ${3:attribute})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Element Attribute Numeric",
			documentation: "Returns a numeric attribute for a specified element of a dimension"
		},
		{
			label: 'ATTRS',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ATTRS(${1:dimension}, ${2:element}, ${3:attribute})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Element Attribute String",
			documentation: "Returns a string attribute for a specified element of a dimension"
		},
		{
			label: 'CubeATTRN',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'CubeATTRN(${1:cube}, ${2:attribute})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Cube Attribute Numeric",
			documentation: "Returns a numeric attribute for a specified cube"
		},
		{
			label: 'CubeATTRS',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'CubeATTRS(${1:cube}, ${2:attribute})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Cube Attribute String",
			documentation: "Returns a string attribute for a specified cube"
		},
		{
			label: 'DimensionATTRN',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DimensionATTRN(${1:dimension}, ${2:attribute})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Dimension Attribute Numeric",
			documentation: "Returns a numeric attribute for a specified dimension"
		},
		{
			label: 'DimensionATTRS',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DimensionATTRS(${1:dimension}, ${2:attribute})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Dimension Attribute String",
			documentation: "Returns a string attribute for a specified dimension"
		},
		{
			label: 'ElementATTRN',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ElementATTRN(${1:dimension}, ${2:hier}, ${3:element}, ${4:attribute})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Hierarchy Element Attribute Numeric",
			documentation: "Returns a numeric attribute for a specified element of a dimension hierarchy"
		},
		{
			label: 'ElementATTRS',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ElementATTRS(${1:dimension}, ${2:hier}, ${3:element}, ${4:attribute})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Hierarchy Element Attribute String",
			documentation: "Returns a string attribute for a specified element of a dimension hierarchy"
		},
		{
			label: 'ConsolidatedAvg',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ConsolidatedAvg(${1:flag-value}, ${2:cube}, ${3:elements...})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Consolidated Average",
			documentation: "Calculates the average value in a consolidation and returns that single value"
		},
		{
			label: 'ConsolidateChildren',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ConsolidateChildren(${1:dimensions...})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Consolidate Children",
			documentation: "Forces consolidated values to be calculated by summing immediate children along a specified dimension"
		},
		{
			label: 'ConsolidatedCount',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ConsolidatedCount(${1:flag-value}, ${2:cube}, ${3:elements...})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Consolidated Count",
			documentation: "Returns the number of values in a consolidation"
		},
		{
			label: 'ConsolidatedCountUnique',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ConsolidatedCountUnique(${1:flag-value}, ${2:unique-along-dimension-name}, ${2:cube}, ${3:elements...})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Consolidated Count Unique",
			documentation: "Counts the number of unique elements for which data points actually exist for the specified consolidation"
		},
		{
			label: 'ConsolidatedMax',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ConsolidatedMax(${1:flag-value}, ${2:cube}, ${3:elements...})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Consolidated Max",
			documentation: "Calculates the maximum value in a consolidation and returns that single value"
		},
		{
			label: 'ConsolidatedMin',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ConsolidatedMin(${1:flag-value}, ${2:cube}, ${3:elements...})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Consolidated Min",
			documentation: "Calculates the minimum value in a consolidation and returns that single value"
		},
		{
			label: 'CellValueN',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'CellValueN(${1:cube}, ${2:elements...})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Cell Value Numeric",
			documentation: "Returns the numeric value of the specified element(s) in a cube"
		},
		{
			label: 'CellValueS',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'CellValueS(${1:cube}, ${2:elements...})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Cell Value String",
			documentation: "Returns the string value of the specified element(s) in a cube"
		},
		{
			label: 'DB',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DB(${1:cube}, ${2:elements...})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Retrieve Cell Value",
			documentation: "Returns a value from a cube"
		},
		{
			label: 'ISLEAF',
			kind: monaco.languages.CompletionItemKind.EnumMember,
			insertText: 'ISLEAF=1',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Check if Leaf",
			documentation: "Returns 1 if a specified cell is a leaf cell (identified solely by leaf/simple elements)"
		},
		{
			label: 'ISUNDEFINEDCELLVALUE',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ISUNDEFINEDCELLVALUE(${1:testValue}, ${2:<cube>})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Check if UNDEF",
			documentation: "Compares the passed value to the default numeric cube value, which is influenced by the presence of the UNDEFVALS declaration in that cube's rule"
		},
		{
			label: 'UNDEF',
			kind: monaco.languages.CompletionItemKind.EnumMember,
			insertText: 'UNDEF',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "UNDEF Value",
			documentation: "Returns the undefined value"
		},
		{
			label: 'UNDEFINEDCELLVALUE',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'UNDEFINEDCELLVALUE(${1:<cube>})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "UNDEF Cell Value",
			documentation: "Returns the default numeric cube value, which is influenced by the presence of the UNDEFVALS declaration in that cube's rule"
		},
		{
			label: 'UNDEFVALS',
			kind: monaco.languages.CompletionItemKind.Keyword,
			insertText: 'UNDEFVALS',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "UNDEF Identifier",
			documentation: "Changes the default value for the cube from zero to a special undefined value"
		},
		{
			label: 'DATE',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DATE(${1:serialNumber}, ${2:returnFourDigitYear})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Serial Date to String",
			documentation: "Returns the date string in yy-mm-dd or yyyy-mm-dd format for a given serial number"
		},
		{
			label: 'DATES',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DATES(${1:year}, ${2:month}, ${3:day})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Date to String",
			documentation: "Returns a date string, in the form 'yy-mm-dd' or 'yyyy-mm-dd', corresponding to a given year, month, and day"
		},
		{
			label: 'DAY',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DAY(${1:dateString})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Date to Day",
			documentation: "Returns a numeric value for the day in a given date string"
		},
		{
			label: 'DAYNO',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DAYNO(${1:dateString})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Date to Serial Day",
			documentation: "Returns the serial date number corresponding to a given date string"
		},
		{
			label: 'MONTH',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'MONTH(${1:dateString})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Date to Month",
			documentation: "Returns a numeric value for the month in a given date string"
		},
		{
			label: 'NOW',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'NOW',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Return Current Date",
			documentation: "Returns the current date/time value in serial number format"
		},
		{
			label: 'TIME',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'TIME',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Return Current Time",
			documentation: "Returns a string, in HH:MM format, representing the system time on the TM1 server"
		},
		{
			label: 'TIMEST',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'TIMEST(${1:dateTime}, ${2:format}, ${3:<extendedYears>})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Serial Date to Date",
			documentation: "Returns a formatted date/time string"
		},
		{
			label: 'TIMVAL',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'TIMVAL(${1:dateTime}, ${2:type}, ${3:<extendedYears>})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Serial Date to Date Component",
			documentation: "Returns the numeric value of a component (year, month, etc.) of a date/time value"
		},
		{
			label: 'TODAY',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'TODAY(${1:<fourDigitYear>})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Return Current Formatted Date",
			documentation: "Returns the current date in yy-mm-dd format"
		},
		{
			label: 'YEAR',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'YEAR(${1:date})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Return Year",
			documentation: "Returns a numeric value for the year in a given date string"
		},
		/* Dimension Information Rules Functions */
		{
			label: 'DIMIX',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DIMIX(${1:dimension}, ${2:element})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Dimension Index",
			documentation: "Returns the index number of an element within a dimension"
		},
		{
			label: 'DIMNM',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DIMNM(${1:dimension}, ${2:index})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Dimension Name",
			documentation: "Returns the element of a dimension that corresponds to the index argument"
		},
		{
			label: 'DIMSIZ',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DIMSIZ(${1:dimension})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Dimension Size",
			documentation: "Returns the number of elements within a specified dimension"
		},
		{
			label: 'DNEXT',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DNEXT(${1:dimension}, ${2:element})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Dimension Next Element",
			documentation: "Returns the element name that follows the element specified as an argument to the function"
		},
		{
			label: 'DNLEV',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DNLEV(${1:dimension})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Dimension Number Levels",
			documentation: "Returns the number levels in a dimension"
		},
		{
			label: 'DTYPE',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'DTYPE(${1:dimension}, ${2:element})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Dimension Element Type",
			documentation: "Returns information about the element type of a specified element"
		},
		{
			label: 'TABDIM',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'TABDIM(${1:cube}, ${2:index})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Dimension Name",
			documentation: "Returns the dimension name that corresponds to the index argument"
		},
		/* Element Information Rules Functions */
		{
			label: 'ELCOMP',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ELCOMP(${1:dimension}, ${2:element}, ${3:position})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Child of Component",
			documentation: "Returns the name of a child of a consolidated element in a specified dimension"
		},
		{
			label: 'ELCOMPN',
			kind: monaco.languages.CompletionItemKind.Function,
			insertText: 'ELCOMPN(${1:dimension}, ${2:element})',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Number of Components",
			documentation: "Returns the number of components in a specified element"
		},

		/* Templates */
		{
			label: '.stdTemplate',
			kind: monaco.languages.CompletionItemKind.Event,
			insertText: ['skipcheck;', '',
				'...', '',
				'feeders;', '',
				'...'].join('\n'),
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			detail: "Standard Rule Template",
			documentation: "Implements a standard rule template"
		}
	]
}