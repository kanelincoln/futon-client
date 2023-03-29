import spaceWidgetStyles from '@/styles/SpaceWidget.module.css';

export default function SpaceWidget({ spaceId }) {
  return (
    <section className={spaceWidgetStyles.container}>
      <h1>Space Widget</h1>
      <h2>spaceId: {spaceId}</h2>
    </section>
  );
};