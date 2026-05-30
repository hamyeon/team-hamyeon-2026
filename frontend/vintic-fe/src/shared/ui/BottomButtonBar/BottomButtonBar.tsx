import { BottomButton, type BottomButtonVariant } from '@/shared/ui/BottomButton';
import * as styles from './BottomButtonBar.css';

type BottomButtonAction = {
  label: string;
  variant?: BottomButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

type BottomButtonBarProps =
  | {
      layout: 'single';
      action: BottomButtonAction;
    }
  | {
      layout: 'double';
      leftAction: BottomButtonAction;
      rightAction: BottomButtonAction;
    };

export function BottomButtonBar(props: BottomButtonBarProps) {
  if (props.layout === 'single') {
    return (
      <div className={styles.container}>
        <BottomButton
          type={props.action.type ?? 'button'}
          variant={props.action.variant ?? 'primary'}
          disabled={props.action.disabled}
          onClick={props.action.onClick}
        >
          {props.action.label}
        </BottomButton>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.doubleGroup}>
        <BottomButton
          type={props.leftAction.type ?? 'button'}
          variant={props.leftAction.variant ?? 'secondary'}
          disabled={props.leftAction.disabled}
          onClick={props.leftAction.onClick}
        >
          {props.leftAction.label}
        </BottomButton>

        <BottomButton
          type={props.rightAction.type ?? 'button'}
          variant={props.rightAction.variant ?? 'primary'}
          disabled={props.rightAction.disabled}
          onClick={props.rightAction.onClick}
        >
          {props.rightAction.label}
        </BottomButton>
      </div>
    </div>
  );
}