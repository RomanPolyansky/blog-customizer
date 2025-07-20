import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	currentStyle: typeof defaultArticleState;
	submitArticleStyle: (newStyle: Partial<typeof defaultArticleState>) => void;
	resetArticleStyle: () => typeof defaultArticleState;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isParamsFormOpen, setIsParamsFormOpen] = useState(false);
	const asideMenuRef = useRef<HTMLDivElement>(null);

	const [style, setStyle] = useState({
		fontFamilyOption: props.currentStyle.fontFamilyOption,
		fontSizeOption: props.currentStyle.fontSizeOption,
		fontColor: props.currentStyle.fontColor,
		backgroundColor: props.currentStyle.backgroundColor,
		contentWidth: props.currentStyle.contentWidth,
	});

	const handleArrowButtonClick = () => {
		setIsParamsFormOpen(!isParamsFormOpen);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.submitArticleStyle(style);
	};

	const handleFormReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const defaultStyle = props.resetArticleStyle();
		setStyle({
			fontFamilyOption: defaultStyle.fontFamilyOption,
			fontSizeOption: defaultStyle.fontSizeOption,
			fontColor: defaultStyle.fontColor,
			backgroundColor: defaultStyle.backgroundColor,
			contentWidth: defaultStyle.contentWidth,
		});
	};

	const handleClickOutside = (evt: MouseEvent) => {
		if (
			isParamsFormOpen &&
			asideMenuRef.current &&
			evt.target instanceof Node &&
			!asideMenuRef.current.contains(evt.target)
		) {
			setIsParamsFormOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isParamsFormOpen]);

	return (
		<>
			<ArrowButton isOpen={isParamsFormOpen} onClick={handleArrowButtonClick} />
			<aside
				ref={asideMenuRef}
				className={`
					${styles.container} 
					${isParamsFormOpen ? styles.container_open : ''}`}>
				<form
					className={styles.form}
					onReset={handleFormReset}
					onSubmit={handleFormSubmit}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						options={fontFamilyOptions}
						title='Шрифт'
						selected={style.fontFamilyOption}
						onChange={(fontFamilyOption) =>
							setStyle((prev) => ({ ...prev, fontFamilyOption }))
						}
					/>
					<RadioGroup
						options={fontSizeOptions}
						title='Размер шрифта'
						selected={style.fontSizeOption}
						name={'Font-size'}
						onChange={(fontSizeOption) =>
							setStyle((prev) => ({ ...prev, fontSizeOption }))
						}
					/>
					<Select
						options={fontColors}
						title='Цвет шрифта'
						selected={style.fontColor}
						onChange={(fontColor) =>
							setStyle((prev) => ({ ...prev, fontColor }))
						}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title='Цвет фона'
						selected={style.backgroundColor}
						onChange={(backgroundColor) =>
							setStyle((prev) => ({ ...prev, backgroundColor }))
						}
					/>
					<Select
						options={contentWidthArr}
						title='Ширина контента'
						selected={style.contentWidth}
						onChange={(contentWidth) =>
							setStyle((prev) => ({ ...prev, contentWidth }))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
