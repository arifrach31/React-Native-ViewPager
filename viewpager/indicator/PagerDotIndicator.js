/**
 * Created by tangzhibin on 16/3/28.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import IndicatorViewPager from '../IndicatorViewPager';

const DEFAULT_DOT_RADIUS = 6;
export default class PagerDotIndicator extends Component {
  static propTypes = {
    ...ViewPropTypes,
    pageCount: PropTypes.number.isRequired,
    initialPage: PropTypes.number,
    pager: PropTypes.instanceOf(IndicatorViewPager),
    dotStyle: ViewPropTypes.style,
    selectedDotStyle: ViewPropTypes.style,
    hideSingle: PropTypes.bool,
    left: PropTypes.node,
    right: PropTypes.node,
  };

  static defaultProps = {
    pageCount: 0,
    initialPage: 0,
    hideSingle: false,
    left: null,
    right: null,
  };

  state = {
    selectedIndex: this.props.initialPage,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.selectedIndex != nextState.selectedIndex ||
      this.props.pageCount != nextProps.pageCount ||
      this.props.dotStyle != nextProps.dotStyle ||
      this.props.selectedDotStyle != nextProps.selectedDotStyle ||
      this.props.style != nextProps.style
    );
  }

  render() {
    const { pageCount, dotStyle, selectedDotStyle } = this.props;
    if (pageCount <= 0) return null;
    if (this.props.hideSingle && pageCount == 1) return null;
    const dotsView = [];
    for (let i = 0; i < pageCount; i++) {
      const isSelect = i === this.state.selectedIndex;
      dotsView.push(
        <View
          style={[
            styles.dot,
            isSelect ? styles.selectDot : null,
            isSelect ? selectedDotStyle : dotStyle,
          ]}
          key={i}
        />
      );
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.left || null}
        <View style={{ flexDirection: 'row' }}>{dotsView}</View>
        {this.props.right || null}
      </View>
    );
  }

  onPageSelected(e) {
    this.setState({ selectedIndex: e.position });
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: DEFAULT_DOT_RADIUS,
    height: DEFAULT_DOT_RADIUS,
    borderRadius: DEFAULT_DOT_RADIUS >> 1,
    backgroundColor: '#BBBBBB',
    margin: DEFAULT_DOT_RADIUS >> 1,
  },
  selectDot: {
    backgroundColor: 'white',
  },
});
