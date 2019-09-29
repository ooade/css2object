import Css2Object from '../build';
import fs from 'fs';
import path from 'path';

describe('CSS2Object', () => {
	const cssData = fs.readFileSync(path.resolve('__test__', 'codemirror.css'), {
		encoding: 'utf-8'
	});

	it('renders correctly', () => {
		const css2json = new Css2Object(cssData);
		css2json.read();
		expect(css2json.cssRecord).toMatchSnapshot();
	});

	it('recognizes tags without a class or id', () => {
		const css2json = new Css2Object(cssData);
		css2json.read();
		expect(css2json.cssRecord['body']).toEqual({
			color: '#000',
			'font-family': 'tahoma, arial, sans-serif',
			margin: '0',
			padding: '3em 6em'
		});
	});

	it('recognizes tags whose parent has an id', () => {
		const css2json = new Css2Object(cssData);
		css2json.read();
		expect(css2json.cssRecord['#navigation a']).toEqual({
			'font-weight': 'bold',
			'text-decoration': 'none !important'
		});
	});

	it('could call a static method to return a JSON string', () => {
		const json = Css2Object.toJSON(cssData);
		const parsedJson = JSON.parse(json);
		expect(parsedJson).toHaveProperty('body');
		expect(parsedJson).toHaveProperty('h1:before');
		expect(parsedJson).toHaveProperty('h2');
	});
});
