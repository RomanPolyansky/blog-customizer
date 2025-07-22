import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import styles from './App.module.scss';

export const App = () => {
	const [articleStyleState, setArticleStyle] =
		useState<ArticleStateType>(defaultArticleState);

	const changeStyle = (newStyle: Partial<ArticleStateType>) => {
		setArticleStyle((prevState) => ({
			...prevState,
			...newStyle,
		}));
	};

	return (
		<main
			className={styles.main}
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
				changeStyle={changeStyle}
				initialStyle={articleStyleState}
			/>
			<Article />
		</main>
	);
};
