const toHinduNumeral = (num: number): string => 
    num.toString().replace(/\d/g, d => '०१२३४५६७८९'[parseInt(d)]);

export { toHinduNumeral };