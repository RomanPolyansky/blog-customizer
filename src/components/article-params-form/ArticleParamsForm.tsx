import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	changeStyle: (newStyle: Partial<ArticleStateType>) => void;
	initialStyle?: ArticleStateType;
};

export const ArticleParamsForm = ({
	changeStyle,
	initialStyle = { ...defaultArticleState },
}: ArticleParamsFormProps) => {
	const [isParamsFormOpen, setIsParamsFormOpen] = useState(false);
	const asideMenuRef = useRef<HTMLDivElement>(null);

	const initialStyleRef = useRef(initialStyle);
	const [currentStyle, setStyle] = useState(initialStyleRef.current);

	const handleArrowButtonClick = () => {
		setIsParamsFormOpen(!isParamsFormOpen);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		changeStyle(currentStyle);
	};

	const handleFormReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStyle(initialStyleRef.current);
		changeStyle(initialStyleRef.current);
	};

	useOutsideClickClose({
		isOpen: isParamsFormOpen,
		rootRef: asideMenuRef,
		onChange: setIsParamsFormOpen,
		onClose: () => setIsParamsFormOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isParamsFormOpen} onClick={handleArrowButtonClick} />
			<aside
				ref={asideMenuRef}
				className={clsx(
					styles.container,
					isParamsFormOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onReset={handleFormReset}
					onSubmit={handleFormSubmit}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						options={fontFamilyOptions}
						title='Шрифт'
						selected={currentStyle.fontFamilyOption}
						onChange={(fontFamilyOption) =>
							setStyle((prev) => ({ ...prev, fontFamilyOption }))
						}
					/>
					<RadioGroup
						options={fontSizeOptions}
						title='Размер шрифта'
						selected={currentStyle.fontSizeOption}
						name={'Font-size'}
						onChange={(fontSizeOption) =>
							setStyle((prev) => ({ ...prev, fontSizeOption }))
						}
					/>
					<Select
						options={fontColors}
						title='Цвет шрифта'
						selected={currentStyle.fontColor}
						onChange={(fontColor) =>
							setStyle((prev) => ({ ...prev, fontColor }))
						}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title='Цвет фона'
						selected={currentStyle.backgroundColor}
						onChange={(backgroundColor) =>
							setStyle((prev) => ({ ...prev, backgroundColor }))
						}
					/>
					<Select
						options={contentWidthArr}
						title='Ширина контента'
						selected={currentStyle.contentWidth}
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
