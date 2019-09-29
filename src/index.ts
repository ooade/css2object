export default class Css2Object {
	cssRecord: {} = {};

	constructor(private cssData: string) {}

	static toJSON(cssData: string): string {
		const cssReader = new Css2Object(cssData);
		cssReader.read();
		return JSON.stringify(cssReader.cssRecord);
	}

	private stripAllLineSpacesAndComments(cssData: string): string {
		return cssData
			.split(/\n+/)
			.join('')
			.split(/\/\*.*?\*\//)
			.join('');
	}

	private identifierProperties(propertiesString: string): {} {
		propertiesString = propertiesString.trim();

		// To split the properties properly, we need to take off the last semi-colon if it exists
		if (propertiesString.slice(-1) === ';') {
			propertiesString = propertiesString.slice(0, -1);
		}
		return propertiesString
			.split(';')
			.reduce((accumulator: Record<string, {}>, currentValue) => {
				const [prop, value] = currentValue.trim().split(':');
				accumulator[prop] = value.trim();
				return accumulator;
			}, {});
	}

	private selectorsArray(selectorsString: string): string[] {
		selectorsString = selectorsString.trim();
		return selectorsString.split(',');
	}

	read(): void {
		const sanitizedCssData = this.stripAllLineSpacesAndComments(this.cssData);
		const lines = sanitizedCssData.split('}');

		for (let line of lines) {
			const [selectorsString, propertiesString] = line.trim().split('{');

			const selectorsArray: ReadonlyArray<string> = this.selectorsArray(
				selectorsString
			);
			const selectorsWithProperties = selectorsArray.reduce(
				(accumulator: Record<string, {}>, currentValue) => {
					if (propertiesString) {
						accumulator[currentValue] = this.identifierProperties(
							propertiesString
						);
					}
					return accumulator;
				},
				{}
			);
			this.cssRecord = { ...this.cssRecord, ...selectorsWithProperties };
		}
	}
}
