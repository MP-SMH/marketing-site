import { Children, useState } from 'react';
import Button from './Button';

// Wizard - multi-step flow with progress and keyboard-friendly controls.
export default function Wizard({ children, initialStep = 0, onComplete }) {
  const steps = Children.toArray(children);
  const [index, setIndex] = useState(initialStep);
  const progress = Math.round(((index + 1) / steps.length) * 100);
  return (
    <div className="mkt-card">
      <div className="mkt-helper">Step {index + 1} af {steps.length}</div>
      <div className="mkt-bar-track" style={{ margin: '12px 0 24px' }}><div className="mkt-bar-fill" style={{ width: `${progress}%` }} /></div>
      <div>{steps[index]}</div>
      <div className="mkt-card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="ghost" disabled={index === 0} onClick={() => setIndex((v) => v - 1)}>Tilbage</Button>
        <Button onClick={() => index === steps.length - 1 ? onComplete?.() : setIndex((v) => v + 1)}>{index === steps.length - 1 ? 'Færdig' : 'Næste'}</Button>
      </div>
    </div>
  );
}
