import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const defaultStyle = { ...defaultArticleState };

	const [articleStyleState, setArticleStyle] =
		useState<ArticleStateType>(defaultArticleState);

	const handleArticleStyleChange = (newStyle: Partial<ArticleStateType>) => {
		setArticleStyle((prevState) => ({
			...prevState,
			...newStyle,
		}));
	};

	const handleArticleStyleReset = (): typeof defaultArticleState => {
		setArticleStyle(defaultStyle);
		return defaultStyle;
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyleState.fontFamilyOption.value,
					'--font-size': articleStyleState.fontSizeOption.value,
					'--font-color': articleStyleState.fontColor.value,
					'--container-width': articleStyleState.contentWidth.value,
					'--bg-color': articleStyleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentStyle={articleStyleState}
				submitArticleStyle={handleArticleStyleChange}
				resetArticleStyle={handleArticleStyleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
